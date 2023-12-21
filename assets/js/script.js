// MoodMatch Application

document.addEventListener("DOMContentLoaded", function () {
  const storedSearchesContainer = document.getElementById(
    "storedSearchesContainer"
  );
  const searchInput = document.getElementById("searchInput");
  const moodPlaylistsContainer = document.getElementById(
    "moodPlaylistsContainer"
  );
  const spotifyPlayerContainer = document.getElementById(
    "spotifyPlayerContainer"
  );

  let searchInputValue = "";
  let accessToken = "";
  let moodPlaylists = [];
  let selectedPlaylistUri = "";

  // API Keys
const youtubeApiKey = '';
const musixmatchApiKey = '';
const googleMapsApiKey = '';

// API URLs
const youtubeApiUrl = '';
const musixmatchApiUrl = '';
const googleMapsApiUrl = '';

// Mood Selection
    /* Array -  to store moods
    const moods = ['Happy', 'Chill', 'Energetic', 'Relaxed', 'Excited', 'Calm', 'Upbeat', 'Peaceful', 'Playful'];
    }
    Form - get user input, mood card selection
    Function - to clear form */

// Artist & Playlist Info
    // Fetch - Spofity data
    // Display playlist to user
    // Display artist and playlist information to the user
  
  // Spotify Function

  function getSearchInput() {
    searchInputValue = searchInput.value;
    console.log("Search input value:", searchInputValue);
    search(searchInputValue);
  }

  function search(searchValue) {
    authenticateSpotify()
      .then((accessToken) => {
        const searchEndpoint = `https://api.spotify.com/v1/search?q=${searchValue}&type=playlist`;

        return axios.get(searchEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then((response) => {
        const playlists = response.data.playlists.items;
        console.log("Playlists:", playlists);

        // Render the retrieved playlists
        renderMoodPlaylists(playlists);
      })
      .catch((error) => {
        console.error("Error searching for playlists:", error);
      });
  }

  function authenticateSpotify() {
    // REPLACE CLIENT ID
    const clientId = "32d73e004d394cde9908ed44bb84ecf0";
    const clientSecret = "f791c6b679b9427eb385a0ea33e44c92";

    const base64Credentials = btoa(`${clientId}:${clientSecret}`);

    return axios
      .post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      )
      .then((response) => response.data.access_token)
      .catch((error) => {
        console.error("Error authenticating with Spotify:", error);
        throw error;
      });
  }

  function renderMoodPlaylists(playlists) {
    moodPlaylistsContainer.innerHTML = ""; // Clear previous content

    playlists.forEach((playlist) => {
      const playlistDiv = document.createElement("div");
      playlistDiv.style.borderRadius = "1rem";
      playlistDiv.style.boxShadow = "4px 1px 30px rgba(219, 52, 235)";

      const playlistImage = document.createElement("img");
      playlistImage.src = playlist.images[0].url;
      playlistDiv.appendChild(playlistImage);

      const playlistTitle = document.createElement("h3");
      playlistTitle.textContent = playlist.name;
      playlistDiv.appendChild(playlistTitle);

      const playlistTracks = document.createElement("p");
      playlistTracks.textContent = `${playlist.tracks.total} TRACKS`;
      playlistDiv.appendChild(playlistTracks);

      const loadButton = document.createElement("button");
      loadButton.textContent = "Load Mood To Playlist";
      loadButton.addEventListener("click", () => {
        getPlaylistID(playlist.uri);
      });
      playlistDiv.appendChild(loadButton);

      moodPlaylistsContainer.appendChild(playlistDiv);
    });
  }

  function getPlaylistID(uri) {
    selectedPlaylistUri = uri;
    console.log("Selected Playlist URI:", selectedPlaylistUri);

    // Optionally, you can proceed with loading the selected mood to the playlist
    loadMoodToPlaylist();
  }

  function loadMoodToPlaylist() {
    // Implement load mood to playlist logic here
  }

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", getSearchInput);
});

// MoodMatch Application

// API Keys
const youtubeApiKey = '';
const musixmatchApiKey = '';
const googleMapsApiKey = '';

// API URLs
const youtubeApiUrl = '';
const musixmatchApiUrl = '';
const googleMapsApiUrl = '';

// Mood Selection
    // Array -  to store moods
    const moods = ['Happy', 'Chill', 'Energetic', 'Relaxed', 'Excited', 'Calm', 'Upbeat', 'Peaceful', 'Playful'];
    // Function - mood cards and message
    function displayMoodCards() {
        const moodCardsContainer = document.getElementById('moodCards');
    }
    // Form - get user input, mood card selection
    // Function - to clear form

// Artist & Playlist Info
    // Fetch - Youtube data
    // Display playlist to user
    // Fetch - Musixmatch data
    // Display artist and playlist information to the user
    
// BONUS - Venue Info
    // BONUS - Google Maps API data

// Initial display of mood cards on page load
displayMoodCards();

//get image

// BONUS - Venue Info
    // BONUS - Google Maps API
