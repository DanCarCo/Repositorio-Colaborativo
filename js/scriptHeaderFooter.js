// scriptHeaderFooter.js

// Script para incluir el header y el footer en todas las páginas
document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
});

// Función para incluir el header y el footer
function includeHTML() {
    // Incluir el header
    fetch('/compartir/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Error en la carga del header');
            return response.text();
        })
        .then(data => {
            document.getElementById("header").innerHTML = data;
        })
        .catch(error => console.error('Error:', error));

    // Incluir el footer
    fetch('/compartir/footer.html')

        .then(response => {
            if (!response.ok) throw new Error('Error en la carga del footer');
            return response.text();
        })
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}

// JavaScript para actualizar el año en el copyright
    document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('year').textContent = new Date().getFullYear();
});
