// function to provide data on whether an artist is playing near-by.
// takes a single argument 'artist' which is the name of the artist as a string.

function searchArtistData(artist) {
  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL =
    "https://rest.bandsintown.com/artists/" + artist + "?app_id=1234";
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Printing the entire object to console
      console.log(data);
      $("#tour-dates")
        .attr("href", data.url)
        .text(data.name + " : See Tour Dates");
    });
}

//function to provide list of upcoming events for a specific artist.
// takes a single argument 'artist' which is the name of the artist as a string.
function searchEvents(artist) {
  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  const queryURL =
    "https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=1234";
  let upcomingEvents = [];
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Printing the entire object to console
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        upcomingEvents.push({
          dateTime: data[i].datetime,
          dateTimeFormat: data[i].datetime_display_rule,
          city: data[i].venue.city,
          country: data[i].venue.country,
          latitude: data[i].venue.latitude,
          longitude: data[i].venue.longitude,
        });
      }

      console.log(upcomingEvents);
      // Let them know there are no tour dates
      if (upcomingEvents.length == 0) {
        let myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
      } else {
        // Show what cities there are
        $("#moodPlaylistsContainer").empty();
        $("#moodPlaylistsContainer").append("<h3> Upcoming Events for " + artist);
        for (let i=0; i < upcomingEvents.length; i ++) {

            let date = dayjs(upcomingEvents[i].dateTime).format("D/M/YYYY");
            let time = dayjs(upcomingEvents[i].dateTime).format('h A');

            $("#moodPlaylistsContainer").append("<div class='card text-bg-dark m-3 p-3 col-3'>");
            $("#moodPlaylistsContainer").children().eq(i+1).append('<h5 class=card-title>' + upcomingEvents[i].city + ', ' + upcomingEvents[i].country);
            $("#moodPlaylistsContainer").children().eq(i+1).append('<p class=card-text> Date: ' + date);
            $("#moodPlaylistsContainer").children().eq(i+1).append('<p class=card-text> Time: ' + time);
        }
      }

      return upcomingEvents;
    });
}
