import React from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import PropTypes, { object } from "prop-types";
import {
  ThumbUp,
  ThumbUpOutlined,
  ThumbDown,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { ROLE_AGENT, ROLE_REGULAR } from "../../../model/Role";
import Alert from "@material-ui/lab/Alert";
import TextInput from "../../common/TextInput";

function PostView({
  post,
  comments,
  commentText,
  baseUrl,
  open,
  role,
  show,
  reason,
  errors,
  onClose,
  onLike,
  onDislike,
  onDelete,
  onOpenReport,
  onReport,
  onChange,
  onAddComment,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={"body"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <img
          src={baseUrl + post.mediaId}
          alt={"Ups"}
          style={{ width: "100%" }}
        />
        {(role === ROLE_AGENT || role === ROLE_REGULAR) && (
          <p>
            {post.reaction !== null && post.reaction.reaction === "LIKE" ? (
              <Button onClick={() => onDelete()}>
                <ThumbUp color="primary" />
              </Button>
            ) : (
              <Button onClick={() => onLike()}>
                <ThumbUpOutlined color="primary" />
              </Button>
            )}
            {post.reaction !== null && post.reaction.reaction === "DISLIKE" ? (
              <Button onClick={() => onDelete()}>
                <ThumbDown color="primary" />
              </Button>
            ) : (
              <Button onClick={() => onDislike()}>
                <ThumbDownOutlined color="primary" />
              </Button>
            )}
          </p>
        )}
        <p>
          <b>{post.username}</b> {post.description}
        </p>
        {comments.map((c, index) => (
          <p key={index}>
            <b>{c.writerUsername}</b> {c.message} <br />{" "}
            <small>{c.date.substring(0, 10)}</small>
          </p>
        ))}
        {(role === ROLE_AGENT || role === ROLE_REGULAR) && (
          <form onSubmit={onAddComment} style={{ width: "100%", margin: 0 }}>
            {errors.onSubmitComment && (
              <Alert severity="error">{errors.onSubmitComment}</Alert>
            )}
            <TextInput
              name="comment"
              label="Comment"
              value={commentText}
              onChange={onChange}
            />
            <br />
            <br />
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className="field"
            >
              Add comment
            </Button>
          </form>
        )}
        <br />
        {(role === ROLE_AGENT || role === ROLE_REGULAR) && !show && (
          <Button
            onClick={() => onOpenReport()}
            style={{ width: "100%" }}
            color="primary"
            variant="outlined"
          >
            Report unappropriated content
          </Button>
        )}
        {show && (
          <form onSubmit={onReport} style={{ width: "100%", margin: 0 }}>
            <h4>Report unappropriated content</h4>
            {errors.onSubmit && (
              <Alert severity="error">{errors.onSubmit}</Alert>
            )}
            <TextInput
              name="reason"
              label="Reason"
              value={reason}
              onChange={onChange}
              error={errors.reason}
            />
            <br />
            <br />
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className="field"
            >
              Report
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

PostView.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(object).isRequired,
  commentText: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  reason: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenReport: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default PostView;
