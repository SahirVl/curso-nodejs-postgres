const jwt = require('jsonwebtoken')

const secret = '#myStore' // debe ir en una variable de entorno, es secreta.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4MzUwMTQ1M30.2zm7vP7-Pgwi60kK4nZF0I7N7FMBWO7xYb3wB65sDAI'


function verifyToken(token, secret) {
  return jwt.verify(token,secret)
}

const payload = verifyToken(token,secret)

console.log(payload)

