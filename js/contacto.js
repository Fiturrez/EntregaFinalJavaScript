document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const comentarios = document.getElementById('comentarios').value.trim() || 'Sin comentarios';

        if (!validarNombre(nombre)) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el nombre',
                text: 'Por favor, ingresa un nombre válido (solo letras).',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        if (!validarEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el email',
                text: 'Por favor, ingresa un email válido.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const contactData = {
            nombre,
            email,
            comentarios
        };

        let storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];

        storedContacts.push(contactData);

        localStorage.setItem('contacts', JSON.stringify(storedContacts));

        Swal.fire({
            icon: 'success',
            title: 'Datos guardados con éxito',
            text: 'Recibirás nuestras novedades antes que nadie!',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            form.reset();
        });
    });

    function validarNombre(nombre) {
        const namePatron = /^[A-Za-z\s]+$/; // Solo letras y espacios
        return namePatron.test(nombre);
    }
    
    function validarEmail(email) {
        const emailPatron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPatron.test(email);
    }
}); 
