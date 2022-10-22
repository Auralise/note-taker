const express = require('express');
const path = require('path');
const primaryRouter = require('./routes');


 





const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', primaryRouter);













app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));