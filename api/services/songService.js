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
    "Believer - Imagine Dragons",
    "Shape of You - Ed Sheeran",
    "Uptown Funk - Mark Ronson ft. Bruno Mars",
    "Despacito - Luis Fonsi ft. Daddy Yankee",
    "Rolling in the Deep - Adele",
    "Someone Like You - Adele",
    "Blinding Lights - The Weeknd",
    "Thinking Out Loud - Ed Sheeran",
    "Bad Guy - Billie Eilish",
    "Sunflower - Post Malone & Swae Lee",
    "Old Town Road - Lil Nas X ft. Billy Ray Cyrus",
    "Havana - Camila Cabello ft. Young Thug",
    "God's Plan - Drake",
    "Perfect - Ed Sheeran",
    "Shallow - Lady Gaga & Bradley Cooper",
    "Rockstar - Post Malone ft. 21 Savage",
    "Closer - The Chainsmokers ft. Halsey",
    "Girls Like You - Maroon 5 ft. Cardi B",
    "Senorita - Shawn Mendes & Camila Cabello",
    "Dance Monkey - Tones and I",
    "Roar - Katy Perry",
    "Happy - Pharrell Williams",
    "All of Me - John Legend",
    "Sorry - Justin Bieber",
    "Hello - Adele",
    "Can't Stop the Feeling! - Justin Timberlake",
    "Lean On - Major Lazer & DJ Snake ft. MØ",
    "Counting Stars - OneRepublic",
    "Call Me Maybe - Carly Rae Jepsen",
    "We Found Love - Rihanna ft. Calvin Harris",
    "Somebody That I Used to Know - Gotye ft. Kimbra",
    "Rolling in the Deep - Adele",
    "Firework - Katy Perry",
    "Just the Way You Are - Bruno Mars",
    "Party Rock Anthem - LMFAO ft. Lauren Bennett & GoonRock",
    "Grenade - Bruno Mars",
    "Love the Way You Lie - Eminem ft. Rihanna",
    "Dynamite - Taio Cruz",
    "Tik Tok - Kesha",
    "I Gotta Feeling - The Black Eyed Peas",
    "Poker Face - Lady Gaga",
    "Single Ladies (Put a Ring on It) - Beyoncé",
    "Viva la Vida - Coldplay",
    "Bleeding Love - Leona Lewis",
    "Umbrella - Rihanna ft. Jay-Z",
    "Hey There Delilah - Plain White T's",
    "Irreplaceable - Beyoncé",
    "SexyBack - Justin Timberlake",
    "Hips Don't Lie - Shakira ft. Wyclef Jean",
    "Crazy - Gnarls Barkley",
    "Gold Digger - Kanye West ft. Jamie Foxx",
    "Hollaback Girl - Gwen Stefani",
    "Since U Been Gone - Kelly Clarkson",
    "Yeah! - Usher ft. Lil Jon & Ludacris",
    "In da Club - 50 Cent",
    "Hot in Herre - Nelly",
    "Complicated - Avril Lavigne",
    "A Thousand Miles - Vanessa Carlton",
    "Fallin' - Alicia Keys",
    "Bye Bye Bye - *NSYNC",
    "Say My Name - Destiny's Child",
    "I Want It That Way - Backstreet Boys",
    "…Baby One More Time - Britney Spears",
    "I Will Always Love You - Whitney Houston",
    "Smells Like Teen Spirit - Nirvana",
    "Losing My Religion - R.E.M.",
    "Nothing Compares 2 U - Sinéad O'Connor",
    "Like a Prayer - Madonna",
    "Sweet Child o' Mine - Guns N' Roses",
    "With or Without You - U2",
    "Livin' on a Prayer - Bon Jovi",
    "Every Breath You Take - The Police",
    "Billie Jean - Michael Jackson",
    "Eye of the Tiger - Survivor",
    "Don't Stop Believin' - Journey",
    "Another One Bites the Dust - Queen",
    "Imagine - John Lennon",
    "Hotel California - Eagles",
    "Bohemian Rhapsody - Queen",
    "Stairway to Heaven - Led Zeppelin",
    "Let It Be - The Beatles",
    "Hey Jude - The Beatles",
    "Good Vibrations - The Beach Boys",
    "Respect - Aretha Franklin",
    "What a Wonderful World - Louis Armstrong",
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
