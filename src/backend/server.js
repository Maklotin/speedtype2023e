const express = require('express');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backupdatabase'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ', error);
    } else {
        console.log('Connected to the database');
    }
});


const app = express();

app.post('/backup', (req, res) => {
    const { brukeren, passordet, highscoren, accuracyen } = req.body;

    const insertQuery = 'INSERT INTO brukere'
})

const port = 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

