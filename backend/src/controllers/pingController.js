const db = require('../models/db')

module.exports.ping = (req,res) =>{
    const query = 'SELECT * FROM users;'

    try {
        db.query(query,(err,results)=>{
            res.json(results)
        });
    } catch (e) {
        console.log(e)
    }
}
