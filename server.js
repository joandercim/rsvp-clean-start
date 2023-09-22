const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const foodTypeChoice = require('./Models/Person');
const connectToDB = require('./config/db');

connectToDB();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World');
});



// POST för att hantera data från formuläret
app.post('/posts', async (req, res) => {
    try {
        const person = new foodTypeChoice({
            username: req.body.name,
            foodType: req.body.foodType
        });
        
        await person.save();

        console.log('Data sparad i databasen ' + person);
        res.redirect('/');

    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

app.delete('/posts/:id', (req, res) => {

});

// Get all data i DB
app.get('/posts', async (req, res) => {
    try {
        const allData = await foodTypeChoice.find();

        res.json(allData);
    } catch (error) {
        console.log(`Resource not found: ${error}`);
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});