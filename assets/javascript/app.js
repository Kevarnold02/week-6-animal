//create an array as a variable named animalSounds.
var animalSounds = ["meow", "woof", "chirp"];
//for loop to make each value of the array a button.
	for(var i = 0; i < animalSounds.length; i++){
		// console.log(animalSounds[i]);
		var $button = $('<button>');
		$button.addClass("animalSounds").text(animalSounds[i]).attr('data-sound',animalSounds[i]);
		$('#animalButtons').append($button);
	}
	//on click function that takes the userInput and adds it to the array as a button with the same class/attributes of the existing array.
	$('#addAnimal').on('click', function() {
		event.preventDefault();
		var userInput = $('#animal_input').val().trim();
			animalSounds.push(userInput);  //array is not rendered ever again
		var btn = $('<button>').addClass('animalSounds').attr('data-sound', userInput)
			btn.text(userInput);
			$('#animalButtons').append(btn);	
	});

	//click function on every button with a class of animalSounds.
	$(document).on('click', '.animalSounds', function() {
		$('#gifsAppearHere').empty();
		var animal = $(this).data('sound');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
			//passing in one object - $.ajax, which has two properties url: & method.
			$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			//response now becomes the function/variable that is used for the rest of this portion of the function.
		
		  	console.log(response)
		    	// since the image information is inside of the data key, we define a variable named results and set it equal to response.data  
					//var hello = results[0].bitly_url; Made a shortcut with:
		      var results = response.data;	
		      	for (var i = 0; i < results.length; i++) {
		  
			     		//make a div and reference it in a variable named animalDiv
			       	//make a paragraph tag and put it in a variable named p
			          //set the text of the paragraph to the rating of the image in results[i]
				      //make an image and reference it in a variable named animalImage
				      	//set the image's src to results[i]'s fixed_height.url 
				      //append the p variable to the animalDiv variable
				      //append the animalImage variable to the animalDiv variable
				      //prepend the animalDiv variable to the element with an id of gifsAppearHere
				 
				      var animalDiv = $('<div>')
				        animalDiv.addClass("resultImages").attr('data-state','still');
				        animalDiv.attr('data-still', results[i].images.fixed_height_still.url).attr('data-animated', results[i].images.fixed_height.url);
				      		// var p = $('<p>');
				      		// p.text("Rating: " + results[i].rating);
				          var p = $('<p>').text(results[i].rating);
				          var animalImage = $('<img>');
				          	animalImage.attr('src', results[i].images.fixed_height_still.url);
				      			//put the p tag onto the animalDiv $(element that is getting appended to).append(element you are appending to animalDiv).
				          	animalDiv.append(p);
				          	animalDiv.append(animalImage);
				          	$('#gifsAppearHere').prepend(animalDiv);		   
		      	}
      });
	});
	//on click function to switch between still image and animated image.
	$(document).on('click', '.resultImages', function(){
		// I want to switch the urls between animated and still
		// if data-state = still, change it to data-state=animted, and vice versa.
		var state = $(this).attr('data-state');
			if(state === "still"){
				// var currentUrl = $(this).children()[1].src;
				$(this).children()[1].src = $(this).data('animated');
				$(this).attr('data-state', 'animated');			
			} else {
				$(this).children()[1].src = $(this).attr('data-still');
				$(this).attr('data-state', 'still');	
			}
	});