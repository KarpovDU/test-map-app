const pool = require('./config/db');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));


const routes = require('./routes');
app.get('/sources',  routes);
app.post('/sources',  routes);
app.put('/sources/:id',  routes);
app.delete('/sources/:id',  routes);

// app.use(express.json()); // Для обработки JSON в запросах

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});