class Music {
  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.explicit = item.explicit;
    this.duration_ms = item.duration_ms;
    this.music_url = item.preview_url;
    this.spotify_url = item.external_urls.spotify;
    this.release_date = item.release_date;
    this.artists = item.artists.map((artist, index) => {
      return {
        id: artist.id,
        name: artist.name,
        spotify_url: artist.external_urls.spotify,
      };
    });
  }
}

module.exports = Music;
