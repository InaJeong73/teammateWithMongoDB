// controllers/teampost.js

const TeamPostService = require('../services/teampost.js');

exports.getTeamPostById = async (req, res, next) => {
  const { teamPostId } = req.params;
  try {
    const teamPost = await TeamPostService.getTeamPostById(teamPostId);
    return res.json(teamPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAllTeamPosts = async (req, res, next) => {
  try {
    const teamPosts = await TeamPostService.getAllTeamPosts();
    return res.json(teamPosts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.insertTeamPost = async (req, res, next) => {
  const newTeamPostData = req.body;
  try {
    const insertedTeamPost = await TeamPostService.insertTeamPost(newTeamPostData);
    return res.json(insertedTeamPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateTeamPost = async (req, res, next) => {
  const { teamPostId } = req.params;
  const updatedData = req.body;
  try {
    const updatedTeamPost = await TeamPostService.updateTeamPost(teamPostId, updatedData);
    return res.json(updatedTeamPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteTeamPost = async (req, res, next) => {
  const { teamPostId } = req.params;
  try {
    const result = await TeamPostService.deleteTeamPost(teamPostId);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCommentsForTeamPost = async (req, res, next) => {
  const { teamPostId } = req.params;
  try {
    const comments = await TeamPostService.getCommentsForTeamPost(teamPostId);
    return res.json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.insertCommentForTeamPost = async (req, res, next) => {
  const { teamPostId } = req.params;
  const newCommentData = req.body;
  try {
    const comments = await TeamPostService.insertCommentForTeamPost(teamPostId, newCommentData);
    return res.json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateCommentForTeamPost = async (req, res, next) => {
  const { teamPostId, commentId } = req.params;
  const updatedData = req.body;
  try {
    const comments = await TeamPostService.updateCommentForTeamPost(teamPostId, commentId, updatedData);
    return res.json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteCommentForTeamPost = async (req, res, next) => {
  const { teamPostId, commentId } = req.params;
  try {
    const comments = await TeamPostService.deleteCommentForTeamPost(teamPostId, commentId);
    return res.json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

