var animalSounds = ["meow", "woof", "chirp"];

	for(var i = 0; i < animalSounds.length; i++){
		var $button = $('<button>');
		$button.addClass("animalSounds").text(animalSounds[i]).attr('data-sound',animalSounds[i]);
		$('#animalButtons').append($button);
	}
	
	$('#addAnimal').on('click', function() {
		event.preventDefault();
		var userInput = $('#animal_input').val().trim();
			if(userInput !== "") {
				if(animalSounds.indexOf(userInput) === -1){
			animalSounds.push(userInput);
	
		var btn = $('<button>').addClass('animalSounds').attr('data-sound', userInput)
			btn.text(userInput);
			
			$('#animalButtons').append(btn);
			$('#animal_input').val("")
				} else {
					$('#animal_input').val("");	
				}
			} else {
				$('#animal_input').val("");
			}	
	});
	
	$(document).on('click', '.animalSounds', function() {
		$('#gifsAppearHere').empty();
		
		var animal = $(this).data('sound');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
			
			$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		    	
	      	var results = response.data;	
	      	
	      	for (var i = 0; i < results.length; i++) {
			      
			      var animalDiv = $('<div>')
			      	
			        animalDiv.addClass("resultImages").attr('data-state','still');
			        
			        animalDiv.attr('data-still', results[i].images.fixed_height_still.url).attr('data-animated', results[i].images.fixed_height.url);
				      		
			          var p = $('<p>').text(results[i].rating);
			          var animalImage = $('<img>');
			          	animalImage.attr('src', results[i].images.fixed_height_still.url);
			      			
			          	animalDiv.append(p);
				        	animalDiv.append(animalImage);
			          	
			          	$('#gifsAppearHere').prepend(animalDiv);		   
		      	}
      });
	});
	
	$(document).on('click', '.resultImages', function(){
		
		var state = $(this).attr('data-state');
			
			if(state === "still"){
				$(this).children()[1].src = $(this).data('animated');
					$(this).attr('data-state', 'animated');	
			} else {
				$(this).children()[1].src = $(this).attr('data-still');
				$(this).attr('data-state', 'still');	
			}
	});