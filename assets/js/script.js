document.addEventListener("DOMContentLoaded", function () {
  const storedSearchesContainer = document.getElementById("storedSearchesContainer");
  const searchInput = document.getElementById("searchInput");
  const moodPlaylistsContainer = document.getElementById("moodPlaylistsContainer");
  const spotifyPlayerContainer = document.getElementById("spotifyPlayerContainer");

  let searchInputValue = "";
  let accessToken = "";
  let moodPlaylists = [];
  let selectedPlaylistUri = "";

  // API Keys
  const youtubeApiKey = 'YOUR_YOUTUBE_API_KEY';
  const musixmatchApiKey = 'YOUR_MUSIXMATCH_API_KEY';
  const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

  // API URLs
  const youtubeApiUrl = 'YOUR_YOUTUBE_API_URL';
  const musixmatchApiUrl = 'YOUR_MUSIXMATCH_API_URL';
  const googleMapsApiUrl = 'YOUR_GOOGLE_MAPS_API_URL';

  // Mood Selection
  const moods = ['Happy', 'Chill', 'Energetic', 'Relaxed', 'Excited', 'Calm', 'Upbeat', 'Peaceful', 'Playful'];

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

  function clearForm() {
    searchInput.value = "";
    displayMoodCards();
  }

  // Artist & Playlist Info
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
        renderMoodPlaylists(playlists);
      })
      .catch((error) => {
        console.error("Error searching for playlists:", error);
      });
  }

  function authenticateSpotify() {
    const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
    const clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';

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

  function getPlaylistID(uri) {
    selectedPlaylistUri = uri;
    loadMoodToPlaylist();
  }

  function loadMoodToPlaylist() {
    // Implement load mood to playlist logic here
  }

  // Other functions from your original code...

  // Initial setup
  displayMoodCards();
  clearForm();
});
