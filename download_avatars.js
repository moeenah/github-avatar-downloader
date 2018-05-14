var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
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

//takes name of owner and repo
getRepoContributors(owner, repo, function(err, result) {


    console.log("Errors:", err);
    var obj = JSON.parse(result);

    var avatarURL = '';
    var loginPath = '';

    for (var i in obj) {
      avatarURL = obj[i].avatar_url;
      loginPath = "avatars/" + obj[i].login + ".jpg";
      downloadImageByURL(avatarURL, loginPath);
    }

  });

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