window.addEventListener('load', function(){

    var elementosCarrito = JSON.parse(localStorage.getItem('carrito'));
    if(elementosCarrito == null){
        elementosCarrito = [];
    }
    

    function renderCarrito(){
        let total = 0;
        elementosCarrito.forEach(function(elem){
            total += parseInt(elem.precio);
        });
        document.querySelector('.carrito').innerText = 'Total: $' + total + ' - ' + elementosCarrito.length;
    }

    renderCarrito();
    //console.log(total);



    document.querySelector('.btn-enviar')
        .addEventListener('click', function(evento){
            evento.preventDefault();

            var nombre = document.querySelector('.input-nombre');
            var img = document.querySelector('.input-img');
            var paginas = document.querySelector('.input-paginas');
            
            fetch(`/api/agregarLibro/${nombre.value}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `img=${img.value}&paginas=${paginas.value}`
                })
                .then(function(respuesta){
                    return respuesta.text();
                })
                .then(function(texto){
                    console.log(texto);
                });
        });


    document.querySelector('.btn-eliminar')
        .addEventListener('click', function(evento){
            evento.preventDefault();

            var nombre = document.querySelector('.input-nombre');
            
            fetch(`/api/quitarLibro/${nombre.value}`, {
                    method: 'DELETE',
                })
                .then(function(respuesta){
                    return respuesta.text();
                })
                .then(function(texto){
                    console.log(texto);
                });
        });


    document.querySelectorAll('.book a').forEach(function(elem){
        elem.addEventListener('click', function(event){
            event.preventDefault();
            let parent = elem.parentElement.parentElement;
            
            let obj = {
                titulo: parent.querySelector('header').innerText,
                img: parent.querySelector('img').getAttribute('src'),
                precio: elem.getAttribute('data-precio'),
            };

            elementosCarrito.push(obj);
            
            localStorage.setItem('carrito', JSON.stringify(elementosCarrito));

            renderCarrito();


            let variables = new URLSearchParams();
            variables.append('titulo', obj.titulo);

            fetch('/api/agregarAlCarrito', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: variables.toString(),
                })
                .then(function(respuesta) {
                    return respuesta.text();
                })
                .catch(function(error){
                    console.error(error);
                })
                .then(function(mensaje){
                    console.log(mensaje);
                });
        });
    });
    
});
