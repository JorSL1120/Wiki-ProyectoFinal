module.exports = function(eleventyConfig) {
  // Configurar directorios de entrada y salida
  return {
    dir: {
      input: ".",        // Carpeta raíz (donde están tus Markdown)
      includes: "_includes", // Opcional: para layouts parciales
      output: "docs"     // Carpeta donde se guardará el HTML generado
    }
  };
};
