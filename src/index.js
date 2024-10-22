// Function to fetch and display the first movie's details
function fetchFirstMovie() {
    fetch('http://localhost:3000/films/1')
      .then(response => response.json()) // Convert response to JSON format
      .then(movie => {
        const moviePoster = document.getElementById('poster'); // Get the movie poster element
        const movieTitle = document.getElementById('title');   // Get the movie title element
        const movieRuntime = document.getElementById('runtime'); // Get the runtime display element
        const movieShowtime = document.getElementById('showtime'); // Get showtime display element
        const movieAvailableTickets = document.getElementById('available-tickets'); // Get available tickets display
        const movieDescription = document.getElementById('film-info'); // Get the movie description element

        // Populate the movie details
        moviePoster.src = movie.poster;
        moviePoster.alt = movie.title;
        movieTitle.textContent = movie.title;
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
        movieShowtime.textContent = `Showtime: ${movie.showtime}`;
        movieAvailableTickets.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
        movieDescription.textContent = movie.description; // Use textContent to display description

        // Add ticket-buying functionality
        addBuyTicketListener(movie);
      });
}

// Function to fetch all movies and populate the list
function fetchAllMovies() {
    fetch('http://localhost:3000/films')
      .then(response => response.json()) // Convert response to JSON format
      .then(movies => {
        const movieList = document.getElementById('films'); // Get the movie list element

        movies.forEach(movie => {
          const li = document.createElement('li');   // Create an `li` element for each movie
          li.textContent = movie.title;              // Set the movie title as the text content
          li.classList.add('film', 'item');          // Add necessary classes
          movieList.appendChild(li);                 // Add the `li` to the movie list

          // Add click event to display movie details when selected
          li.addEventListener('click', () => displayMovieDetails(movie));
        });
      });
}

// Function to display a movie's details in the main section
function displayMovieDetails(movie) {
    const moviePoster = document.getElementById('poster');
    const movieTitle = document.getElementById('title');
    const movieRuntime = document.getElementById('runtime');
    const movieShowtime = document.getElementById('showtime');
    const movieAvailableTickets = document.getElementById('ticket-num');
    const movieDescription = document.getElementById('film-info'); // Get the movie description element

    // Update the details of the selected movie
    moviePoster.src = movie.poster;
    moviePoster.alt = movie.title;
    movieTitle.textContent = movie.title;
    movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
    movieShowtime.textContent = `Showtime: ${movie.showtime}`;
    movieAvailableTickets.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
    movieDescription.textContent = movie.description; // Corrected to textContent
}

// Add functionality to buy tickets
const buyTicket = document.getElementById('buy-ticket')               
buyTicket.addEventListener('click', (e) => {
    if (availableTickets > 0) {
        availableTickets--
        document.getElementById('ticket-num').textContent = availableTickets
    
    if (availableTickets === 0) {
        buyTicket.textContent = 'sold-out'
    }
  }
})

// Initialize the app
window.onload = () => {
    fetchFirstMovie();  // Fetch and display the first movie's details
    fetchAllMovies();   // Fetch and display all movies in the list
};
