import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Admin",
    email: "admin@gmail110.com",
    password: bcrypt.hashSync('admin',10),
    isAdmin: true,
  },
  {    name: "Philip",
    email: "philip@gmail.com",
    password: bcrypt.hashSync('tly915',10),
    isAdmin: false
  },
  {
    name: "Jack",
    email: "jack@gmail.com",
    password: bcrypt.hashSync('buddy007',10),
    isAdmin: false
  },
];
export default users
