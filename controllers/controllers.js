const jwt = require('jsonwebtoken'), bcrypt = require('bcrypt');

const noteSchema = require('../models/note'),
  userSchema = require('../models/user');
const uploadpath = __dirname + "/../uploads/";

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let jwtSecret = '';
for (let i = 0; i < 25; i++) {
  jwtSecret += characters[Math.floor(Math.random() * characters.length)];
}

exports.Notes = (req, res) => {
  let rp = req.params;
  noteSchema.find({creator: rp.id})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error);
    });
}
exports.newNote = (req, res) => {
  let rb = req.body;
  let note = {
    creator: rb.creator,
    name: rb.name,
    content: rb.content,
    background: rb.background
  };
  noteSchema.create(note)
    .then(data => {
      res.json({ message: "Created successfully!" });
      console.log(rb);
    })
    .catch(error => {
      console.log(error);
    });
}
exports.getNote = (req, res) => {
  let rp = req.params;
  noteSchema.findById(rp.id)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error);
    });
}

exports.editNote = (req, res) => {
  let rb = req.body, rp = req.params;
  let note = {
    name: rb.name,
    content: rb.content
  };
  noteSchema.findByIdAndUpdate(rp.id, {
    $set: rb
  })
    .then(data => {
      res.json({ message: "Edited successfully!" });
    })
    .catch(error => {
      console.log(error);
    });
}
exports.changeBackground = (req, res) => {
  let rb = req.body, rp = req.params;
  noteSchema.findByIdAndUpdate(rp.id, {background: rb.background})
  .then(result => {
    res.json({message: "Background changed successfully!"})
  })
  .catch(error => {
    console.log(error);
  });
}
exports.deleteNote = (req, res) => {
  let rp = req.params;
  noteSchema.findByIdAndDelete(rp.id)
    .then(data => {
      res.json({ message: "Deleted successfully!" });
    })
    .catch(error => {
      console.log(error);
    });
}
exports.SearchNote = (req, res) => {
  let keyword = req.params.keyword;
  let rp = req.params;
  noteSchema.aggregate([{$search: { index: "default", text: { query: `${keyword}`, path: { wildcard: "*" }}}}]),
  postMo.  .hen(data => {
    res.send(data);
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
}
exports.NotesCollection = (req, res) => {
  noteSchema.find()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.log(error);
  });
}
exports.Signup = (req, res) => {
  let rb = req.body, rf = req.files;
  let file = rf.file;
  let filename = file.md5 + file.name;
  let newuser = {
    first_name: rb.first_name,
    last_name: rb.last_name,
    email: rb.email,
    password: rb.password,
    photo: filename
  };
  console.log(file);
  userSchema.find({ email: rb.email })
    .then((exist) => {
      console.log(exist);
      if (newuser.email === exist.email) {
        res.json({
          message: "Email already used!"
        });
      }
      else {
        file.mv(`${uploadpath}${filename}`, (err) => {
          if (!err) {
            userSchema.create(newuser)
              .then((user) => {
                res.json({
                  message: "Registered successfully!"
                });
              })
              .catch((err) => {
                if (err.keyPattern.email == 1) {
                  res.json({ message: "Email already used!" });
                } else {
                  res.json({
                    message: "Registration failed! ",
                    error: err
                  });
                  console.log(err);
                }
              });
          }
        })
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
exports.Users = (req, res) => {
  userSchema.find()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      console.log(err);
    });
}
exports.getUser = (req, res) => {
  let rp = req.params;
  userSchema.findOne({_id: rp.id})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error);
    });
}
exports.editUser = (req, res) => {
  let rb = req.body, rp = req.params;
  let data = {
    first_name: rb.first_name,
    last_name: rb.last_name
  };
  userSchema.findByIdAndUpdate(rp.id, { $set: data })
    .then(result => {
      res.json({ message: "Edited successfully!" });
    })
    .catch(err => {
      console.log(err);
    });
}
exports.updatePhoto = (req, res) => {
  let rb = rp = req.params, rf = req.files;
  let file = rf.file;
  let filename = file.md5 + file.name;
  file.mv(`${uploadpath}${filename}`, (err) => {
    if (err) {
      res.json({ message: "Upload failed!" });
    } else {
      userSchema.findByIdAndUpdate(rp.id, { $set: { photo: filename } })
        .then(result => {
          res.json({ message: "Upload success!" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}
exports.deleteUser = (req, res) => {
  let rp = req.params;
  userSchema.findByIdAndDelete(rp.id)
    .then(result => {
      res.json({ message: "Deleted successfully!" });
    })
    .catch(error => {
      console.log(error);
    });
}
exports.Login = (req, res) => {
  let rb = req.body;
  userSchema.findOne({ email: rb.email })
    .then(user => {
      if (user) {
        const maxAge = 60000;
        if (rb.password === user.password) {
          let token = jwt.sign({ id: user._id, email: user.email }, 'verySecretValue', { expiresIn: 60000 })
          res.cookie("jwt", token, {
            httpOnly: true,
            token: token,
            maxAge: maxAge
          });
          res.json({ message: "Login successful!", id: user._id, token });
        } else {
          res.json({ message: "Password does not match!", user });
        }
      } else {
        res.json({ message: "User not found!" });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
