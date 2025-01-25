const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Welcome to the API");
});

const PORT = process.env.PORT || 3000;
// scdcjs
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
