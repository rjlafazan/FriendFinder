var friend = require("../data/friends.js");
var fs = require("fs");

module.exports = function(app) {
  // route for getting all the friends available
  app.get("/api/friends", function(req, res) {
    res.json(friend);
  });
  // route to post user input from survey and find the most compatible friend
  app.post("/api/friends", function(req, res) {
    var friendsArray = friend.userInfoArr;
    var currentUser = req.body;
    var match = findCompatibleFriend(currentUser, friendsArray);
    console.log(match.difference);
    friendsArray.push(currentUser);
    res.send({
      name: match.index.name.toUpperCase(),
      img: match.index.link,
    });
  });

  //    function to find friend who is most compatible to the user
  function findCompatibleFriend(currUser, friends) {
    var friend = {};

    for (var i in friends) {
      var difference = 0;
      for (var j in friends[i].scores) {
        difference += Math.abs(
          Number(currUser.scores[j]) - Number(friends[i].scores[j])
        );
      }
      if (friend.difference === undefined) {
        friend.difference = difference;
        friend.index = friends[i];
      } else {
        if (difference < friend.difference) {
          friend.difference = difference;
          friend.index = friends[i];
        }
      }
    }
    return friend;
  }
};
