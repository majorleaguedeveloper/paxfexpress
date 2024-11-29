// models/item.js
const mongoose = require('mongoose');

// Define the schema for an item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
});

// Create the model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
