import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function DeleteComp(props) {
  const {
    commentData,
    currentUser,
    data,
    setData,
    isDeleteEnable,
    setIsDeleteEnable,
  } = props;
  const onDelete = () => {
    setIsDeleteEnable(false);

    let allComments = [...data.comments];
    allComments = allComments.filter((ele) => {
      if (ele.id === commentData.id) {
        return;
      } else {
        ele.replies = ele.replies.filter((ele) => {
          if (ele.id !== commentData.id) {
            return ele;
          } else {
            return;
          }
        });
        return ele;
      }
    });
    setData({ ...data, comments: allComments });
  };

  const onCancelDelete = () => {
    setIsDeleteEnable(false);
  };
  return (
    <Dialog
      open={isDeleteEnable}
      onClose={onCancelDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete comment</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#67727e" }}
          onClick={onCancelDelete}
        >
          <Typography fontWeight={"bold"}>No,Cancel</Typography>
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#ed6468" }}
          onClick={onDelete}
        >
          <Typography fontWeight={"bold"}>Delete</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteComp;
