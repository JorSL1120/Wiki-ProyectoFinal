document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que el formulario se envíe
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = ""; // Limpia los resultados anteriores

  if (searchTerm.trim() === "") {
    searchResults.innerHTML = "<p>Por favor, ingresa una palabra para buscar.</p>";
    return;
  }

  // Busca en todos los párrafos del documento
  const paragraphs = document.querySelectorAll("p");
  let resultsFound = false;

  paragraphs.forEach((paragraph) => {
    if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
      const result = document.createElement("p");
      result.innerHTML = paragraph.innerHTML.replace(
        new RegExp(searchTerm, "gi"),
        (match) => `<mark>${match}</mark>`
      );
      searchResults.appendChild(result);
      resultsFound = true;
    }
  });

  if (!resultsFound) {
    searchResults.innerHTML = "<p>No se encontraron resultados.</p>";
  }
});
