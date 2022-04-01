/*Div where my profile info will appear */
const overview = document.querySelector(".overview");
const username = "lee-oconnor";
const repoList = document.querySelector(".repo-list");

const profileFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();  
    userInfo(data);

};
profileFetch();

const userInfo = function (data) {
    const userStats = document.createElement("div");
    userStats.classList.add("user-info");
    userStats.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overview.append(userStats);
    fetchRepos();
};

const fetchRepos = async function () {
    const reposList = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const myRepos = await reposList.json();
    displayRepos(myRepos);
};


const displayRepos = function (repos) {
    for (let repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    
    }
};
