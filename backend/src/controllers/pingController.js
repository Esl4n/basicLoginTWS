const db = require('../models/db')

module.exports.ping = (req,res) =>{
    res.send('pong')
}
