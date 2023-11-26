// service/teampost.js

const TeamPost = require('../schemas/teampost.js');

class TeamPostService {
  // 특정 ID의 게시판을 가져오기 위한 GET 로직
  static async getTeamPostById(teamPostId) {
    return TeamPost.findById(teamPostId);
  }

  // 모든 게시판을 가져오기 위한 GET 로직
  static async getAllTeamPosts() {
    return TeamPost.find();
  }

  // 새로운 게시판을 삽입하기 위한 POST 로직
  static async insertTeamPost(newTeamPostData) {
    return TeamPost.create(newTeamPostData);
  }

  // 특정 ID의 게시판을 업데이트하기 위한 PATCH 로직
  static async updateTeamPost(teamPostId, updatedData) {
    return TeamPost.findByIdAndUpdate(teamPostId, updatedData, { new: true });
  }

  // 특정 ID의 게시판을 삭제하기 위한 DELETE 로직
  static async deleteTeamPost(teamPostId) {
    return TeamPost.findByIdAndDelete(teamPostId);
  }

  // 특정 ID의 게시판에 대한 댓글을 가져오기 위한 GET 로직
  static async getCommentsForTeamPost(teamPostId) {
    const teamPost = await TeamPost.findById(teamPostId);
    return teamPost.comments;
  }

  // 특정 ID의 게시판에 대한 댓글을 삽입하기 위한 POST 로직
  static async insertCommentForTeamPost(teamPostId, newCommentData) {
    const teamPost = await TeamPost.findById(teamPostId);
    teamPost.comments.push(newCommentData);
    await teamPost.save();
    return teamPost.comments;
  }

  // 특정 ID의 게시판에 대한 댓글을 업데이트하기 위한 PATCH 로직
  static async updateCommentForTeamPost(teamPostId, commentId, updatedData) {
    const teamPost = await TeamPost.findById(teamPostId);
    const comment = teamPost.comments.id(commentId);
    comment.set(updatedData);
    await teamPost.save();
    return teamPost.comments;
  }

  // 특정 ID의 게시판에 대한 댓글을 삭제하기 위한 DELETE 로직
  static async deleteCommentForTeamPost(teamPostId, commentId) {
    const teamPost = await TeamPost.findById(teamPostId);
    teamPost.comments.id(commentId).remove();
    await teamPost.save();
    return teamPost.comments;
  }
}

module.exports = TeamPostService;
