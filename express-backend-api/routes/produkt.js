var express = require('express');
const { MongoAPIError } = require('mongodb');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/OpinionCollector')

const Product = require('../model/Product');

router.get('/Product/:id', (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
