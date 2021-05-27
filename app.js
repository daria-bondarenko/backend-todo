const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const { Schema } = mongoose;

const taskScheme = new Schema ({
  text: String,
  isCheck: Boolean
});

const Task = mongoose.model('tasks', taskScheme);

app.use(cors());

const uri = 'mongodb+srv://Daria:restart987@cluster0.tbek4.mongodb.net/Test-data-base?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());

app.get('/allTasks', (req,res) => {
  Task.find().then(result => {
    res.send({data: result})
  });
});

app.post('/createTask', (req,res) => {
  console.log(req.body);
  const task = new Task(req.body);
  task.save().then(result => {
    res.send('Task created');
  })
});

app.patch('/editTask', (req,res) => {
  console.log(req.body.id, req.body.text)
  Task.updateOne({_id: req.body.id}, {text: req.body.text, isCheck: req.body.isCheck}).then(result => {
    res.send('Task edited');
  });
});

app.delete(`/deleteTask`, (req,res) => {
  Task.deleteOne({_id: req.body.id}).then(result => {
    res.send('Task deleted');
  });
});

app.listen(4000, () => {
  console.log('Port 4000');
});