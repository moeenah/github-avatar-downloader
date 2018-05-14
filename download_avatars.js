//require various functoins
var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

//assign variables to CLI arguments
var owner = process.argv[2];
var repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

//takes api from github
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {

    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

//downloads image
function downloadImageByURL(url, filePath) {
  request.get(url)
   .on('error', function (err) {
     throw err;
   })
   .on('response', function (response) {
     console.log('Response Status Code: ', response.statusCode);
     console.log('Download complete');
   })
   .pipe(fs.createWriteStream(filePath));
   console.log('Downloading image...');
  }

//takes name of owner and repo
getRepoContributors(owner, repo, function(err, result) {
  //check if either owner or repo is undefined and return error
  if (owner === undefined || repo === undefined) {
    console.log("Enter an owner AND a repo name!");
  }
  //if both owner and repo are ok, function continues
  else {
  //creates folder named using 'repo'
  var path = "./avatars/" + repo;
  fs.mkdir(path);

  console.log("Errors:", err);
  var obj = JSON.parse(result);

  var avatarURL = '';
  var loginPath = '';

  for (var i in obj) {
    avatarURL = obj[i].avatar_url;
    loginPath = "avatars/" + repo + "/" + obj[i].login + ".jpg";
    downloadImageByURL(avatarURL, loginPath);
    }
  }

});