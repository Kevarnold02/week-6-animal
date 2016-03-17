//create an array as a variable named animalSounds.
var animalSounds = ["meow", "woof", "chirp"];
//for loop to make each value of the array a button.
	for(var i = 0; i < animalSounds.length; i++){
		// console.log(animalSounds[i]);
		//(dynamically) making a button tag using jquery 
		var $button = $('<button>');
		//adding a class, text, and attributes to the newly created button.
		$button.addClass("animalSounds").text(animalSounds[i]).attr('data-sound',animalSounds[i]);
		//appending the new button to the div with ID = animalButtons.
		$('#animalButtons').append($button);
	}
	//on click function that takes the userInput and adds it to the array as a button with the same class/attributes of the existing array.
	$('#addAnimal').on('click', function() {
		//prevents the page from refreshing when user input is submitted (alternative to "return false").
		event.preventDefault();
		//creating a var called userInput, and capturing the trimmed value to push to the array.
		var userInput = $('#animal_input').val().trim();
			animalSounds.push(userInput);  //array is not rendered ever again
		//creating a var btn, which created a button with the same class and attributes as the exisiting buttons, and setting the text = to what was submitted using the "submit" button.	
		var btn = $('<button>').addClass('animalSounds').attr('data-sound', userInput)
			btn.text(userInput);
			//we are appending the new button (btn) to the div with the ID = animalButtons.
			$('#animalButtons').append(btn);	
	});

	//click function on every button with a class of animalSounds.
	$(document).on('click', '.animalSounds', function() {
		//we are clearing the gifs that are currently being displayed every time any button with class of animalSounds is clicked.
		$('#gifsAppearHere').empty();
		//defining a new variable "animal", set = to whichever button is clicked.
		var animal = $(this).data('sound');
		//when a button is clicked, queryURL is changing the search term, in this case its "animal", with the value of the button clicked.
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
			//passing in one object - $.ajax, which has two properties url: & method.
			$.ajax({url: queryURL, method: 'GET'})
			//when the ajax call is done, it triggers a function named response.
			.done(function(response) {
				
					// console.log(response)
		  		
		    	// since the image information is inside of the data key, we define a variable named results and set it equal to response.data  
					//var hello = results[0].bitly_url; Made a shortcut with:
	      var results = response.data;	
	      	for (var i = 0; i < results.length; i++) {
	  				//make a div and reference it in a variable named animalDiv
			      var animalDiv = $('<div>')
			      	//adding a class of resultImages and an attribute of data-state, still, to animalDiv
			        animalDiv.addClass("resultImages").attr('data-state','still');
			        //adding a data-still and data-animated attribute to animalDiv, where data-still returns the still images of the button that was clicked.
			        animalDiv.attr('data-still', results[i].images.fixed_height_still.url).attr('data-animated', results[i].images.fixed_height.url);
				      		// var p = $('<p>');
				      		// p.text("Rating: " + results[i].rating);
			      		//make a paragraph tag and put it in a variable named p
			      		//set the text of the paragraph to the rating of the image in results[i]
			          var p = $('<p>').text(results[i].rating);
			          //make an image and reference it in a variable named animalImage
			          	//set the image's src to results[i]'s fixed_height.url
			          var animalImage = $('<img>');
			          	animalImage.attr('src', results[i].images.fixed_height_still.url);
			      			//put the p tag onto the animalDiv $(element that is getting appended to).append(element you are appending to animalDiv).
			      			//append the p variable to the animalDiv variable
			          	animalDiv.append(p);
			          	//append the animalImage variable to the animalDiv variable			          	
			          	animalDiv.append(animalImage);
			          	//prepend the animalDiv variable to the element with an id of gifsAppearHere
			          	$('#gifsAppearHere').prepend(animalDiv);		   
		      	}
      });
	});
	//on click function to switch between still image and animated image.
	$(document).on('click', '.resultImages', function(){
		// I want to switch the urls between animated and still
		// if data-state = still, change it to data-state=animted, and vice versa.
		var state = $(this).attr('data-state');
			//if state is still, then when its clicked we change the class to animated.
			if(state === "still"){
				// var currentUrl = $(this).children()[1].src;
				//we grab the current url of the image that has been clicked, and change it to the animated url.
				$(this).children()[1].src = $(this).data('animated');
				//we change the data-state attribute to animated, when a still image is clicked.
				$(this).attr('data-state', 'animated');	
				//now we do the opposite, so that when an image is animated, we change it back to still.		
			} else {
				$(this).children()[1].src = $(this).attr('data-still');
				$(this).attr('data-state', 'still');	
			}
	});