const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

// // Handle production
// if(process.env.NODE_ENV === 'weird') {
//     // Static folder
//     app.use(express.static(path.join(__dirname,'public')));

//     // Handle SPA
//     app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
// }
app.use(express.static(path.join(__dirname,'public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));



