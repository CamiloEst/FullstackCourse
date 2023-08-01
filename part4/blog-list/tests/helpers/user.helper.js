const User = require('../../models/user.schema')
const p = require('../../utils/password.util')

const newUser = {
  username: 'newuser',
  name: 'new user',
  password: 'test',
}
const existingUser = {
  username: 'milksea',
  name: 'milk sea',
  password: 'test',
}

const shortUsername = {
  username: 'mi',
  name: 'milk sea',
  password: 'test',
}

const shortPassword = {
  username: 'milksea',
  name: 'milk sea',
  password: 'te',
}

const initialUsers = [
  {
    username: 'test',
    name: 'test',
    blogs: ['5a422a851b54a676234d17f7'],
    _id: '64c6c472d303a620db86e597'
  },
  {
    username: 'milksea',
    name: 'milk sea',
    blogs: ['5a422aa71b54a676234d17f8', '5a422a851b54a676234d17f7'],
  },
  {
    username: 'oboerye',
    name: 'oboe rye',
    blogs: ['5a422ba71b54a676234d17fb'],
  },
  {
    username: 'vulture',
    name: 'vulture',
    blogs: ['5a422bc61b54a676234d17fc', '5a422b3a1b54a676234d17f9'],
  },
  {
    username: 'puppisa',
    name: 'puppi sa',
    blogs: [
      '5a422b891b54a676234d17fa',
      '64c6c995e25f498dd16a876c',
      '64c6cae9933cf89d6ca9856f',
    ],
  },
  {
    username: 'jupiter',
    name: 'jupiter',
    blogs: [],
  },
]

const userToLogin = {
  username: 'jupiter',
  password: 'test',

}

const incompleteUser = {
}

const userToLoginWithIncorrectUserName = {
  username: 'incorrect',
  password: 'test',
}

const userToLoginWithIncorrectPassword = {
  username: 'jupiter',
  password: 'incorrect',
}

const fillPassword = async () => {
  for (const u of initialUsers) {
    u.passwordHash = await p.encryptPassword('test')
  }
}

const nonExistingId = async () => {
  const user = new User({ title: 'willremovethissoon' })
  await user.save()
  await user.deleteOne()
  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  nonExistingId,
  usersInDb,
  initialUsers,
  newUser,
  existingUser,
  shortUsername,
  shortPassword,
  fillPassword,
  userToLogin,
  userToLoginWithIncorrectPassword,
  userToLoginWithIncorrectUserName,
  incompleteUser
}
