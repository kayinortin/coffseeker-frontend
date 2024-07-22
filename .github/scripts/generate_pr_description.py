import os
import requests
import json

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
    api_url = "https://api-inference.huggingface.co/models/gpt2"
    headers = {"Authorization": f"Bearer {os.environ['HF_API_TOKEN']}"}
    payload = {
        "inputs": f"Summarize the following code changes:\n\n{diff[:500]}",
        "parameters": {"max_length": 100}
    }
    response = requests.post(api_url, headers=headers, json=payload)
    return response.json()[0]['generated_text']

def update_pr_description(description):
    with open(os.environ['GITHUB_EVENT_PATH']) as f:
        event = json.load(f)
    pr_number = event['number']

    url = f"https://api.github.com/repos/{os.environ['GITHUB_REPOSITORY']}/pulls/{pr_number}"
    headers = {
        "Authorization": f"token {os.environ['GITHUB_TOKEN']}",
        "Accept": "application/vnd.github.v3+json"
    }

    print(f"Current working directory: {os.getcwd()}")
    print("Files in current directory:")
    for root, dirs, files in os.walk('.'):
        for file in files:
            print(os.path.join(root, file))

    template_path = '.github/pull_request_template.md'
    if os.path.exists(template_path):
        with open(template_path, 'r') as file:
            template = file.read()
        new_body = template.replace("[此處將被AI生成的描述替換]", description)
    else:
        print(f"Template file not found at {template_path}")
        new_body = f"## AI Generated Description\n\n{description}\n\n## Additional Information\n\nPlease add any additional information about this pull request."

    data = {"body": new_body}
    response = requests.patch(url, headers=headers, data=json.dumps(data))
    print(f"PR update status: {response.status_code}")

if __name__ == "__main__":
    diff = get_pr_diff()
    description = generate_description(diff)
    update_pr_description(description)