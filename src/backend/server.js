const express = require('express');
const app = express();

app.post('/backup', (req, res) => {
    const { brukeren, passordet, highscoren, accuracyen } = req.body;
})

