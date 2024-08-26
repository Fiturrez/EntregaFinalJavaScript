let productos = [
    {producto: 1, nombre: 'Cartera Leonor', precio: 65000},
    {producto: 2, nombre: 'Cartera Lourdes M', precio: 60000},
    {producto: 3, nombre: 'Cartera Lourdes S', precio: 50000},
    {producto: 4, nombre: 'Cartera Mochila ED', precio: 50000},

    {producto: 5, nombre: 'Portacelular A', precio: 15000},
    {producto: 6, nombre: 'Portacelular B', precio: 15000},
    {producto: 7, nombre: 'Maletin Lisboa', precio: 55000},
    {producto: 8, nombre: 'Rinonera Bordeaux', precio: 35000},
    
    {producto: 9, nombre: 'Libreta Arg', precio: 8000},
    {producto: 10, nombre: 'Tarjetero Uno', precio: 5000},
    {producto: 11, nombre: 'Tarjetero Dos', precio: 5000},
    {producto: 12, nombre: 'Monedero', precio: 6000},    
]


// Inicializar el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.producto === productoId);
    if (producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('cart-items');
    carritoItems.innerHTML = '';

    let total = 0;

    if (carrito.length > 0) {
        carritoItems.style.display = 'block'; // Muestra el carrito si hay items
        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio}`;
            carritoItems.appendChild(li);
            total += producto.precio;
        });

        const totalItem = document.createElement('li');
        totalItem.textContent = `Total: $${total}`;
        carritoItems.appendChild(totalItem);
    } else {
        carritoItems.style.display = 'none'; // Oculta el carrito si no hay items
    }
}

// Inicializar el carrito al cargar la página
actualizarCarrito();

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
}

// Configurar los eventos de los botones
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const productoId = parseInt(button.getAttribute('data-id'));
        agregarAlCarrito(productoId);
    });
});

// Inicializar el carrito al cargar la página
actualizarCarrito();