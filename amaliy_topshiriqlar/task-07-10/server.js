const express = require('express');

const app = express();
const PORT = 3000;

const products = [
    { id: 1, name: "Noutbuk", price: 800 },
    { id: 2, name: "Smartfon", price: 400 },
    { id: 3, name: "Quloqchin", price: 50 }
];

app.get('/', (req, res) => {
     res.send('Salom, Node.js!');
 });

app.get('/about', (req, res) => {
    res.send("Bu Node.js va Express.js bo'yicha amaliy mashg'ulot serveri.");
});

app.get('/contact', (req, res) => {
    res.send("Aloqa uchun: support@example.com yoki +998901234567");
});

app.get('/time', (req, res) => {
    const hozirgiVaqt = new Date().toLocaleString();
    res.send(`Hozirgi sana va vaqt: ${hozirgiVaqt}`);
});

app.get('/users/:id', (req, res) => {
   
    const userId = req.params.id;

    res.json({
        message: "Foydalanuvchi topildi",
        id: userId
    });
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id); 

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            error: "Mahsulot topilmadi",
            message: `ID ${id} ga ega mahsulot mavjud emas`
        });
    }

    res.json(product);
});

app.listen(PORT, () => {
     console.log(`Server ishga tushdi: http://localhost:${PORT}`);
 });