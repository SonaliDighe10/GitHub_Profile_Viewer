function getUser() {
    const username = document.getElementById('usernameInput').value;
    const apiUrl = `https://api.github.com/users/${username}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(user => {
            const profileInfo = document.getElementById('profileInfo');
            const repositories = document.getElementById('repositories');

            profileInfo.innerHTML = `
                <h2>${user.login}</h2>
                <img src="${user.avatar_url}" alt="Avatar" style="width: 100px; height: 100px;">
                <p>Name: ${user.name}</p>
                <p>Followers: ${user.followers}</p>
                <p>Following: ${user.following}</p>
            `;

            fetch(`${user.repos_url}`)
                .then(response => response.json())
                .then(repos => {
                    repositories.innerHTML = '<h3>Repositories:</h3>';
                    repos.forEach(repo => {
                        const repoElement = document.createElement('div');
                        repoElement.classList.add('repository');
                        repoElement.innerHTML = `
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                            <p>${repo.description || 'No description'}</p>
                            <p>Language: ${repo.language}</p>
                        `;
                        repositories.appendChild(repoElement);
                    });
                })
                .catch(error => console.error('Error fetching repositories:', error));
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            const profileInfo = document.getElementById('profileInfo');
            profileInfo.innerHTML = '<p>User not found. Please try again.</p>';
        });
}
