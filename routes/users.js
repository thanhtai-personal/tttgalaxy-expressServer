var express = require('express');
var router = express.Router();

const userService = require('./../src/services/user.service')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test-get', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function(req, res, next) {
  let resultData = await userService.login(req.body)
  return res.json(resultData)
});

router.post('/register', async function (req, res) {
  console.log('user service', userService)
  console.log('user service aou', userService.addOrUpdate)
  let resultData = await userService.addOrUpdate(req.body)
  return res.json(resultData)
})

module.exports = router;
