// function to provide data on whether an artist is playing near-by.
// takes a single argument 'artist' which is the name of the artist.

function searchBandsInTown(artist) {
    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=1234";
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Printing the entire object to console
        console.log(data);
      });
  }

searchBandsInTown("Taylor Swift");