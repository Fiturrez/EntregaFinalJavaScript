let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

async function cargarProductos() {
    try {
        const response = await fetch("../json/catalogo.json");
        const data = await response.json();
        productos = data;
        console.log("productosCargados: ", productos);
        actualizarCarrito();
    } catch (error) {
        console.error("Error al cargar los productos: ", error);
    }
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.producto === productoId);
    if (producto) {
        const productoEnCarrito = carrito.find(p => p.producto === productoId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad = (productoEnCarrito.cantidad || 1) + 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    } else {
        console.error('Producto no encontrado:', productoId);
    }
}

function eliminarDelCarrito(productoId) {
    const producto = carrito.find(p => p.producto === productoId);
    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            carrito = carrito.filter(p => p.producto !== productoId);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const carritoItems = document.getElementById('cart-items');
    carritoItems.innerHTML = '';

    let total = 0;
    let totalItems = 0;

    if (carrito.length > 0) {
        carritoItems.style.display = 'block'; 
        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} <span class="remove-item" onclick="eliminarDelCarrito(${producto.producto})">&times;</span>`;
            carritoItems.appendChild(li);
            total += producto.precio * producto.cantidad;
            totalItems += producto.cantidad;
        });

        const totalItem = document.createElement('li');
        totalItem.textContent = `Total: $${total}`;
        carritoItems.appendChild(totalItem);
    } else {
        carritoItems.style.display = 'none';
    }

    document.getElementById('cart-count').textContent = totalItems;
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
}

function toggleCarrito() {
    const cartView = document.getElementById('cart-view');
    cartView.style.display = cartView.style.display === 'block' ? 'none' : 'block';
}

document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const productoId = parseInt(button.getAttribute('data-id'));
        agregarAlCarrito(productoId);
    });
});

cargarProductos();

