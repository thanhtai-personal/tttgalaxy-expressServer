var express = require('express');
var router = express.Router();

const secret = "tttgalaxy-secret-key"

const jwt = require('jsonwebtoken')

const moment = require('moment')

const blogService = require('./../services/blog.service')


router.get('/get-blogs', async function (req, res) {
  let decodedTokenData = jwt.verify(req.headers['x-access-token'], secret);
  let resultData = await blogService.getBlogs(decodedTokenData.id)
  return res.json(resultData)
})

router.get('/get-blog', async function (req, res) {
  let resultData = await blogService.getBlog(req.id)
  return res.json(resultData)
})

router.post('/submit-blog', async function (req, res) {
  let decodedTokenData = jwt.verify(req.headers['x-access-token'], secret);
  let dataReq = {
    ...req.body,
    authorId: decodedTokenData.id
  }
  let resultData = await blogService.createOrUpdateBlog(dataReq)
  return res.json(resultData)
})

module.exports = router;
