document.getElementById("searchInput").addEventListener("input", async function () {
  const searchInput = this.value.trim().toLowerCase();
  const paragraphs = document.querySelectorAll("main p");
  const linkedFiles = ["../acerca.html", "../index.html", "../Casillas_Keylor_Courtois/index.html", "../Cristiano_Ronaldo/index.html", "../El_numero_7/index.html", "../Federico_Valverde/index.html", "../Jude_Bellingham/index.html", "../La_BBC/index.html", "../La_Decima/index.html", "../La_Decimocuarta/index.html", "../Alfredo_Di_Stefano/index.html", "../La_Quinta_del_Buitre/index.html", "../Las_3_Champions_consecutivas/index.html", "../Los_Galacticos/index.html", "../Luis_Figo/index.html", "../Maximos_goleadores/index.html", "../Mexicanos_en_el_Real_Madrid/index.html", "../Raul_Gonzalez_Blanco/index.html", "../Sergio_Ramos/index.html", "../Vinicius_Jr/index.html", "../Zinedine_Zidane/index.html"];

  // limpia resultados externos
  const externalResults = document.getElementById("externalResults");
  externalResults.innerHTML = "";

  // restaurar todo si no  hay nada escrito
  if (searchInput === "") {
    paragraphs.forEach((p) => {
      p.style.display = "block";
      p.innerHTML = p.textContent;
    });
    return;
  }

  // busca donde se encuentra ubicado
  paragraphs.forEach((p) => {
    const text = p.textContent.toLowerCase();
    if (text.includes(searchInput)) {
      p.style.display = "block";
      const regex = new RegExp(`(${searchInput})`, "gi");
      p.innerHTML = p.textContent.replace(regex, `<mark>$1</mark>`);
    } else {
      p.style.display = "none";
    }
  });

  // busca en los otros archivos
  for (const file of linkedFiles) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        console.error(`No se pudo cargar el archivo: ${file}`);
        continue;
      }

      const text = await response.text();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = text;

      // busca las coincidencias en los parrafos
      const externalParagraphs = tempDiv.querySelectorAll("p");
      externalParagraphs.forEach((p) => {
        const text = p.textContent.toLowerCase();
        if (text.includes(searchInput)) {
          const regex = new RegExp(`(${searchInput})`, "gi");
          const highlighted = p.textContent.replace(regex, `<mark>$1</mark>`);

          // el resultado se ve en el contenedor asignado en el main
          externalResults.innerHTML += `
            <div>
              <p>${highlighted}</p>
              <small>Encontrado en: <a href="${file}" target="_blank">${file}</a></small>
            </div>
            <hr>
          `;
        }
      });
    } catch (error) {
      console.error(`Error al cargar ${file}:`, error);
    }
  }
});
