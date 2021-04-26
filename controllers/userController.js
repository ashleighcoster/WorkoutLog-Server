const router = require('express').Router(); 
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

//TESTING THE USER CONTROLLER
router.get('/test', (req, res) => {
    res.send('Testing the user controller'); 
}); 

//REGISTER NEW USER
router.post('/register', (req, res) => {
    User.create({                       
        username: req.body.username,         
        passwordhash: bcrypt.hashSync(req.body.passwordhash, 15)   
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '1d'})
        res.send({ user, token })
    })      
    
    .catch(function(err) {
        res.status(500).json({error: err}); 
    });
});

//USER LOGIN 
router.post('/login', (req, res) => {
    User.findOne({ 
        where: { 
            username: req.body.username
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.passwordhash, user.passwordhash, function(err, matches) {
               
            matches ? generateToken(user) : res.send('Incorrect Password')
            })

            function generateToken(user) {
                let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'});
                res.send({user, token})
            }

        } else {
        res.send('Sorry, no user found in the database');
        }
    })
})

module.exports = router; 