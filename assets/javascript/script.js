        
    // variables
        var topics = ["happy", "sad", "scared", "bored", "angry", "sleepy", "grumpy", "OMG", "rage", "surprised", "worried", "confident", "skeptical", "stressed", "disgusted", "helpless", "ecstatic", "affectionate", "anxious", "confused", "heartbroken", "depressed", "hopeful"];


        function renderButtons() {
            $("#emotion-buttons").empty();
            for (var i = 0; i < topics.length; i++) {
                var emotionButton = $("<button>" + topics[i] + "</button>");
                emotionButton.attr("data-button", topics[i])
                emotionButton.addClass("classButton")
                $("#emotion-buttons").append(emotionButton);
            }
        }

        $("#emotion-buttons").on("click", ".classButton", function (event) {
            event.preventDefault();
            $("#gifs").empty();

            var button = $(this).attr("data-button")
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=AiDMA9GHAOH269BuDaSgcG58z8UmYTTU&limit=10"
            console.log(this);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var results = response.data

            for (var i=0; i<results.length; i++) {    
            
                var imageUrl = results[i].images.fixed_height_still.url;
                var emotionImage = $("<img>");
                var gifDiv = $("<div>")
                gifDiv.addClass("gifDiv")

                emotionImage.attr({
                    "src": imageUrl,
                    "alt": "emotion-image",
                    "data-state": "still",
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url
                });
                emotionImage.addClass("classGif");
                var ratingDisplay = $("<p>").text("Rating: " + results[i].rating);
                
                gifDiv.append(ratingDisplay);
                gifDiv.append(emotionImage);

                $("#gifs").append(gifDiv)
            }
            })
            
        })

        // Function for when the submit button is clicked to add a new button
        $("#add-emotion").on("click", function (event) {
            event.preventDefault();

            var newButton = $("#emotion-input").val().trim();
            topics.push(newButton);
            $("#emotion-input").val("");
            renderButtons();
        });

        // //on-click event to start/stop each gif
        $("#gifs").on("click", ".classGif", function (event) {
            event.preventDefault();

            var state = $(this).attr("data-state");
            var stillURL = $(this).attr("data-still");
            var animURL = $(this).attr("data-animate");

            console.log(this)
            if (state === "still") {
                $(this).attr({
                    "src": animURL,
                    "data-state": "animate"
                })
            } else {
                $(this).attr({
                    "src": stillURL,
                    "data-state": "still"
                })
            }
        })
        
        renderButtons();
