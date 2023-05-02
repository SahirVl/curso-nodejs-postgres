const bcrypt = require('bcrypt')

async function passwordHash() {
  const password = '125egu5rSGSS*'
  const hash = await bcrypt.hash(password, 10)
  console.log(hash)
}

passwordHash()
