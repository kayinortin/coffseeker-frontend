import os
import requests
import json
import re

def get_pr_diff():
    with open(os.environ['GITHUB_EVENT_PATH']) as f:
        event = json.load(f)
    pr_number = event['number']

    url = f"https://api.github.com/repos/{os.environ['GITHUB_REPOSITORY']}/pulls/{pr_number}"
    headers = {"Authorization": f"token {os.environ['GITHUB_TOKEN']}"}
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    pr_data = response.json()
    diff_url = pr_data['diff_url']
    diff_response = requests.get(diff_url)
    diff_response.raise_for_status()
    return diff_response.text

def extract_changes_from_diff(diff):
    file_changes = re.split(r'diff --git', diff)[1:]
    descriptions = []

    for file_change in file_changes:
        file_name_match = re.search(r'a/(.+) b/(.+)', file_change)
        if not file_name_match:
            continue

        file_name = file_name_match.group(1)
        changes = extract_file_changes(file_change.split('\n'))

        if changes:
            changes = changes[:3]  # Limit to 3 changes per file
            changes.append(f"in {file_name}")
            descriptions.append(" and ".join(changes))

    return descriptions


def extract_file_changes(change_lines):
    changes = []
    for line in change_lines:
        if line.startswith('+') and not line.startswith('+++'):
            content = line[1:].strip()
            if content:
                changes.extend(describe_added_content(content))
        elif line.startswith('-') and not line.startswith('---'):
            content = line[1:].strip()
            if content and len(content) < 50 and not content.startswith('#'):
                changes.append(f"Remove {content}")
    return changes


def describe_added_content(content):
    changes = []
    if 'import ' in content:
        changes.append(f"Import {content.split('import ')[1]}")
    elif content.startswith('def '):
        changes.append(f"Add function '{content.split('def ')[1].split('(')[0]}'")
    elif content.startswith('class '):
        changes.append(f"Create class '{content.split('class ')[1].split('(')[0]}'")
    elif len(content) < 50 and not content.startswith('#'):
        changes.append(f"Add {content}")
    return changes


def generate_description(diff):
    descriptions = extract_changes_from_diff(diff)

    if not descriptions:
        files = re.findall(r'\n--- a/(.+)', diff)
        if files:
            descriptions.append(f"Modify files: {', '.join(files)}")
        else:
            descriptions.append("Make code adjustments (details not available)")

    summary = f"This PR involves changes in {len(descriptions)} file(s). Main changes:"
    descriptions.insert(0, summary)

    return "\n".join(f"- {item}" for item in descriptions[:6])


def update_pr_description(description):
    with open(os.environ['GITHUB_EVENT_PATH']) as f:
        event = json.load(f)
    pr_number = event['number']

    url = f"https://api.github.com/repos/{os.environ['GITHUB_REPOSITORY']}/pulls/{pr_number}"
    headers = {
        "Authorization": f"token {os.environ['GITHUB_TOKEN']}",
        "Accept": "application/vnd.github.v3+json"
    }

    template_path = '.github/pull_request_template.md'
    new_body = generate_new_body(description, template_path)

    data = {"body": new_body}
    response = requests.patch(url, headers=headers, data=json.dumps(data))
    response.raise_for_status()


def generate_new_body(description, template_path):
    if os.path.exists(template_path):
        with open(template_path, 'r') as file:
            template = file.read()
        new_body = re.sub(
            r'(<!-- AI-GENERATE-DESCRIPTION -->).*(\[此處將被AI生成的描述替換\])',
            r'\1\n' + description,
            template,
            flags=re.DOTALL
        )
    else:
        new_body = f"## AI Generated Description\n\n{description}\n\n## Additional Information\n\nPlease add any additional information about this pull request."
    return new_body


if __name__ == "__main__":
    diff = get_pr_diff()
    description = generate_description(diff)
    update_pr_description(description)
