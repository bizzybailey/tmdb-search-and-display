/* You will need an api key from TMDB, by signing up for a free account */


$(document).ready(function() {
    var url = 'https://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        input,
        movieName,
        key = 'YOUR_API_KEY';
        
    var movie = {
                    title:"",
                    poster_path: "",
                    overview: "",
                    displayMovie: function(){
                        var str =  "<h3>" + this.title + "</h3>" +
                                   "<img src='https://image.tmdb.org/t/p/w185" + this.poster_path + "' alt='"+ this.title +" movie poster' />" +
                                   "<p>" + this.overview + "</p>";
                        return str;
                    }
                };

    $('button').click(function() {
        //console.log("Button Clicked.");
        var input = $('#movie').val(),
            movieName = encodeURI(input);
        $.ajax({
            type: 'GET',
            url: url + mode + input + key,
            async: false,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json) {
                console.log(json);
                
                if (json.total_results != 0){
                    movie.title = json.results[0].title;
                    movie.poster_path = json.results[0].poster_path;
                    movie.overview = json.results[0].overview;
                    
                    $("#results").html(movie.displayMovie());
                
                }
                else {
                    var str = "<p>Hmm .... I wasn't able to find <em>" + input + "</em>. Try entering another movie title.</p>";
                    $('#results').html(str);  
                }

            },
            error: function(e) {
                console.log(e.message);
                
            }
        });
    });
    
   
});
