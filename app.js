const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const {Schema} = mongoose;

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean
});

const Task = mongoose.model('tasks', taskScheme);

app.use(cors());

const uri = 'mongodb+srv://Daria:restart987@cluster0.tbek4.mongodb.net/Test-data-base?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {
    res.send({data: result})
  });
});

app.post('/createTask', (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    Task.find().then(result => {
      res.send({data: result});
    });
  });
});

app.patch('/editTask', (req, res) => {
  const {_id, text, isCheck} = req.body;

  Task.updateOne({_id},
    {text, isCheck}).then(result => {
    Task.find().then(result => {
      res.send({data: result});
    })
  })
});

app.delete(`/deleteTask`, (req, res) => {
  Task.deleteOne({_id: req.body._id}).then(result => {
    Task.find().then(result => {
      res.send({data: result});
    })
  })
});

app.listen(4000, () => {
  console.log('Port 4000');
});