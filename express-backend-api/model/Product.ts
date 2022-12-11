const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  tags: [String],
  description: String,
  isVisible: Boolean,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  attributes: [{
    name: { type: String, required: true },
    value: { type: String, required: true },
  }]
});

module.exports = mongoose.model('Product', ProductSchema);