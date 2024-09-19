document.addEventListener('DOMContentLoaded', () => {
    function mostrarSuscripcion() {
        Swal.fire({
            title: "Suscribite y accedé a promos exclusivas!",
            showDenyButton: true,
            confirmButtonText: "Suscribirme",
            denyButtonText: "Tal vez más tarde",
            customClass: {  
                confirmButton: 'custom-confirm-button',
                denyButton: 'custom-deny-button',
                container: 'custom-swal-container'
            }
        
        }).then((result) => {
            if (result.isConfirmed) {    
                window.location.href = "./pages/hablemos.html"; 
            } else if (result.isDenied) {
                 setTimeout(mostrarSuscripcion, 20000); 
                };
            }
        );
    }
    setTimeout(mostrarSuscripcion, 4000);
});