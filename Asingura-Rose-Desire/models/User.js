// User model schema
class User {
  constructor(email, phone, password) {
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.createdAt = new Date();
  }
}

module.exports = User;