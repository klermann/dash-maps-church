const bcrypt = require('bcrypt');

class PasswordUtil {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async comparePasswords(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = PasswordUtil;
