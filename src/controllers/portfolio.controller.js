var express = require('express');
var router = express.Router();

const secret = "tttgalaxy-secret-key"

const jwt = require('jsonwebtoken')

const moment = require('moment')

const portfolioService = require('./../services/portfolio.service')


router.get('/portfolio-data', async function (req, res) {
  let decodedTokenData = jwt.verify(req.headers['x-access-token'], secret);
  let dataReq = {
    email: decodedTokenData.email,
    id: decodedTokenData.id
  }
  let resultData = await portfolioService.getPortfolioData(dataReq)
  return res.json(resultData)
})

router.post('/update-portfolio', async function (req, res) {
  dataReq = req.body
  if (dataReq.basicInfo.birthDate) {
    dataReq.basicInfo.birthDate = moment(dataReq.basicInfo.birthDate, 'MM/DD/YYYY')
  }
  console.log('dataReq.birthDate222', dataReq.basicInfo.birthDate)
  let resultData = await portfolioService.updatePortfolioData(dataReq)
  return res.json(resultData)
})

module.exports = router;
