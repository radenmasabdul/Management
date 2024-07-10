//import
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//init app
const app = express();

//use dependencies
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});