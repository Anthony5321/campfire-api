const {User, Story, Vote} = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { email, password, username } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({ email, password:passwordDigest, username })
    res.send(user)
  } catch (error) {
    throw error
  } 
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: { email: email },
      raw: true
    })
    let matched = await middleware.comparePassword(
      user.password,
      password
    )
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user:payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Incorrect Password' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred on Login!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findByPk(req.params.user_id)
    let matched = await middleware.comparePassword(
      user.password,
      oldPassword
    )
    if (matched) {
      let password = await middleware.hashPassword(newPassword)
      await user.update({ password })
      let payload = {
        id: user.id,
        email: user.email
      }
      return res.send({ status: 'Password Updated!', user: payload })
    }
    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred updating password!' })
  }
}

const getUser = async (req , res) => {
  try {
  const user = await User.findByPk(req.params.userid)
  return res.send(user)
  }catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred updating password!' })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const getUserStories = async (req,res) => {
  try {
    const id = req.params.userid
    const stories = await Story.findAll({
      where: { authorId: id },
      raw: true
    })
    res.send(stories)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession,
  getUser,
  getUserStories
}