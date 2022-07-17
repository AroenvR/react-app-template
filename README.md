# Welcome to my application template.

This folder already is a Git repository.  
.gitignore has been configured.

The following dependencies have been added and configured:  
Sass,  
Bootstrap,  
react-router-dom,  
gh-pages *,  
axios,  
ethers.js  

* Creating a GitHub page:  
Adjust package.json to include homepage url  
"homepage": "https://aroenvr.github.io/react-app-template/", <-- name should match repository name (case sensitive)  

Create a gh-pages branch in your repository.  
Go to repository settings -> pages ->  
- set source to gh-pages branch and /root


When pushing new code, remember to execute npm run deploy to update the gh-pages branch.
