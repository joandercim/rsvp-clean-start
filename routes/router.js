const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');


// Get all data i DB
router.get('/', async (req, res) => {
    try {
      const allData = await Guest.find();
      res.json(allData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  });
  
  // POST för att hantera data från formuläret
  router.post('/', async (req, res) => {
    const person = new Guest({
      username: req.body.name,
    });
  
    try {
      await person.save();
      console.log('Data sparad i databasen ' + person);
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
      try {
          const user = await Guest.findById(req.params.id);

          // Match the usernams

          if (Guest.username === req.body.name) {
            await Guest.findByIdAndDelete(req.params.id);
            return res.json({ success: true, data: {} }); 
          }

          // Usernames do not match
          return res.status(403).json({ success: false, error: 'You are not authorized to delete this resource.' });
    } catch (error) {}
  });

module.exports = router;