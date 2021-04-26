const router = require('express').Router();
const Log = require('../models/log'); 
const validate = require('../middleware/validateSession');

router.get('/test', (req, res) => {
    res.send('Testing the log controller');
});

//POST WORKOUT LOGS 
router.post('/', validate, (req, res) => {

    Log.create({
        description: req.body.description, 
        definition: req.body.definition, 
        result: req.body.result, 
        owner_id: req.user.id 
    })
    .then(log => res.status(200).json({ log }))
    .catch(err => res.status(500).json({ message: 'Workout Log Creation Failed', error: err }))

}); 

//GET ALL WORKOUT LOGS FOR INDIVIDUAL USER 
router.get('/', validate, (req, res) => {

    let userid = req.user.id
    Log.findAll({
        where: {owner_id: userid}
    })
    .then(allLogs => res.status(200).json({ message: "All workout logs - keep up the great work!", allLogs }))
    .catch(err => res.status(500).json({ message: 'Sorry, no workout logs found.', error: err }))
}); 

//GET INDIVIDUAL WORKOUT LOGS BY ID 
router.get('/:id', validate, (req, res) => {

    Log.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(getWorkout => res.status(200).json({ message: `Workout Log #${req.params.id}`, getWorkout}))
    .catch(err => res.status(500).json({ message: 'Workout Log Not Found', error: err }))
});

//UPDATE INDIVIDUAL WORKOUT LOGS BY ID 
router.put('/:id', validate, (req, res) => {

    Log.update(req.body, { 
        where: {
            id:req.params.id
        }
    })
    .then(update => res.status(200).json({ message: `Workout Log #${req.params.id} has been updated successfully.`, update }))
    .catch(err => res.status(500).json({ message: 'Workout Log Update Failed', error: err }))
});

//DELETE INDIVIDUAL WORKOUT LOG BY ID 
router.delete('/:id', validate, (req, res) => {

    Log.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(deleteWorkout => res.status(200).json({ message: `Workout Log #${req.params.id} has been deleted successfully.`, deleteWorkout }))
    .catch(err => res.status(500).json({ message: 'Unable to Delete Workout Log', error: err }))
}); 


module.exports = router; 