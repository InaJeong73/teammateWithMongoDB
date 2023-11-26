// routes/teampost.js

const express = require('express');
const TeamPostController = require('../controllers/teampost.js'); // 경로 수정

const router = express.Router();

router.get('/:teamPostId', TeamPostController.getTeamPostById);
router.get('/', TeamPostController.getAllTeamPosts);
router.post('/', TeamPostController.insertTeamPost);
router.patch('/:teamPostId', TeamPostController.updateTeamPost);
router.delete('/:teamPostId', TeamPostController.deleteTeamPost);
router.get('/:teamPostId/comment', TeamPostController.getCommentsForTeamPost);
router.post('/:teamPostId/comment', TeamPostController.insertCommentForTeamPost);
router.patch('/:teamPostId/comment/:commentId', TeamPostController.updateCommentForTeamPost);
router.delete('/:teamPostId/comment/:commentId', TeamPostController.deleteCommentForTeamPost);

module.exports = router;
