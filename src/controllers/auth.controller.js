const createError = require('http-errors');
const express = require('express');
var router = express.Router();
const secret = "tttgalaxy-secret-key"
const jwt = require('jsonwebtoken')

const authService = require('./../services/auth.service')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', async function(req, res, next) {
  let resultData = await authService.login(req.body)
  return res.json(resultData)
});

router.post('/register', async function (req, res) {
  let resultData = await authService.register(req.body)
  return res.json(resultData)
})

router.get('/get-current-user', async function (req, res) {
  try {
    let decodedTokenData = jwt.verify(req.headers['x-access-token'], secret);
    return res.json(decodedTokenData)
  } catch (error) {
    return res.send({error: createError(401), data: error})
  }
})

module.exports = router;
