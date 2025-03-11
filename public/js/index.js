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
    const squareElement = document.getElementById("square")
    if (imgElement) {
        imgElement.style.opacity = 0; // Desvanece la imagen actual
        squareElement.style.opacity = 0;

        setTimeout(() => {
            squareElement.style.opacity = 1;

            imgElement.src = imagenesCarrusel[index];
            imgElement.alt = imagenesCarrusel[index]// Cambia la fuente de la imagen
            imgElement.style.opacity = 1; // Aparece la nueva imagen
            index = (index + 1) % imagenesCarrusel.length; // Avanza al siguiente índice
        }, 500); // Espera 500ms para cambiar la imagen
    }
}

// Cambia la imagen cada 3 segundos
setInterval(changeImage, 6000);
window.addEventListener("load", () => {
    const bar = document.querySelectorAll(".bar");
    const controlBtn = document.getElementById('controlBtn');
    const audioElement = document.getElementById('audioLink');
    let bars = document.getElementById("bars");
    //const audio ="https://fmhenderson.onlineradio.com.ar/";
    // Randomize animation duration for each bar
    bar.forEach((item) => {
        item.style.animationDuration = `${Math.random() * (0.9 - 0.2) + 0.5}s`;
    });

    const icon = controlBtn.querySelector('i'); // Selecciona el ícono dentro del botón

    let isPlaying = false;
    
    controlBtn.addEventListener('click', () => {
        if (isPlaying) {
            // Cambia a "Play"
            controlBtn.style.opacity="1";
            bars.style.display="none";
            icon.classList.remove('icon-pause');
            icon.classList.add('icon-play');
            console.log('Sonido pausado');
            // audioElement.src=""

        } else {
            // Cambia a "Pause"
            bars.style.display="flex";
            controlBtn.style.opacity="0";
            icon.classList.remove('icon-play');
            icon.classList.add('icon-pause');
            console.log('Sonido reproduciendo');
            //audioElement.src=audio
        }
        isPlaying = !isPlaying; // Alterna el estado
    });
});



document.addEventListener("DOMContentLoaded", () => {
    let blurBackground = document.getElementById("blurBackground");
    let infoProgramas = document.querySelectorAll(".infoPrograma"); // Todos los modales
    let infoTriggers = document.querySelectorAll(".infoProgramaTrigger"); // Todos los botones
    let volverButtons = document.querySelectorAll(".volverBoton"); // Todos los botones "Volver"
    let nav = document.getElementById("nav");

    // Función para ocultar todos los modales
    const hideAllModals = () => {

        blurBackground.classList.remove("active"); // Deactivate the blur background
        infoProgramas.forEach((infoDiv) => {
            infoDiv.classList.remove("show");
            infoDiv.classList.add("hide");
            infoDiv.style.visibility = "hidden"// Show the info div with animation
            // Ocultar todos los modales
            infoDiv.classList.remove("infoEstaBocaEsMiaStyle");

        });
        nav.style.display = "flex"; // Mostrar la navegación
    };

    // Mostrar el modal correspondiente al hacer clic en un botón
    infoTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            let targetId = trigger.getAttribute("data-target"); // Obtener el ID del modal
            let targetModal = document.getElementById(targetId); // Encontrar el modal correspondiente
          

            if (targetModal) {
                blurBackground.classList.add("active"); // Activar el fondo borroso
                targetModal.classList.add("show"); // Mostrar el modal correspondiente
                targetModal.style.visibility = "visible"
                targetModal.classList.remove("hide");
                nav.style.display = "none"; // Ocultar la navegación

                if (targetId === "InfoEstaBocaEsMia") {
                    targetModal.classList.add("infoEstaBocaEsMiaStyle");

                } else if (targetId === "InfoAlmaCriolla") {
                    targetModal.classList.add("infoAlmaCriollaStyle");
                }else if (targetId === "InfoDinamicaCultural") {
                    targetModal.classList.add("infoDinamicaCulturalStyle");
                }else if (targetId === "InfoCataclismo") {
                    targetModal.classList.add("infoCataclismoStyle");
                }else if (targetId === "InfoQueEscuchas") {
                    targetModal.classList.add("infoQueEscuchasStyle");
                }else if (targetId === "InfoTranqueraAbierta") {
                    targetModal.classList.add("infoTranqueraStyle");
                }else if (targetId === "InfoSabadosRecuerdos") {
                    targetModal.classList.add("infoSabadosStyle");
                };
            }
        });
    });

    // Ocultar el modal al hacer clic en el botón "Volver"
    volverButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            hideAllModals(); // Ocultar todos los modales
        });
    });

    // Ocultar el modal al hacer clic en el fondo borroso
    blurBackground.addEventListener("click", (e) => {
        // Asegurarnos de que el clic no provenga de ningún modal
        if (!Array.from(infoProgramas).some((infoDiv) => infoDiv.contains(e.target))) {
            hideAllModals(); // Ocultar todos los modales
        }
    });
});

var fullName = document.getElementById("fullName").value;
var email = document.getElementById("email");
var subject = "Pagina Web";
var body = document.getElementById("message");
var errorMessage = document.getElementById("errorMessage");
let submitButton = document.getElementById('send_message');

function resetStyles(field) {
    field.style.border = "none";
    field.style.borderBottom = " 2px solid #000";
    submitButton.style.backgroundColor = " rgb(138, 43, 226)";
    submitButton.style.color = "#fff";
    errorMessage.textContent = "";

}
email.addEventListener('input', () => resetStyles(email));
body.addEventListener('input', () => resetStyles(body));

submitButton.addEventListener('click', () => {

    let apiUrl = 'https://portfoliobackend-llcc.onrender.com/email/send';

    //reiniciando los estilos en caso de error en los campos
    email.style.border = "none";
    email.style.borderBottom = " 2px solid #000";
    body.style.border = "none";
    body.style.borderBottom = " 2px solid #000";


    if (!email.checkValidity()) {
        errorMessage.textContent = "El email no es valido o no ha sido introducido"
        email.style.border = "1px solid red"
    } else if (!body.checkValidity()) {
        errorMessage.textContent = "El campo mensaje no debe estar vacio."
        body.style.border = "1px solid red"

    } else {
        if (fullName === "") {
            fullName = "Anonymous"
        }

        let data = {
            "fullName": fullName,
            "emailAddress": email.value,
            "subject": subject,
            "body": body.value
        };

        console.log(data)


        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log('Respuesta cruda:', response); // Imprime la respuesta completa
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.text(); // Obtiene la respuesta como texto
            })
            .then(text => {
                console.log('Respuesta del servidor:', text); // Imprime el contenido de la respuesta
                try {
                    const jsonData = JSON.parse(text); // Intenta analizar como JSON
                    console.log('Datos JSON:', jsonData);
                } catch (error) {
                    console.error('La respuesta no es JSON:', text);
                }
            }).then(data => {
                // Manejar la respuesta de la API
                errorMessage.style.color = "#06ac17";
                errorMessage.textContent = "Email enviado correctamente ¡Gracias por contactarnos!";
                submitButton.style.backgroundColor = "#fff";
                submitButton.style.color = "#767676";

            })
            .catch(error => {
                submitButton.style.backgroundColor = "#fff";
                submitButton.style.color = "#767676";
                errorMessage.textContent = "Hubo un error al intentar enviar el Email, por favor intente mas tarde, muchas gracias.";
                console.error('Error al realizar la solicitud:', error);
            });
    }






});