const Person = require('../models/person')

module.exports = async function(req, res, next) {
  if (!req.session.person) {
    return next()
  }
  
  req.person = await Person.findById(req.session.person._id)
  next()
}