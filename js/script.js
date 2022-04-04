/*Div where my profile info will appear */
const overview = document.querySelector(".overview");

const username = "lee-oconnor";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToGalleryButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



/*Fetch profile from GitHub */
const profileFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();  
    userInfo(data);

};
profileFetch();


/*User data to popluate GUI with avatar, bio, location, repos */
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


/*Get my repo list, order from most recently updated, and list 100 per page */
const fetchRepos = async function () {
    const reposList = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const myRepos = await reposList.json();
    displayRepos(myRepos);
};

/*Display repos on the GUI */
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (let repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    console.log(repo);
    }
};

/*Event Listener to target Repo Names */
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
    
});


/*Async Function to get specific repo info */

const getRepoInfo = async function (repoName) {
    const specificRepoData = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepoData.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    }
    displayRepoData(repoInfo, languages);
};

/*Display specfic repo info on GUI*/

const displayRepoData = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDataDiv = document.createElement("div");
    repoDataDiv.innerHTML = `
    <div>
        <h3>Name: ${repoInfo.name} </h3>
            <p>Description: ${repoInfo.description} </p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    </div>
    `;
    repoData.append(repoDataDiv);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backToGalleryButton.classList.remove("hide");

};


/*Back to gallery button */
backToGalleryButton.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backToGalleryButton.classList.add("hide");
});

/*Dynamic search */
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerCaseSearch = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (!repoLowerText.includes(lowerCaseSearch)) {
            repo.classList.add("hide"); 
        } else {
            repo.classList.remove("hide");
        }
    }
});