const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const apiRoutes = require('./src/modules/routes/routes')

app.use(cors());

const uri = 'mongodb+srv://Daria:restart987@cluster0.tbek4.mongodb.net/Test-data-base?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use('/', apiRoutes);

app.listen(4000, () => {
  console.log('Port 4000');
});