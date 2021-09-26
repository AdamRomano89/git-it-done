var inputEl = document.querySelector('.input')
var btnEl = document.querySelector('.btn')
var formEl = document.querySelector('.form')
var javascriptEl = document.querySelector('.javascript')
var htmlEl = document.querySelector('.html')
var cssEl = document.querySelector('.css')
var pythonEl = document.querySelector('.python')
var reposContainerEl = document.querySelector(".reposContainer")


formEl.addEventListener("submit", getRepos)

function getRepos(e){
  e.preventDefault()
  var inputVal = inputEl.value
  var apiUrl = "https://api.github.com/users/" + inputVal + "/repos";
  fetch(apiUrl)
  .then(function(respnse){
    return respnse.json()
  })
  .then(function(data){
    viewData(data)
  })
  .catch(function(error){
    
  })
}

function viewData (repos){
  var html = "" //
  repos.forEach(function(repo){
    html += `
    <div onclick="getIssues('${repo.name}')">
      <span>${repo.name}<span>
      <span>${repo.open_issues_count}<span>
    </div>
    `
  })
  reposContainerEl.innerHTML=html
}

function getIssues(repoName){
  fetch("https://api.github.com/repos/" + inputEl.value + "/" + repoName + "/issues")
  .then(function(respnse){
    return respnse.json()
  })
  .then(function(data){
    console.log(data);
  })
  .catch(function(error){
    
  })
}




function showLanguageRepos(language){
  var api2 = "https://api.github.com/search/repositories?q=" + language
  fetch(api2)
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    viewData(data.items)
  })
}


javascriptEl.addEventListener("click", function(){
  showLanguageRepos("javaScript")
})

htmlEl.addEventListener("click", function(){
  showLanguageRepos("HTML")
})

cssEl.addEventListener("click", function(){
  showLanguageRepos("CSS")
})

pythonEl.addEventListener("click", function(){
  showLanguageRepos("Python")
})