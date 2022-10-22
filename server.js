const express = require('express');
const path = require('path');
const getRoutes = require('./routes/get-routes');

 





const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));


app.use('/', getRoutes);

// app.get('/notes', (req, res) => {
//     console.log(`${req.method}`)
//     res.sendFile('public/notes.html');
// })












app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));