// controllers/user-controller.js

const UserService = require('../services/user.js');

class UserController {
  static async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      return res.json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating user' });
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching users' });
    }
  }
  
  static async getUserById(req, res, next) {
    const userId = req.params.userId;
    try {
      const user = await UserService.getUserById(userId);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching user' });
    }
  }

  static async updateUser(req, res, next) {
    const userId = req.params.userId;
    const userData = req.body;
    try {
      const updatedUser = await UserService.updateUser(userId, userData);
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating user' });
    }
  }

  static async deleteUser(req, res, next) {
    const userId = req.params.userId;
    try {
      const deletedUser = await UserService.deleteUser(userId);
      return res.json(deletedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting user' });
    }
  }

  static async createProfile(req, res, next) {
    const userId = req.params.userId;
    const profileData = req.body;
    try {
      const userWithProfile = await UserService.createProfile(userId, profileData);
      return res.json(userWithProfile);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating profile' });
    }
  }

  // 다른 유저 관련 컨트롤러 메소드들 추가 가능
}

module.exports = UserController;
