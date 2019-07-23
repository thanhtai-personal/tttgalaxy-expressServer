var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const { models, sequelize } = require('./../src/models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test-get', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function(req, res, next) {
  let data = req.body;
    let user = await findUserByEmail(data.email);
    if (user) {
      if (user.password === data.password) {
        let token = jwt.sign({
          email: user.email,
        }, secret, { expiresIn : 60*60*24 });
        res.json({
          message: 'Login success!',
          token: token
        })
      } else {
        res.json({
          message: 'wrong username or password!'
        })
      }
    } else {
      res.json({
        message: 'wrong username or password!'
      })
    }
});

router.post('/register', async function (req, res) {
  let data = req.body;
  let user = await findUserByEmail(data.email);
  if (!user) {
    let user = await models.User.createUser(data)
    res.json({
      message: 'created user',
      data: user
    })
  } else {
    res.json({
      message: 'user is existed'
    })
  }
})



async function findUserByEmail (email) {
  return await models.User.findByLogin(email)
}

module.exports = router;
