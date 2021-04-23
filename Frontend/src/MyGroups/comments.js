import React, { useState } from "react";
import axios from "axios";
import backendServer from "../webConfig";
import { getExpense } from "../actions/showGroupAction";
import { connect } from "react-redux";
import alert from "sweetalert";

const Comments = (props) => {
  const [commentText, setCommentText] = useState();

  const onSubmitComment = (e) => {
    e.preventDefault();
    console.log("props.expComments: ", props.expComment);
    const commentData = {
      message: commentText,
      expId: props.expId,
      userId: localStorage.getItem("user_id"),
      username: localStorage.getItem("name"),
    };

    console.log("commentData is", commentData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/comment/add`, commentData)
      .then((response) => {
        console.log("response after post", response);
        if (response.status === 200) {
          alert("Comment added sucessfully!", { icon: "success" });
        }
      })
      .catch((error) => {
        alert("Failed to add comment");
        console.log("error:", error);
      });
  };

  const handleDeleteComment = (commentId, commentor) => {
    const currentUser = localStorage.getItem("name");

    if (currentUser !== commentor) {
      alert(
        "Error",
        "You do no have permission to delete this comment",
        "error"
      );
    } else {
      alert({
        title: "Are you sure to delete this comment?",

        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          console.log("expId", props.expId);
          axios
            .post(`${backendServer}/comment/delete`, {
              expId: props.expId,
              delcommentId: commentId,
            })
            .then((response) => {
              console.log("response after post", response);
              if (response.status === 200) {
                alert("Comment deleted sucessfully!", { icon: "success" });
              }
            })
            .catch((error) => {
              alert("Failed to delete comment");
              console.log("error:", error);
            });
        }
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div style={{ float: "left" }}>
        {" "}
        <span>Expense Comments :</span>
      </div>
      <br />
      <form onSubmit={onSubmitComment}>
        <div className="container ">
          <div className="row align-items-right justify-content-center">
            <div className="col">
              <textarea
                name="commentText"
                id="commentText"
                col="60"
                row="10"
                style={{
                  overflow: "auto",
                  lineHeight: "1",
                  padding: "4px",
                  height: "60px",
                  width: "300px",
                }}
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="col">
              <button className="btn btn-primary" type="submit">
                Post
              </button>
            </div>
          </div>
        </div>
      </form>

      <div
        className="comments"
        style={{
          padding: "7px",
        }}
      >
        {props.expComment && props.expComment.length > 0 ? (
          <div>
            {props.expComment.map((comment) => {
              return (
                <div
                  className="container comment align-items-center"
                  key={comment._id}
                  style={{
                    border: "1px solid #eee",
                    height: "min-content",
                    margin: "10px",
                    background: "white",
                    borderRadius: "0px",
                  }}
                >
                  <div className="row align-items-center">
                    <div
                      className="col-sm-4"
                      style={{
                        fontSize: "13px",
                        float: "left",
                      }}
                    >
                      Added by{" "}
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {comment.username}
                      </span>{" "}
                      on {comment.msgCreatedAt.split("T")[0]}
                    </div>
                    <div
                      className="col-sm-6"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        lineHeight: "normal",
                      }}
                    >
                      {comment.message}
                    </div>
                    <div
                      className="col-sm-2"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        lineHeight: "normal",
                      }}
                    >
                      <button
                        className="btn"
                        onClick={() =>
                          handleDeleteComment(comment._id, comment.username)
                        }
                        style={{ color: "red" }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};
//export default Comments;

export default connect(null, { getExpense })(Comments);
