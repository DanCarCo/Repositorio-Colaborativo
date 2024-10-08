
// Script para incluir el header y el footer en todas las páginas
document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
});

function includeHTML() {
    // Incluir el header
    fetch('/blog-colaborativo/compartir/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    // Incluir el footer
    fetch('/blog-colaborativo/compartir/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
}

// JavaScript para actualizar el año en el copyright
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('year').textContent = new Date().getFullYear();
});