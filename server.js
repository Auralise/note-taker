const express = require('express');
const path = require('path');
const primaryRouter = require('./routes');

//App initialisation
const app = express();

//port definition
const PORT = process.env.PORT || 3001;

//Static content to serve
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', primaryRouter);


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));