import requests
import json

def fetch_github_repositories(username):
    repos_url = f"https://api.github.com/users/{username}/repos"
    repos_response = requests.get(repos_url)

    if repos_response.status_code == 200:
        repositories = repos_response.json()
        repo_info_list = []
        
        for repo in repositories:
            repo_name = repo['name']
            repo_url = repo['html_url']
            repo_start_date = repo['created_at']

            contributors_url = f"https://api.github.com/repos/{username}/{repo_name}/contributors"
            contributors_response = requests.get(contributors_url)
            
            if contributors_response.status_code == 200:
                contributors = contributors_response.json()
                contributor_names = [contributor['login'] for contributor in contributors[:5]]
            else:
                print(f"Failed to get contributors for repository {repo_name}. HTTP Status Code: {contributors_response.status_code}")
                contributor_names = []

            repo_info = {
                'productName': repo_name,
                'location': repo_url,
                'Developers': contributor_names,
                'startDate': repo_start_date
            }

            repo_info_list.append(repo_info)
        
        return repo_info_list
    
    else:
        print(f"Failed to get repositories for user {username}. HTTP Status Code: {repos_response.status_code}")
        print(repos_response.json())
        return None

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
    username = 'bcgov'
    repos_info = fetch_github_repositories(username)

    for index, repo in enumerate(repos_info):
        repos_info[index] = clean_github_repositories(repo)

    if repos_info is not None:
        print(f"Saving {len(repos_info)} repositories to products.json")
        with open('products.json', 'w') as json_file:
            json.dump(repos_info, json_file, indent=4)


if __name__ == "__main__":
    main()