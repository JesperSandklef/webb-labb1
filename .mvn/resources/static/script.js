
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('movies-list');

        data.forEach(movie => {
            const card = document.createElement('a');
            card.className = 'card';
            card.href = `movie.html?name=${encodeURIComponent(movie.name)}`;

            card.innerHTML = `
        <img src="${movie.picture}" alt="${movie.name}" style="max-width: 200px;">
        <h2>${movie.name}</h2>
        <p><strong>Regissör:</strong> ${movie.director}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
      `;

            list.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error when retrieving movie:", error);
        document.getElementById('movies-list').innerHTML = `<p>Could not load movie.</p>`;
    });
