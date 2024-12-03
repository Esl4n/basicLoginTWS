const db = require('../models/db')
const jwt = require('jsonwebtoken');


module.exports.login = (req,res) =>{
    const {user,password} = req.body;
    const query = 'SELECT * FROM users WHERE  name = ? AND password = ?';
    try {
        db.query(query,[user,password], (err, results) =>{
            if (err){
                console.log(err)
                res.send(err)
            }

            if(results.length > 0){
                console.log(`usuario '${user}' a entrado`)
                const {name} = results[0];

                const token = jwt.sign({user:name},'Stack',{
                    expiresIn: '3m'
                })

                res.send({token})

            }else{
                console.log('Intento de conexion fallida')
                res.send({message:'el usuario no existe'})
            }
            
        })
    } catch (error) {
        
    }
}



module.exports.logout = (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Obtén el token del encabezado.

        if (!token) {
            console.log("Token no proporcionado");
            return res.status(400).send({ message: "Token no proporcionado" });
        }

        const decoded = jwt.verify(token, 'Stack');
        const userName = decoded.user

        console.log(`Usuario '${userName}' a salido`);
        res.status(200).send({ message: "Logout exitoso" });
    } catch (error) {
        console.error("Error en logout:", error);
        res.status(500).send({ message: "Error del servidor" });
    }
};