const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cors())
app.use(bodyParser.json());

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'licenta'
});


app.put('/addUser', function(req, res) {
    let sql = 'INSERT INTO user(id, username, password) VALUES (?, ?, ?)';
    let values = [req.body.id,req.body.username, req.body.password];
    connection.getConnection(function(err, connection) {
        connection.query(sql, values, function(error, results, fields) {
            connection.release();
            if (error) throw error;
            res.send(results);
        });
    });
});

app.delete('/removeUser', function(req, res) {
    let sql = 'DELETE FROM `user` WHERE id = "?";';
    sql = sql.replace('?',req.body.id);
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send(results)
        });
    });
});

app.get('/getUser/:username', function(req,res){
    let sql = 'SELECT * FROM user WHERE username = "$1"'
    sql = sql.replace('$1',req.params.username);
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            connection.release();
            if (error) throw error;
            res.send(results)
        });
    });
})


app.put('/addPlant', function(req, res) {
    let sql = 'INSERT INTO plant(id, name, water, type, id_user) VALUES (?, ?, ?, ?, ?)';
    let values = [req.body.id, req.body.name, req.body.water, req.body.type, req.body.id_user];
    connection.getConnection(function(err, connection) {
        connection.query(sql, values, function(error, results, fields) {
            connection.release();
            if (error) throw error;
            res.send(results);
        });
    });
});

app.delete('/removePlant', function(req, res) {
    let sql = 'DELETE FROM `plant` WHERE id = "?";';
    sql = sql.replace('?',req.body.id);
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send(results)
        });
    });
});

app.delete('/removePlants', function(req, res) {
    let sql = 'DELETE FROM `plant` WHERE id_user = "?";';
    sql = sql.replace('?',req.body.id_user);
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send(results)
        });
    });
});

app.get('/getPlant/:id', function(req,res){
    let sql = 'SELECT * FROM plant WHERE id = "$1"'
    sql = sql.replace('$1',req.params.id);
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            connection.release();
            if (error) throw error;
            res.send(results)
        });
    });
})

app.get('/getPlants/:id_user', function(req,res){
    let sql = 'SELECT * FROM plant WHERE id_user = "$1"'
    sql = sql.replace('$1',req.params.id_user);
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            connection.release();
            if (error) throw error;
            res.send(results)
        });
    });
})

app.post('/predict', async (req, res) => {
    const { image } = req.body;
    /*
    if (!image) {
        return res.status(400).json({ error: 'No image provided' });
    }
    */
    const pythonProcess = spawn('python', ['test.py']); // Adjust to 'python3' if necessary
    result = ''
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stdout.on('end', () => {
        try {
            const output = JSON.parse(result);
            res.status(200).json(output); // Send response only once
        } catch (error) {
            console.error('Error parsing prediction result:', error);
            res.status(500).json({ error: 'Error parsing prediction result' });
        }
    });
});


app.listen(3000,() =>{
    console.log('Server listening on port 3000')
});
