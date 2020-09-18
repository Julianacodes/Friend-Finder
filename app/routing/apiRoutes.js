//LOAD DATA

var friends = require ("../data/friends");


// ROUTING

module.exports = function(app) {

    // API Get Request
    app.get("/api/friends", function(req, res) {
        res.jason(friends);
    });
    // API Post Request
    app.post("/api/friends", function(req, res){

        // this is the object that will hold the best match
        var bestMatch = {
            name: "",
            photo:"",
            friendDifference: Infinity
        };
        // takeing the result of the users survey POST and parseing it
        var userData = req.body;
      //  console.log(userData)
        var userScores = userData.scores;

        // This will calculate the difference between the scores
        var totalDifference;

        // Loop through all the possibilites
        for (var i=0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

         //   console.log(currentFriend.name);

           // console.log(currentFriend.scores)
            // loop through all the scores for each of the friends
            for (var j = 0; j <currentFriend.scores.length; j++){
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                // Calculate difference between the two scores and make them into a total amount
                totalDifference+=Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            // 
            
            if (totalDifference <= bestMatch.friendDifference) {
                // this resets the bestmatch to the new friends
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        // Save user data to the database
        friends.push(userData);

        console.log(bestMatch)
        // return a jason with users bestMatch
        res.json(bestMatch);
    });
};