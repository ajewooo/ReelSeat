// assets/js/movie-details.js

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  const movie = getMovieById(movieId);
  const showtimes = getShowtimesByMovieId(movieId);

  // 1. Populate UI Text and Images
  if (movie) {
    // Backdrop and Poster (Fallback to poster if backdrop doesn't exist)
    document.getElementById('backdrop-img').style.backgroundImage = `linear-gradient(to top, #121214 0%, transparent 50%), url('${movie.backdrop || movie.poster}')`;
    document.getElementById('detail-poster').src = movie.poster;
    
    // Core details
    document.getElementById('detail-title').textContent = movie.title;
    document.getElementById('detail-synopsis').textContent = movie.synopsis;
    document.getElementById('detail-duration').textContent = movie.duration;
    document.getElementById('detail-rating').textContent = movie.rating;
    
    // Check for new properties, provide fallbacks if they aren't in store.js yet
    document.getElementById('detail-cast').textContent = movie.cast || "Cast details unavailable.";
    document.getElementById('detail-release').textContent = movie.releaseDate || movie.year;
    document.getElementById('detail-age').textContent = movie.ageRating || "PG-13";

    // Convert genre string "Horror • Thriller" to vertical list
    const genreUl = document.getElementById('detail-genre-list');
    genreUl.innerHTML = ''; 
    const genres = movie.genre.split('•');
    genres.forEach(g => {
      const li = document.createElement('li');
      li.textContent = `• ${g.trim()}`;
      genreUl.appendChild(li);
    });
  }

  // 2. Handle "Book Tickets" Interaction
  const bookBtn = document.getElementById('book-tickets-btn');
  const showtimeSection = document.getElementById('showtime-section');
  const showtimeList = document.getElementById('showtime-list');
  const proceedBtn = document.getElementById('proceed-seats-btn');
  let selectedShowtimeId = null;

  bookBtn.addEventListener('click', () => {
    // Reveal the showtimes section smoothly
    showtimeSection.style.display = 'block';
    showtimeSection.scrollIntoView({ behavior: 'smooth' });
  });

  // 3. Render Showtimes
  if (showtimes && showtimes.length > 0) {
    showtimes.forEach(showtime => {
      const btn = document.createElement('button');
      btn.className = 'time-slot-btn';
      btn.innerHTML = `<strong>${showtime.time}</strong><br><span style="font-size: 0.8rem;">${showtime.hall} • ₱${showtime.price}</span>`;
      
      btn.addEventListener('click', () => {
        document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedShowtimeId = showtime.id;
        proceedBtn.disabled = false;
      });

      showtimeList.appendChild(btn);
    });
  } else {
    showtimeList.innerHTML = '<p style="color: var(--text-muted);">No showtimes currently scheduled.</p>';
  }

  // 4. Proceed to Seat Picker
  proceedBtn.addEventListener('click', () => {
    if (selectedShowtimeId) {
      localStorage.setItem('reelseat_current_showtime', selectedShowtimeId);
      window.location.href = 'seat-selection.html';
    }
  });
});