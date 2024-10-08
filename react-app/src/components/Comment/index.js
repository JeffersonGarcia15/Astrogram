import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} from "../../store/comment";
import { getAllPosts } from "../../store/post";
import {
  getAllCommentLikes,
  createCommentLike,
  deleteACommentLike,
  unloadCommentLikes,
} from "../../store/commentlike";
import { Modal } from "../../context/Modal";
import SendIcon from "@material-ui/icons/Send";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "./Comment.css";

function Comments({ post_id }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [newErrors, setNewErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.comments);
  const commentLikes = useSelector((state) => state.commentLikes);
  const [comment_id, setCommentId] = useState(0);
  const [body, setBody] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentBody, setCommentBody] = useState();
  const [showForm, setShowForm] = useState("");
  const [formId, setFormId] = useState(null);
  const [setCommentLike] = useState(false);
  const likesInCommentFunction = Object.values(commentLikes)?.filter(
    (like) => like?.comment_id === comment_id
  ); // in this case this has comment_id and user_id
  const isCommentLikedFunction = likesInCommentFunction?.some(
    (like) => like.user_id === user.id
  );
  const [deleteSwitch, setDeleteSwitch] = useState(false);

  useEffect(() => {
    dispatch(getAllComments());
    dispatch(getAllCommentLikes());
    dispatch(getAllPosts());
    return () => dispatch(unloadCommentLikes);
  }, [dispatch, deleteSwitch, isCommentLikedFunction, setCommentLike]);

  // useEffect(() => {
  // }, [dispatch])

  const userComment = async (e) => {
    setErrors([]);
    let validatorErrors = [];

    if (!newComment.length) {
      validatorErrors.push("Please provide a valid comment");
    }

    e.preventDefault();
    if (!validatorErrors.length) {
      await dispatch(
        createComment({
          user_id: user.id,
          post_id: post_id,
          body: newComment,
        })
      );
      setNewComment("");
    } else {
      setErrors(validatorErrors);
    }
  };

  const editAComment = async (e) => {
    setNewErrors([]);
    let validatorErrors = [];

    if (!commentBody.length) {
      validatorErrors.push("Please provide a valid edited comment");
    }

    e.preventDefault();
    if (!validatorErrors.length) {
      await dispatch(updateComment(user.id, post_id, commentBody, formId));
      setShowForm(false);
    } else {
      setNewErrors(validatorErrors);
    }
  };

  const deleteAComment = async (comment_id) => {
    let alert = window.confirm("Are you sure you want to delete your comment?");
    if (alert) {
      await dispatch(deleteComment(comment_id));
      setDeleteSwitch((prev) => !prev);
    }
  };

  const openForm = (comment) => {
    setShowForm(true);
    setCommentBody(comment.body);
    setFormId(comment.id);
  };

  const handleCommentLike = (comment) => async (e) => {
    const likesInComment = Object.values(commentLikes)?.filter(
      (like) => like?.comment_id === comment.id
    ); // in this case this has comment_id and user_id
    const isCommentLiked = likesInComment?.some(
      (like) => like.user_id === user.id
    );
    setCommentId(comment?.id);
    if (isCommentLiked) {
      let singleCommentLike = likesInComment.find(
        (like) => like.user_id === user.id && like.comment_id === comment.id
      );

      await dispatch(deleteACommentLike(singleCommentLike?.id));
      setDeleteSwitch((prev) => !prev);
      // window.location.reload(true)
    } else {
      await dispatch(
        createCommentLike({ user_id: user.id, comment_id: comment?.id })
      );
      // window.location.reload(true)
    }
  };

  function heartColor(commentId) {
    const likesInComment = Object.values(commentLikes)?.filter(
      (like) => like?.comment_id === commentId
    ); // in this case this has comment_id and user_id
    const isCommentLiked = likesInComment?.some(
      (like) => like.user_id === user.id
    );

    return isCommentLiked;
  }

  return (
    <div>
      {Object.values(comments)?.map((comment) => (
        <div key={comment.id}>
          {post_id === comment.post_id && (
            <div key={comment.id}>
              <div className="comment-like">
                <div>
                  <a className="username" href={`/users/${comment?.username}`}>
                    {comment.username}
                  </a>
                  <p className="comment">{comment.body}</p>
                </div>
                <div className="comment-heart">
                  <div>
                    {user.id === comment.user_id && (
                      <MoreHorizIcon onClick={() => openForm(comment)} />
                    )}
                    <FavoriteIcon
                      onClick={handleCommentLike(comment)}
                      style={{ color: heartColor(comment.id) ? "red" : "gray" }}
                    ></FavoriteIcon>
                    {showForm && formId === comment.id && (
                      <Modal onClose={() => setShowForm(false)}>
                        <div className="comment__modal">
                          <h4 className="comment__modal__h4">
                            Edit your comment
                          </h4>
                          <input
                            type="text"
                            className="comment__modal__input"
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                          />
                          <button
                            className="comment__modal__button comment__modal__button--delete"
                            onClick={() => deleteAComment(comment.id)}
                          >
                            Delete comment
                          </button>

                          <button
                            className="comment__modal__button"
                            onClick={editAComment}
                          >
                            Save changes
                          </button>
                        </div>
                      </Modal>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div></div>
        </div>
      ))}
      <hr />
      <form onSubmit={userComment}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="new-comment">
          <input
            placeholder="Add comment..."
            className="submit-comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            cols="30"
            rows="10"
          ></input>
          <button className="btn-comment-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Comments;
