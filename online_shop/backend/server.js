const express = require('express');

const sqlite3 = require ('sqlite3').verbose();

const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST']
}));

const db = new sqlite3.Database('./database.db');

const mahsulotlar = [
    { name: 'Noutbuk', price: 8500000, description: "O'qish va ish uchun yengil noutbuk", image: '💻' },
    { name: 'Smartfon', price: 4200000, description: "Kuchli kamera va katta batareya", image: '📱' },
    { name: 'Quloqchin', price: 550000, description: "Simsiz quloqchin", image: '🎧' },
    { name: 'Aqlli soat', price: 1200000, description: "Qadam va pulsni kuzatadi", image: '⌚' },
];

db.run(`CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
    )`, (err) => {
        if (err) {
            return console.error(err.message);
        }

        db.all('SELECT * FROM products', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }

            if (rows.length == 0) {
                mahsulotlar.forEach((m) => {
                    db.run(
                        `INSERT INTO products (name, price, description, image)
                        VALUES (?, ?, ?, ?)`,
                        [m.name, m.price, m.description, m.image]
                    )
                })
            }
        })
    } )

db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    productId INTEGER NOT NULL
    )`);

app.get('/', (req, res) =>{
    res.send('Onlayn shop API ishlayapti!');
});

app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message});
        } else{
            res.json(rows)
        }
    })
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    db.all('SELECT * FROM products WHERE id = ?', [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (rows.length == 0) {
            return res.status(404).json({
                error: 'Mahsulot topilmadi',
                message: `ID ${id} ga ega mahsulot mavjud emas`
            });
        }

        res.json(rows[0]);
    });
});

app.post('/orders', (req, res) => {
    const { name, phone, productId } = req.body;

    if (!name || !phone || !productId) {
        return res.status(400).json({error: "Barcha maydonlarni (name, phone, ProductId) to'ldiring!"});
    }

    db.all('SELECT * FROM products WHERE id = ?', [productId], (err, rows) =>
    {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        
        if (rows.length == 0) {
            return res.status(404).json({ error: 'Bunday mahsulot topilmadi!'});
        }
        
        const sql = `INSERT INTO orders (name, phone, productId) VALUES (?, ?, ?)`;

        db.run(sql, [name, phone, productId], function (err) {
            if (err) {
                                return res.status(500).json({ error: err.message });
            }
            
            res.status(201).json({
                message: 'Buyurtma qabul qilindi',
                order: {
                    id: this.lastID,
                    name,
                    phone,
                    product: rows[0].name
                }
            });
        });
    });
});

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});

