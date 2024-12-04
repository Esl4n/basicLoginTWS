const express = require('express');
const app = express();
const port = 8000;
const routes = require('./api/endPoint');
const cors = require('cors');

app.use(express.json())

app.use(express.urlencoded({extended:true}));


app.use(cors({
    origin:['https://frontendlogin-gmwi.onrender.com/' || "http://localhost:5173"],
    methods: ['GET','POST']
}));

app.options('*',cors())

/** Rutas*/
app.use('/', routes)








/**Listen del servidor */
app.listen(port, ()=>{
    console.log(`servidor escuchando desde el puerto ${port}` )
})
