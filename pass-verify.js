const bcrypt = require('bcrypt')

async function verifyPass() {
  const password = '125egu5rSGSS*'
  const hash = '$2b$10$VO1Vr/Gcq68guflkA3FXze195N..tZhFZmbsoY/JWdXeL/0pcIPOS'
  const isMatch = await bcrypt.compare(password, hash)

  isMatch ? console.log('SON COMPATIBLES') : console.log('NO SON IGUALES')

}

verifyPass()
