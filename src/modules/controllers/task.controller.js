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

  if (req.body.hasOwnProperty('_id') && (req.body.hasOwnProperty('text') || req.body.hasOwnProperty('isCheck'))) {
    Task.find().then(result => {
        if (req.body.text) {
          Task.updateOne({_id: req.body._id}, {text: req.body.text}
          ).then(result => {
            Task.find().then(result => {
              res.send({data: result})
            })
          })
        }
      }
    ).then(result => {
      Task.find().then(result => {
        if (req.body.isCheck) {
          Task.updateOne({_id: req.body._id}, {isCheck: req.body.isCheck}).then(result => {
            Task.find().then(result => {
              res.send({data: result})
            })
          })
        }
      })

    })
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