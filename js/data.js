// =============================================
//  CINEVAULT — DATA LAYER  (TMDB-powered)
//  js/data.js
//
//  MOVIES[] starts empty and is populated by
//  tmdb.js on app boot. Falls back to static
//  data if the API is unreachable.
// =============================================

// This will be populated by app.js after TMDB fetch
let MOVIES = [];

// ---- Static fallback (used if TMDB is unavailable) ----
const STATIC_MOVIES = [
  {
    id:1, title:"Interstellar", genre:"Sci-Fi", year:2014,
    poster:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1280&h=720&fit=crop",
    description:"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    cast:"Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    trailerKey:"zSWdZVtXT7E", baseRating:4.6, votes:12840, trending:true
  },
  {
    id:2, title:"The Dark Knight", genre:"Action", year:2008,
    poster:"https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1280&h=720&fit=crop",
    description:"When the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests of his ability to fight injustice.",
    cast:"Christian Bale, Heath Ledger, Aaron Eckhart",
    trailerKey:"EXeTwQWrcwY", baseRating:4.8, votes:31200, trending:true
  },
  {
    id:3, title:"Parasite", genre:"Thriller", year:2019,
    poster:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=1280&h=720&fit=crop",
    description:"Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    cast:"Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
    trailerKey:"5xH0HfJHsaY", baseRating:4.7, votes:17430, trending:true
  },
  {
    id:4, title:"Spirited Away", genre:"Animation", year:2001,
    poster:"https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1280&h=720&fit=crop",
    description:"During her family's move, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    cast:"Daveigh Chase, Suzanne Pleshette, Miyu Irino",
    trailerKey:"ByXuk9QqQkk", baseRating:4.8, votes:20540, trending:false
  },
  {
    id:5, title:"Oppenheimer", genre:"Drama", year:2023,
    poster:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=1280&h=720&fit=crop",
    description:"The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    cast:"Cillian Murphy, Emily Blunt, Matt Damon",
    trailerKey:"uYPbbksJxIg", baseRating:4.7, votes:28600, trending:true
  },
  {
    id:6, title:"Everything Everywhere All at Once", genre:"Sci-Fi", year:2022,
    poster:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1280&h=720&fit=crop",
    description:"A middle-aged Chinese immigrant is swept up in an insane adventure in which she alone can save existence.",
    cast:"Michelle Yeoh, Stephanie Hsu, Ke Huy Quan",
    trailerKey:"wxN1T1uxQ2g", baseRating:4.8, votes:22900, trending:true
  },
  {
    id:7, title:"Mad Max: Fury Road", genre:"Action", year:2015,
    poster:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&h=720&fit=crop",
    description:"In a post-apocalyptic wasteland, Max teams with Furiosa to flee a cult leader in a lengthy road battle.",
    cast:"Tom Hardy, Charlize Theron, Nicholas Hoult",
    trailerKey:"hEJnMQG9ev8", baseRating:4.5, votes:9800, trending:false
  },
  {
    id:8, title:"Get Out", genre:"Horror", year:2017,
    poster:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=600&fit=crop",
    backdrop:"https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1280&h=720&fit=crop",
    description:"A young African-American visits his white girlfriend's parents for the weekend, where his nightmare begins.",
    cast:"Daniel Kaluuya, Allison Williams, Bradley Whitford",
    trailerKey:"DzfpyUB60YY", baseRating:4.4, votes:11200, trending:false
  }
];
