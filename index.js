const express = require('express');
const hbs = require('express-handlebars');

var app = express();

app.use(express.static('public'));
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

var libros = require('./libros');

app.get('/', (req, res) => {
    //res.send('home');
    let contexto = {
        titulo: 'Otra cosa',
        libros: libros
    };
    res.render('index', contexto);
});


app.get('/libros/:titulo', (req, res) => {
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

app.get('/api/agregarLibro/:titulo', function(req, res){
    var libro = libros.find(function(elem){
        if(elem.titulo == req.params.titulo) return true;
    });
    
    if(libro){
        res.send('error, libro ya existe');
    } else {
        libros.push({
            titulo: req.params.titulo,
            img: req.query.img,
        });
        res.send('ok, libro agregado');
    }
});

app.get('/api/quitarLibro/:titulo', function(req, res){
    libros.splice(0, 1);
    res.send('ok, libro eliminado');
});

app.listen(5500);