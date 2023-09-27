const express = require('express'),
    jwt = require('jsonwebtoken');
const controller = require('../controllers/controllers');
const router = express.Router();

router.get('/user/:id/notes', controller.Notes);
router.post('/note', controller.newNote);
router.get('/note/:id', controller.getNote);
router.put('/note/:id', controller.editNote);
router.put('/note/:id/background', controller.changeBackground);
router.delete('/note/:id', controller.deleteNote);
router.get('/note/user/:uid/search/:keyword', controller.SearchNote);
router.get('/notes', controller.NotesCollection);

router.get('/user', controller.Users);
router.post('/user', controller.Signup);
router.get('/user/:id', controller.getUser);
router.put('/user/:id', controller.editUser);
router.put('/user/:id/photo', controller.updatePhoto);
router.delete('/user/:id', controller.deleteUser);

router.post('/login', controller.Login);
//router.post('/auth', controller.Auth);

module.exports = router;