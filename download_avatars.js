var request = require('request');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

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

getRepoContributors("jquery", "jquery", function(err, result) {

    //console.log("Errors:", err);
    var obj = JSON.parse(result);

    for (var i in obj) {
      console.log(obj[i].avatar_url);
    }

    //console.log("Result:", obj);

  });