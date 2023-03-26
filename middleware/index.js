const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET


const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}

const comparePassword = async (storedPassword, password) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword)
  return passwordMatch
}

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      let payload = jwt.verify(token, APP_SECRET);
      if (payload) {
        res.locals.token = token;
        return next();
      }
      res.status(401).send({ status: 'Error', msg: 'Unauthorized' });
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: 'Error', msg: 'Verify Token Error!' });
    }
  } else {
    res.status(401).send({ status: 'Error', msg: 'No token provided' });
  }
};

const stripToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
      return
    }
    const token = authHeader.split(' ')[1]
    if (token) {
      res.locals.token = token
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'Strip Token Error!' })
  }
}

module.exports = {
  stripToken,
  verifyToken,
  createToken,
  comparePassword,
  hashPassword
}