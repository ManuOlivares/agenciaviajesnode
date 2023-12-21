import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async  (req, res) => { // req: lo q enviamos || res: lo que express nos responde (inluyende autenticación)

   // Consultar 3 viajes del modelo Viaje

   const PromiseDB = [];

   PromiseDB.push( Viaje.findAll({ limit: 3}) );
   PromiseDB.push( Testimonial.findAll({ limit: 3}) );



    try {
        const resultado = await Promise.all( PromiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
    
        });

    } catch (error){
        console.log(error);

   } 
};

const paginaNosotros = (req, res) => { // req: lo q enviamos || res: lo que express nos responde (inluyende autenticación)
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => { // req: lo q enviamos || res: lo que express nos responde (inluyende autenticación)
    //Consultar BD
    const viajes = await Viaje.findAll();

    console.log(viajes);
    
    res.render('viajes', {
        pagina: 'Próximas rutas',
        viajes,  
    });
};

const paginaTestimoniales = async (req, res) => { // req: lo q enviamos || res: lo que express nos responde (inluyende autenticación)
    
    try {
        const testimoniales = await Testimonial.findAll();
        
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });

    } catch (error) {
       console.log(error)
    }  
};

// Muestra un viaje por slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne( { where : { slug } } );
        
        res.render('viaje', {
            pagina: 'Información del tour',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}