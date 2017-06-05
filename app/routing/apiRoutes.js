//  Require the friends.js file
var friends = require('../data/friends.js');

//  Routes
module.exports = function(app){

	// API GET Requests
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	// API POST Requests
	app.post('/api/friends', function(req, res){

//  Comparing user with their best friend match 

    //  Object to hold the best match
		var Match = {
			name: "",
			photo: "",
			friendDifference: ""
		};

		// Here we take the result of the user's survey POST and parse it.
		var Data 	= req.body;
		var Name 	= Data.name;
		var Photo 	= Data.photo;
		var Scores 	= Data.scores;
        console.log(Scores);
		var difference = 0;
        var differenceArray = [];
        var temp;   //  Sort swap variable

		// Loop through the friend possibilities. 
		for  (var i = 0; i < friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;
            difference = 0;
			// Loop through each friend response
			for (var j = 0; j < friends[i].scores.length; j++) {
                    
				//  Calculate and store the difference between the scores
				difference += Math.abs(parseInt(Scores[j]) - parseInt(friends[i].scores[j]));
                if (j == friends[i].scores.length - 1) {
                    differenceArray.push(difference);
                }
                console.log(difference);
			}
        console.log(differenceArray);

        //  Get the index of the minimum difference between the total scores of the user and any of the potential friends.
        //  This identifies the Best Match
        var x = differenceArray.indexOf(Math.min.apply(Math, differenceArray));

        Match.name = friends[x].name;
        console.log(Match.name);
        Match.photo = friends[x].photo;
        console.log(Match.photo);
		}

		// Push the results to the database
		friends.push(Data);

		// Return a JSON object with the user's best match. 
		res.json(Match);

	});

}