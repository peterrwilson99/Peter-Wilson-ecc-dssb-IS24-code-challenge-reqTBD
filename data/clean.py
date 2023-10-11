import json

def clean_github_repositories(repo):
    # correct product name
    repo['productName'] = repo['productName'].replace('-', ' ').replace('_', ' ').replace('.', ' ').title()
    
    # Correct developers
    developers = []
    for developer in repo['Developers']:
        if 'bot' in developer.lower():
            continue
        developers.append(developer)
    
    if len(developers) == 0:
        developers.append('bcgovjz')
    repo['Developers'] = developers

    # Correct start date formatting
    repo['startDate'] = repo['startDate'].split('T')[0].replace('-', '/')

    return repo


def main():
    with open('govRepos.json') as json_file:
        all_repo_info = json.load(json_file)

    for index, repo in enumerate(all_repo_info):
        all_repo_info[index] = clean_github_repositories(repo)

    with open('products.json', 'w') as json_file:
        json.dump(all_repo_info, json_file)

if __name__ == "__main__":
    main()