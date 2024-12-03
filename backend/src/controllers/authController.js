const db = require('../models/db')
// require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports.login = (req,res) =>{
    const {user,password} = req.body;
    const query = 'SELECT * FROM users WHERE  name = ? AND password = ?';

    try {
        db.query(query,[user,password], (err, recdsults) =>{
            if (err){
                res.send(err)
            }

            if(results.length > 0){
                console.log('usuario encontrado')
                const {name,password} = results;

                const token = jwt.sign({user:name},'Stack',{
                    expiresIn: '3m'
                })

                res.send({token})

            }else{
                console.log('usuario no existe')
                res.send({message:'el usuario no existe'})
            }
            
        })
    } catch (error) {
        
    }
}
