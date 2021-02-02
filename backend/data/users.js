import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password', 10),
        isAdmin: true
    },
    {
        name: 'Mack',
        email: 'mack@example.com',
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Jack',
        email: 'jack@example.com',
        password: bcrypt.hashSync('password', 10)
    },

]

export default users