// MoodMatch Application

document.addEventListener("DOMContentLoaded", function () {
  // Get references to HTML elements
  const storedSearchesContainer = document.getElementById("storedSearchesContainer");
  const searchInput = document.getElementById("searchInput");
  const moodPlaylistsContainer = document.getElementById("moodPlaylistsContainer");
  const spotifyPlayerContainer = document.getElementById("spotifyPlayerContainer");

  // Initialize variables to store user input and API data
  let searchInputValue = "";
  let accessToken = "";
  let moodPlaylists = [];
  let selectedPlaylistUri = "";

  // API Keys (replace placeholders with your actual keys)
  const spotifyClientId = 'YOUR_SPOTIFY_CLIENT_ID';
  const spotifyClientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';
  const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

  // API URLs
  const spotifyApiUrl = 'https://api.spotify.com/v1';
  const googleMapsApiUrl = 'https://maps.googleapis.com/maps/api';

  // Mood Selection
  const moods = ['Happy', 'Chill', 'Energetic', 'Relaxed', 'Excited', 'Calm', 'Upbeat', 'Peaceful', 'Playful'];

  // Function to display mood cards on the webpage
  function displayMoodCards() {
    moodPlaylistsContainer.innerHTML = "";
    moods.forEach((mood) => {
      const moodCard = document.createElement("div");
      moodCard.className = "mood-card";
      moodCard.textContent = mood;
      moodCard.onclick = () => selectMood(mood);
      moodPlaylistsContainer.appendChild(moodCard);
    });
  }

  // Function to clear the search form and display mood cards
  function clearForm() {
    searchInput.value = "";
    displayMoodCards();
  }

  // Artist & Playlist Info
  // Function to search for playlists based on user input
  function search(searchValue) {
    authenticateSpotify()
      .then((accessToken) => {
        const searchEndpoint = `${spotifyApiUrl}/search?q=${searchValue}&type=playlist`;

        return axios.get(searchEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then((response) => {
        const playlists = response.data.playlists.items;
        renderMoodPlaylists(playlists);
      })
      .catch((error) => {
        console.error("Error searching for playlists:", error);
      });
  }

  // Function to authenticate with the Spotify API
  function authenticateSpotify() {
    const base64Credentials = btoa(`${spotifyClientId}:${spotifyClientSecret}`);

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

  // Function to render mood playlists on the webpage
  function renderMoodPlaylists(playlists) {
    moodPlaylistsContainer.innerHTML = "";
    playlists.forEach((playlist) => {
      const playlistDiv = document.createElement("div");
      playlistDiv.className = "mood-card";
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

  // Function to get the selected playlist ID
  function getPlaylistID(uri) {
    selectedPlaylistUri = uri;
    loadMoodToPlaylist();
  }

  // Function to load mood to playlist (placeholder for now)
  function loadMoodToPlaylist() {
    // Implement load mood to playlist logic here
  }

  // Google Maps API
  function getVenueInfo() {
    // Implement Google Maps API logic here
    // You can use the 'googleMapsApiKey' to authenticate your requests
  }

  // Initial setup
  displayMoodCards();
  clearForm();
});

