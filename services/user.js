// services/user-service.js

const User = require('../schemas/user.js');

class UserService {
  static async createUser(userData) {
    return await User.create(userData);
  }

  static async getAllUsers() {
    return await User.find();
  }

  static async getUserById(userId) {
    return await User.findById(userId).populate('profile');
  }

  static async updateUser(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  }

  static async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

  static async createProfile(userId, profileData) {
    const user = await User.findById(userId);
    user.profile = profileData;
    await user.save();
    return user.populate('profile').execPopulate();
  }

  // 다른 유저 관련 서비스 메소드들 추가 가능
}

module.exports = UserService;
