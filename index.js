const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Todo modeli
const Todo = require('./models/Todo');

// Routes
app.get('/todos/:day', async (req, res) => {
    try {
        const todos = await Todo.find({ day: req.params.day });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text,
            day: req.body.day,
            completed: false
        });
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.completed = req.body.completed;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 