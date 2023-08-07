const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const conn = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'housing',
    port: "3306"
})

app.get('/customer', (req, res) => { conn.query("SELECT * FROM customer", (err, result) => {
    if (err) {
        console.error(err);
    } else {
        res.send(result);
    }
});
});

app.listen("3001", () => {
    console.log('Server is runing on port 3001');
});