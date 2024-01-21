const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchbox = document.querySelector(".search-box");
const getUser = async(username)=>{
  const response = await fetch(APIURL + username);
  //console.log(response);
  const data = await response.json();
  //console.log(data);
  const card = `<div class="box">
  <div class="contains-profile-image">
    <img src="${data.avatar_url}" class="image">
  </div>
  <div class="information">
    <div class="name-profile">${data.name}</div>
    <div class="bio">${data.bio}</div>
    <div class="hashtag">
      <p>${data.followers} <strong>Followers</strong>
      ${data.following} <strong>Following</strong>
      ${data.public_repos} <strong>Repos</strong>
      </p><div id="repos">
      
      
    </div>
  </div>
</div>

</div>`;
main.innerHTML = card;
getRepos(username)


}
getUser( );

const getRepos = async(username)=>{
  const repos = document.querySelector("#repos");
  const response =  await fetch(APIURL+username+"/repos");
  const data = await response.json();
  data.forEach(
    (item)=>{
      const elem=document.createElement("a")
      elem.classList.add("repo");
      elem.href=item.html_url;
      elem.innerText=item.name;
      elem.target="_blank";
      repos.appendChild(elem);
    }
  )
}

const formSubmit=()=>{
  const searchbox = document.querySelector(".search-box");
  if(searchbox.value!=""){
    getUser(searchbox.value);
    searchbox.value="";
  }
  return false;
}
searchbox.addEventListener(
  "focusout",
  function () {
    formSubmit()
  }
)