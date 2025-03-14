
// TODO 1: add more songs
// TODO 2: if time permits add a database to store songs and use a api for songs
// api give the songs, then store them in the database and then use them

const songs = [
    "Bohemian Rhapsody - Queen",
    "Hotel California - Eagles",
    "Imagine - John Lennon",
    "Thriller - Michael Jackson",
    "Sweet Child O' Mine - Guns N' Roses",
    "Like a Rolling Stone - Bob Dylan",
    "Hey Jude - The Beatles",
    "Billie Jean - Michael Jackson",
    "Smells Like Teen Spirit - Nirvana",
    "Stairway to Heaven - Led Zeppelin",
    "Yesterday - The Beatles",
    "Born to Run - Bruce Springsteen",
    "Purple Haze - Jimi Hendrix",
    "Respect - Aretha Franklin",
    "Johnny B. Goode - Chuck Berry",
];

export const getRandomSong = () => {
    return songs[Math.floor(Math.random() * songs.length)];
};

export const extractTitleAndArtist = (songString) => {
    const parts = songString.split(" - ");
    return {
        title: parts[0].trim(),
        artist: parts.length > 1 ? parts[1].trim() : "Unknown",
    };
};

// For future use when integrating with a database
export const getSongList = async () => {
    return songs;
};

// For future use when adding new songs to the database
export const addSong = async (title, artist) => {
    const newSong = `${title} - ${artist}`;
    songs.push(newSong);
    return newSong;
};
