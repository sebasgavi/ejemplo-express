window.addEventListener('load', function(){

    let carrito = document.querySelector('.lista-carrito');

    var elementosCarrito = JSON.parse(localStorage.getItem('carrito'));
    if(elementosCarrito == null){
        elementosCarrito = [];
    }

    elementosCarrito.forEach(function(elem){
        carrito.innerHTML += `<li>${elem.titulo}</li>`;
    });

});