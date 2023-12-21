import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//Conectar Base de datos
db.authenticate()
    .then(() => console.log('Base de Datos conectada'))
    .catch( error => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Agregar body parse para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Middleware   Obtener la fecha actual 
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de turismo";
    return next();
    
})

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar Router
app.use('/', router);


app.listen(port,() => {
    console.log(`El servidor está funcionando en el puerto ${port}`)
} );