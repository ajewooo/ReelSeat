// assets/js/store.js

const DEFAULT_MOVIES = [
  {
    id: "obsession",
    title: "OBSESSION",
    genre: "Horror • Thriller",
    duration: "115 mins",
    rating: "8.2",
    year: "2026",
    synopsis: "After breaking the mysterious 'One Wish Willow' to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.",
    poster: "assets/images/obsession-banner.jpg",
    isFeatured: true
  },
  {
    id: "exorcist",
    title: "The Exorcist",
    genre: "Horror",
    duration: "122 mins",
    rating: "8.1",
    year: "1973",
    synopsis: "When a young girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her.",
    poster: "assets/images/exorcist.jpg"
  },
  {
    id: "backrooms",
    title: "Backrooms",
    genre: "Sci-Fi • Horror",
    duration: "105 mins",
    rating: "7.4",
    year: "2026",
    synopsis: "A young filmmaker's lost footage reveals a terrifying endless maze of yellow rooms and uncanny entities.",
    poster: "assets/images/backrooms.jpg"
  },
  {
    id: "hail-mary",
    title: "Project Hail Mary",
    genre: "Sci-Fi • Drama",
    duration: "140 mins",
    rating: "8.5",
    year: "2026",
    synopsis: "Ryland Grace is the sole survivor on a desperate, last-chance mission to save humanity from extinction.",
    poster: "assets/images/hail-mary.jpg"
  },
  {
    id: "send-help",
    title: "Send Help",
    genre: "Thriller • Comedy",
    duration: "110 mins",
    rating: "7.8",
    year: "2026",
    synopsis: "Two colleagues become stranded on a deserted island where comedic chaos and dark survival instincts clash.",
    poster: "assets/images/send-help.jpg"
  },
  {
    id: "500-days",
    title: "(500) Days of Summer",
    genre: "Romance • Drama",
    duration: "95 mins",
    rating: "7.7",
    year: "2009",
    synopsis: "An offbeat romantic comedy about a woman who doesn't believe true love exists, and the young man who falls for her.",
    poster: "assets/images/500-days.jpg"
  },
  {
    id: "dead-poets",
    title: "Dead Poets Society",
    genre: "Drama",
    duration: "128 mins",
    rating: "8.1",
    year: "1989",
    synopsis: "Maverick teacher John Keating uses poetry to inspire his elite prep school students to new heights of self-expression.",
    poster: "assets/images/dead-poets.jpg"
  },
  {
    id: "green-mile",
    title: "The Green Mile",
    genre: "Crime • Drama",
    duration: "189 mins",
    rating: "8.6",
    year: "1999",
    synopsis: "A death row guard discovers a gentle giant inmate possesses a miraculous gift for healing.",
    poster: "assets/images/green-mile.jpg"
  },
  {
    id: "forrest-gump",
    title: "Forrest Gump",
    genre: "Drama • Romance",
    duration: "142 mins",
    rating: "8.8",
    year: "1994",
    synopsis: "The history of the United States unfolds through the eyes of an Alabama man with an IQ of 75.",
    poster: "assets/images/forrest-gump.jpg"
  },
  {
    id: "good-will-hunting",
    title: "Good Will Hunting",
    genre: "Drama",
    duration: "126 mins",
    rating: "8.3",
    year: "1997",
    synopsis: "Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
    poster: "assets/images/good-will-hunting.jpg"
  },
  {
    id: "silence-of-lambs",
    title: "The Silence of the Lambs",
    genre: "Crime • Thriller",
    duration: "118 mins",
    rating: "8.6",
    year: "1991",
    synopsis: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to catch another serial killer.",
    poster: "assets/images/silence-of-lambs.jpg"
  }
];

const DEFAULT_SHOWTIMES = [
  { id: "st-1", movieId: "exorcist", hall: "Cinema 1", date: "2026-09-09", time: "14:00", price: 300, occupiedSeats: ["A1", "A2"] },
  { id: "st-2", movieId: "exorcist", hall: "Cinema 1", date: "2026-09-09", time: "18:00", price: 350, occupiedSeats: ["C3", "C4", "C5"] },
  { id: "st-3", movieId: "obsession", hall: "Cinema 2", date: "2026-09-09", time: "16:30", price: 350, occupiedSeats: ["B2"] },
  { id: "st-4", movieId: "backrooms", hall: "Cinema 3", date: "2026-09-09", time: "20:00", price: 300, occupiedSeats: [] }
];

// Initialize and Sync LocalStorage
function initStorage() {
  if (!localStorage.getItem("reelseat_movies")) {
    localStorage.setItem("reelseat_movies", JSON.stringify(DEFAULT_MOVIES));
  }
  if (!localStorage.getItem("reelseat_showtimes")) {
    localStorage.setItem("reelseat_showtimes", JSON.stringify(DEFAULT_SHOWTIMES));
  }
  if (!localStorage.getItem("reelseat_bookings")) {
    localStorage.setItem("reelseat_bookings", JSON.stringify([]));
  }
}

// Call storage setup immediately upon script load
initStorage();

// Data helper functions
function getMovies() {
  return JSON.parse(localStorage.getItem("reelseat_movies"));
}

function getMovieById(id) {
  const movies = getMovies();
  return movies.find(m => m.id === id) || movies[0];
}

function getShowtimesByMovieId(movieId) {
  const showtimes = JSON.parse(localStorage.getItem("reelseat_showtimes"));
  return showtimes.filter(s => s.movieId === movieId);
}