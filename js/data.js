// =============================================
//  CINEVAULT — MOVIE DATA
//  js/data.js
// =============================================

const MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2023,
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Stunning visuals meet profound storytelling in this epic journey across dimensions.",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    baseRating: 4.6,
    votes: 12840
  },
  {
    id: 2,
    title: "The Godfather",
    genre: "Drama",
    year: 2022,
    poster: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=600&fit=crop",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. A masterpiece of cinema that defined a generation.",
    cast: "Marlon Brando, Al Pacino, James Caan",
    trailer: "https://www.youtube.com/watch?v=sY1S34973zA",
    baseRating: 4.9,
    votes: 23100
  },
  {
    id: 3,
    title: "Mad Max: Fury Road",
    genre: "Action",
    year: 2021,
    poster: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    description: "In a post-apocalyptic wasteland, Max teams with a rebellious warrior Furiosa to flee a cult leader and his armada of vehicles in a lengthy road battle. Relentless, visceral filmmaking.",
    cast: "Tom Hardy, Charlize Theron, Nicholas Hoult",
    trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
    baseRating: 4.5,
    votes: 9800
  },
  {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    year: 2019,
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    baseRating: 4.8,
    votes: 31200
  },
  {
    id: 5,
    title: "Parasite",
    genre: "Thriller",
    year: 2022,
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan. Bong Joon-ho's genre-bending masterpiece.",
    cast: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
    trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    baseRating: 4.7,
    votes: 17430
  },
  {
    id: 6,
    title: "Spirited Away",
    genre: "Animation",
    year: 2021,
    poster: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=600&fit=crop",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits. Studio Ghibli's most beloved work.",
    cast: "Daveigh Chase, Suzanne Pleshette, Miyu Irino",
    trailer: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
    baseRating: 4.8,
    votes: 20540
  },
  {
    id: 7,
    title: "Get Out",
    genre: "Horror",
    year: 2017,
    poster: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=600&fit=crop",
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his nightmare begins. Jordan Peele's incisive social horror debut is unmissable.",
    cast: "Daniel Kaluuya, Allison Williams, Bradley Whitford",
    trailer: "https://www.youtube.com/watch?v=DzfpyUB60YY",
    baseRating: 4.4,
    votes: 11200
  },
  {
    id: 8,
    title: "The Grand Budapest Hotel",
    genre: "Comedy",
    year: 2019,
    poster: "https://images.unsplash.com/photo-1555116505-38ab61800975?w=400&h=600&fit=crop",
    description: "A writer encounters the owner of an aging European hotel between the wars, and gets mixed up in the theft of a priceless Renaissance painting. Wes Anderson's most exuberant film.",
    cast: "Ralph Fiennes, Tony Revolori, Saoirse Ronan",
    trailer: "https://www.youtube.com/watch?v=1Fg5iWmQjwk",
    baseRating: 4.5,
    votes: 13780
  },
  {
    id: 9,
    title: "Oppenheimer",
    genre: "Drama",
    year: 2024,
    poster: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. Christopher Nolan's grandest, most ambitious work yet.",
    cast: "Cillian Murphy, Emily Blunt, Matt Damon",
    trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    baseRating: 4.7,
    votes: 28600
  },
  {
    id: 10,
    title: "Blade Runner 2049",
    genre: "Sci-Fi",
    year: 2018,
    poster: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=400&h=600&fit=crop",
    description: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who has been missing for thirty years. A visual poem of sci-fi cinema.",
    cast: "Ryan Gosling, Harrison Ford, Ana de Armas",
    trailer: "https://www.youtube.com/watch?v=gCcx85zbxz4",
    baseRating: 4.5,
    votes: 16340
  },
  {
    id: 11,
    title: "Knives Out",
    genre: "Thriller",
    year: 2019,
    poster: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=600&fit=crop",
    description: "A detective investigates the death of a patriarch of an eccentric, combative family. Rian Johnson's delightful whodunit subverts every expectation of the genre.",
    cast: "Daniel Craig, Chris Evans, Ana de Armas",
    trailer: "https://www.youtube.com/watch?v=qGqiHJTsRkQ",
    baseRating: 4.4,
    votes: 14220
  },
  {
    id: 12,
    title: "Everything Everywhere All at Once",
    genre: "Sci-Fi",
    year: 2022,
    poster: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop",
    description: "A middle-aged Chinese immigrant is swept up in an insane adventure in which she alone can save existence by exploring other universes. The most inventive film in years.",
    cast: "Michelle Yeoh, Stephanie Hsu, Ke Huy Quan",
    trailer: "https://www.youtube.com/watch?v=wxN1T1uxQ2g",
    baseRating: 4.8,
    votes: 22900
  }
];
