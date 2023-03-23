require('dotenv').config();
const authModel = require('../Models/auth.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
function refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = jwt.sign(
    { id: checkUser.name, email: checkUser.email },
    process.env.JWT_TOKEN_KEY,
    { expiresIn: '1h' }
  );
  return res
    .status(200)
    .send({ message: 'token generation successfull', token });
}
async function login(req, res) {
  const { name, email, password } = req.body;
  try {
    const checkUser = await authModel.findOne({ email: email });
    if (checkUser && (await argon2.verify(checkUser.password, password))) {
      // const token
      const token = jwt.sign(
        { id: checkUser.name, email: checkUser.email },
        process.env.JWT_TOKEN_KEY,
        { expiresIn: '1h' }
      );
      const refreshToken = jwt.sign(
        { id: checkUser.name, email: checkUser.email },
        process.env.REFRESH_JWT_TOKEN_KEY,
        { expiresIn: '24h' }
      );
      return res
        .status(200)
        .send({ message: 'Login Successfull', token, refreshToken });
    }
    return res.status(401).send({ message: 'User not Signed In' });
  } catch (er) {
    return res.status(404).send(er.message);
  }
}
async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const checkUser = await authModel.findOne({ email: email });
    if (checkUser) {
      return res.status(404).send({ message: 'User Already existed' });
    }
    const hash = await argon2.hash(password);
    await authModel.create({ name, email, password: hash });
    return res.status(200).send({ message: 'User created Successfully' });
  } catch (er) {
    return res.status(404).send(er.message);
  }
}
async function logout() {}

module.exports = { login, signup, refreshToken };
