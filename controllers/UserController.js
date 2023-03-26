const {User, Story, Vote} = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { email, password, username } = req.body
    console.log(email)
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
    console.log(req.params.userid)
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

// const addVote = async (req,res) => {
//   const favorite = {meal_id} = req.body
//   const meal = await Meal.findByPk(meal_id)
// }

const getUserStories = async (req,res) => {
  const id = req.params.userid
  const meals = await Meal.findAll({
    where: { createdby: id },
    raw: true
  })
  res.send(meals)
}


module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession,
  getUser,
  getUserStories
}