// Dependencies
const express = require('express');
const mysql = require('mysql');

// Create Express server
const app = express();

//Connect to MySQL
const db = mysql.createConnection({
    //normally would be in .env
  host: 'localhost',
  user: 'user1',
  password: 'Password123',
  database: 'storage_db'
});

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Define routes

app.get('/test', (req, res) => {
    res.send('test')
})

app.get('/products/most_expensive', (req, res) => {
    let sql = 'SELECT * FROM product ORDER BY price DESC LIMIT 1'; 
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});
  
app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM product';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

app.get('/managers/highest_product_count', (req, res) => {
    let sql = `
    SELECT u.id, u.name, SUM(p.stock_qty) as total_quantity
    FROM users u
    JOIN division d ON u.id = d.manager_id
    JOIN product p ON d.id = p.division_id
    GROUP BY u.id, u.name
    ORDER BY total_quantity DESC
    LIMIT 1;
    `
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
})

app.get('/suppliers/highest_paid', (req, res) => {
    let sql = `
    SELECT s.id, s.name, SUM(p.price * p.stock_qty) as total_paid
    FROM supplier s
    JOIN product p ON s.id = p.supplier_id
    GROUP BY s.id, s.name
    ORDER BY total_paid DESC
    LIMIT 1;
    `
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
})
  

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
