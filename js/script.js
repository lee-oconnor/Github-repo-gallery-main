/*Div where my profile info will appear */
const overview = document.querySelector(".overview");
const username = "lee-oconnor";

const profileFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();  
    console.log(data);
    userInfo(data);

};
profileFetch();

const userInfo = function (data) {
    const userStats = document.createElement("div");
    userStats.innerHTML = `<figure><img alt="user avatar" src=${data.avatar_url} /></figure><div class="user-info"><p><strong>Name:</strong> ${data.name}</p><p><strong>Bio:</strong> ${data.bio}</p><p><strong>Location:</strong> ${data.location}</p><p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`;
    overview.append(userStats);
};