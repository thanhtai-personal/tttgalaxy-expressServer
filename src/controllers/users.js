var express = require('express');
var router = express.Router();

const userService = require('./../services/user.service')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', async function(req, res, next) {
  let resultData = await userService.login(req.body)
  return res.json(resultData)
});

router.post('/register', async function (req, res) {
  let resultData = await userService.addOrUpdate(req.body)
  return res.json(resultData)
})

router.get('/portfolio-data', async function (req, res) {
  let decodedTokenData = jwt.verify(authorization, req.headers['x-access-token']);
  console.log('req', req)
  let dataReq = {
    email: decodedTokenData.email,
    id: decodedTokenData.id
  }
  console.log('decodedTokenData', decodedTokenData)
  let resultData = await userService.getUserData(dataReq)
  return res.json(resultData)
})

module.exports = router;
