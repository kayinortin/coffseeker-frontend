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
    pr_data = response.json()
    diff_url = pr_data['diff_url']
    diff_response = requests.get(diff_url)
    return diff_response.text

import re

def generate_description(diff):
    description = []
    file_changes = re.split(r'diff --git', diff)[1:]

    for file_change in file_changes:
        file_name_match = re.search(r'a/(.+) b/(.+)', file_change)
        if not file_name_match:
            continue
        file_name = file_name_match.group(1)
        change_lines = file_change.split('\n')

        changes = []
        for line in change_lines:
            if line.startswith('+') and not line.startswith('+++'):
                content = line[1:].strip()
                if content:
                    if 'import ' in content:
                        changes.append(f"Import {content.split('import ')[1]}")
                    elif content.startswith('def '):
                        changes.append(f"Add function '{content.split('def ')[1].split('(')[0]}'")
                    elif content.startswith('class '):
                        changes.append(f"Create class '{content.split('class ')[1].split('(')[0]}'")
                    elif len(content) < 50 and not content.startswith('#'):
                        changes.append(f"Add code: {content}")
            elif line.startswith('-') and not line.startswith('---'):
                content = line[1:].strip()
                if content and len(content) < 50 and not content.startswith('#'):
                    changes.append(f"Remove code: {content}")

        if changes:
            changes = changes[:3]  # Limit to 3 changes per file
            changes.append(f"in {file_name}")
            description.append(" and ".join(changes))

    if not description:
        files = re.findall(r'\n--- a/(.+)', diff)
        if files:
            description.append(f"Modify files: {', '.join(files)}")
        else:
            description.append("Make code adjustments (details not available)")

    summary = f"This PR involves changes in {len(description)} file(s). Main changes:"
    description.insert(0, summary)

    return "\n".join(f"- {item}" for item in description[:6])

def get_main_action(added_lines, removed_lines):
    if len(added_lines) > len(removed_lines):
        return "增加了新的功能或內容"
    elif len(added_lines) < len(removed_lines):
        return "進行了代碼清理或重構"
    else:
        return "對現有功能進行了修改或優化"

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

    data = {"body": new_body}
    response = requests.patch(url, headers=headers, data=json.dumps(data))
    if response.status_code != 200:
        raise Exception(f"Failed to update PR. Status code: {response.status_code}, Response: {response.text}")

if __name__ == "__main__":
    diff = get_pr_diff()
    description = generate_description(diff)
    update_pr_description(description)