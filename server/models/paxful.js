// models/item.js
const mongoose = require('mongoose');

// Define the schema for an item
const paxfulSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
  password: String, 
});

// Create the model
const Paxful = mongoose.model('Paxful', paxfulSchema);

module.exports = Paxful;
