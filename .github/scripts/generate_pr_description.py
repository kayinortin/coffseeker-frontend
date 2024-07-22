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

def generate_description(diff):
    description = []
    file_changes = re.split(r'diff --git', diff)[1:]

    for file_change in file_changes:
        file_name_match = re.search(r'a/(.+) b/(.+)', file_change)
        if file_name_match:
            file_name = file_name_match.group(1)
        else:
            continue

        change_lines = file_change.split('\n')

        file_description = f"在文件 '{file_name}' 中:"
        changes = []

        for line in change_lines:
            if line.startswith('+') and not line.startswith('+++'):
                content = line[1:].strip()
                if content:
                    if 'import ' in content:
                        changes.append(f"導入了模塊 {content.split('import ')[1]}")
                    elif content.startswith('def '):
                        changes.append(f"定義了函數 {content.split('def ')[1].split('(')[0]}")
                    elif content.startswith('class '):
                        changes.append(f"定義了類 {content.split('class ')[1].split('(')[0]}")
                    elif len(content) < 50 and not content.startswith('#'):
                        changes.append(f"添加了: {content}")

        if changes:
            file_description += " " + "; ".join(changes[:3])
            description.append(file_description)

    if not description:
        files = re.findall(r'\n--- a/(.+)', diff)
        if files:
            description.append(f"這個 PR 修改了以下文件: {', '.join(files)}")
        else:
            description.append("這個 PR 包含了一些代碼調整，但無法詳細解析變化。")

    summary = f"總結：這個 PR 涉及了 {len(description)} 個文件的變動。主要變更包括："
    description.insert(0, summary)

    return "\n".join(description[:6])  # 限制到摘要+最多5個文件描述

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