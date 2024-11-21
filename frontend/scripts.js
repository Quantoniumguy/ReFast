document.getElementById('form-producto').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const categoria_id = document.getElementById('categoria').value;  // El id de la categoría
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById('imagen-producto').files[0];

    // Crear FormData para enviar los datos
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('categoria_id', categoria_id);  // Enviar el id de la categoría
    formData.append('cantidad', cantidad);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);

    if (imagen) {
        formData.append('imagen', imagen);
    }

    try {
        // Enviar datos al servidor
        const response = await fetch('http://localhost:4000/producto', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Si es necesario, incluye el token
            }
        });

        const data = await response.json();
        if (response.ok) {
            alert('Producto guardado correctamente');
        } else {
            mostrarVentanaError(data.message || 'Error al guardar el producto');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarVentanaError('Hubo un error al intentar guardar el producto');
    }
});
