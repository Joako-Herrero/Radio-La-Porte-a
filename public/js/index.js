let index = 0;

function changeImage() {
    const imagenesCarrusel = [
        "../public/images/tour-1.webp",
        "../public/images/tour-2.webp",
        "../public/images/tour-3.webp",
        "../public/images/tour-4.webp",
        "../public/images/tour-5.webp"
    ];
    const imgElement = document.getElementById("tourCarrusel");

    if (imgElement) {
        imgElement.style.opacity = 0; // Desvanece la imagen actual

        setTimeout(() => {
            imgElement.src = imagenesCarrusel[index]; // Cambia la fuente de la imagen
            imgElement.style.opacity = 1; // Aparece la nueva imagen
            index = (index + 1) % imagenesCarrusel.length; // Avanza al siguiente índice
        }, 500); // Espera 500ms para cambiar la imagen
    }
}

// Cambia la imagen cada 3 segundos
setInterval(changeImage, 3000);