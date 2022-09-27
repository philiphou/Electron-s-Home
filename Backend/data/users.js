import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync('admin',10),
    isAdmin: true,
  },
  {
    name: "Philip",
    email: "philip@example.com",
    password: bcrypt.hashSync('tly915',10),
    isAdmin: false
  },
  {
    name: "Jack",
    email: "jack@example.com",
    password: bcrypt.hashSync('buddy007',10),
    isAdmin: false
  },
];
export default users
