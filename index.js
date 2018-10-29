const express = require('express');
const hbs = require('express-handlebars');

var app = express();

app.use(express.static('public'));
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');


var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());

var libros = require('./libros');

app.get('/', (req, res) => {
    var filtrado = libros.filter(function(libro){
        return libro.paginas < parseInt(req.query.paginas);
    });

    if(!req.query.paginas){
        filtrado = libros;
    }

    let contexto = {
        titulo: 'Otra cosa',
        libros: filtrado
    };
    res.render('index', contexto);
});


app.get('/libro/:titulo', (req, res) => {
    //res.send(req.params.titulo);+
    let libro = libros.find(function(elem){
        if(elem.titulo == req.params.titulo){
            return true;
        }
    });
    var contexto = {
        titulo: req.params.titulo,
        img: libro.img,
        user: {
            name: 'Sebastián',
            semestre: 20,
            materia: {
                name: 'web',
            }
        }
    };
    res.render('producto', contexto);
});

app.post('/api/agregarLibro/:titulo', function(req, res){

    var libro = libros.find(function(elem){
        if(elem.titulo == req.params.titulo) return true;
    });
    
    if(libro){
        res.send('error, libro ya existe');
    } else {
        libros.push({
            titulo: req.params.titulo,
            img: req.body.img,
            paginas: req.body.paginas,
        });
        res.send('ok, libro agregado');
    }
});

app.delete('/api/quitarLibro/:titulo', function(req, res){
    libros.splice(0, 1);
    res.send('ok, libro eliminado');
});


var carrito = [];

app.post('/api/agregarAlCarrito', function(req, res){
    // seleccionar la colección carritos
    // carritos.find({ user: 'asdasgkas12315' })

    let titulo = req.body.titulo;
    let libro = libros.find(function(elem){
        if(elem.titulo == titulo){
            return true;
        }
    });

    carrito.push(libro);
    // seleccionar colección productos
    // productos.find({ titulo: titulo });

    console.log(titulo);
    res.send(carrito);
});


app.get('/checkout', function(req, res){
    var contexto = {
        carrito: carrito,
    };
    res.render('checkout', contexto);
});

app.listen(5500);