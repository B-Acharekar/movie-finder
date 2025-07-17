const apiKey = "60a7eb8d";

function searchMovie() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!query) {
    alert("Please enter a movie name.");
    return;
  }

  fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "False") {
        resultsDiv.innerHTML = `<p class="text-red-600 font-semibold text-center">❌ No results found.</p>`;
        return;
      }

      data.Search.forEach(movie => {
        const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x220?text=No+Image";
        resultsDiv.innerHTML += `
          <div onclick="location.href='movie.html?id=${movie.imdbID}'"
            class="flex items-center gap-4 cursor-pointer bg-white hover:bg-gray-100 rounded-lg shadow p-3 transition-all">
            <img src="${poster}" alt="${movie.Title}" class="w-20 h-28 object-cover rounded"/>
            <div>
              <h3 class="text-xl font-semibold text-gray-800">${movie.Title}</h3>
              <p class="text-gray-600">${movie.Year}</p>
            </div>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error("Error:", error);
      resultsDiv.innerHTML = `<p class="text-red-600">⚠️ Error fetching results.</p>`;
    });
}

const cardHTML = `
  <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-700" data-aos="fade-up">
    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" 
         alt="${movie.Title}" class="w-full h-72 object-cover rounded-t-xl">
    <div class="p-4">
      <h3 class="text-lg font-bold text-white mb-1">${movie.Title}</h3>
      <p class="text-sm text-gray-400">Year: ${movie.Year}</p>
    </div>
  </div>
`;
