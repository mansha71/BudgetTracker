const express = require('express');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

//go to local host 5000/api/test to see message
app.get('/api/test', (req, res) => {
    res.json('test one');
});

app.post('/api/transaction', (req, res) => {
    res.json(req.body);
})










const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
