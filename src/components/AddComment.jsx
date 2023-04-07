import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

function AddComment(props) {
  const [addCommentInput, setAddCommentInput] = useState("");
  const { data, setData } = props;

  const handleInputChange = (event) => {
    setAddCommentInput(event.target.value);
  };

  const onAddComment = () => {
    setAddCommentInput("");
    let allComments = [...data.comments];
    allComments.push({
      id: Date.now(),
      createdAt: new Date(),
      score: 0,
      replies: [],
      content: addCommentInput,
      user: data.currentUser,
    });
    setData({ ...data, comments: allComments });
  };

  return (
    <Card
      style={{
        backgroundColor: "white",
        width: "40%",
        padding: "25px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Avatar alt="ANNNN" src="src/assets/avatars/image-juliusomo.png" />
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="outlined-multiline-static"
            placeholder="Add comment..."
            multiline
            fullWidth
            rows={3}
            value={addCommentInput}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#5457b6" }}
            onClick={onAddComment}
          >
            <Typography fontWeight={"bold"}>SEND</Typography>
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AddComment;
