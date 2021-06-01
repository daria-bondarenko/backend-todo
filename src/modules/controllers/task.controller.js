const Task = require('../../db/models/ task/index');

module.exports.getAllTasks = (req, res) => {
  Task.find().then(result => {
    res.send({data: result})
  });
};

module.exports.createNewTask = (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    Task.find().then(result => {
      res.send({data: result});
    });
  });
};

module.exports.changeTaskInfo = (req, res) => {
  const {_id, text, isCheck} = req.body;

  if (req.body.hasOwnProperty('_id') && (req.body.hasOwnProperty('text') || req.body.hasOwnProperty('isCheck'))) {
    for (let key in req.body) {
      if (key === 'isCheck' || 'text' && req.body[key] != null || undefined) {
        Task.updateOne({ _id }, {[key]: req.body[key]}
        ).then(result => {
          Task.find().then(result => {
            res.send({data: result})
          })
        })
      }
    }
  } else {
    Task.find().then(result => {
      res.send({data: result})
    })
  }
}

module.exports.deleteTask = (req, res) => {
  Task.deleteOne({_id: req.body._id}).then(result => {
    Task.find().then(result => {
      res.send({data: result});
    })
  })
};