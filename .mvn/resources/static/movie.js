const params = new URLSearchParams(window.location.search);
const movieName = params.get("name");

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const movie = data.find(m => m.name === movieName);
        const container = document.getElementById("movie-info");

        if (movie) {
            container.innerHTML = `
        <h1>${movie.name}</h1>
        <img src="${movie.picture}" alt="${movie.name}">
        <p><strong>Regissör:</strong> ${movie.director}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p>${movie.description}</p>
        <form id="rate-form">
          <label for="rating">Betyg (1–5):</label>
          <input type="number" id="rating" name="rating" min="1" max="5" required>
          <button type="submit">Save rating</button>
          <p id="feedback"></p>
        </form>
        <button onclick="goBack()">Back</button>
      `;

            document.getElementById('rate-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const rating = Number(document.getElementById('rating').value);
                const feedback = document.getElementById('feedback');

                if (rating >= 1 && rating <= 5) {
                    feedback.textContent = `You gave the rating ${rating}. thank you for the rating!`;
                } else {
                    feedback.textContent = 'Enter a number between 1-5.';
                }
            });

        } else {
            container.innerHTML = `<p>Movie could not be found.</p>`;
        }
    })
    .catch(error => {
        console.error("error retrieving movie data:", error);
        document.getElementById("movie-info").innerHTML = `<p>Could not load movie.</p>`;
    });

function goBack() {
    window.history.back();
}
