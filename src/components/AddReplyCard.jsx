import {
  Avatar,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VotesBtn from "./VotesBtn";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";

const AddReplyCard = (props) => {
  const [addReplyInput, setAddReplyInput] = useState("");
  const { setIsReply, isReply, commentData, currentUser, data, setData } =
    props;

  const handleReplyInputChange = (event) => {
    setAddReplyInput(event.target.value);
  };

  const handleReplyButton = () => {
    setAddReplyInput("");
    let allComments = [...data.comments];

    allComments = allComments.map((ele) => {
      if (ele.id === commentData?.id) {
        return {
          ...ele,
          replies: [
            ...ele.replies,
            {
              id: Date.now(),
              createdAt: new Date(),
              score: 0,
              replies: [],
              content: addReplyInput,
              user: currentUser,
            },
          ],
        };
      } else {
        ele.replies = ele.replies.map((e) => {
          if (e.id === commentData.id) {
            return {
              ...e,
              replies: [
                ...e.replies,
                {
                  id: Date.now(),
                  createdAt: new Date(),
                  score: 0,
                  replies: [],
                  content: addReplyInput,
                  user: currentUser,
                },
              ],
            };
          } else {
            return e;
          }
        });
        return ele;
      }
    });

    setData({ ...data, comments: allComments });
    setIsReply(false);
  };
  return (
    isReply && (
      <Card
        style={{
          backgroundColor: "white",
          width: "90%",
          padding: "20px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={1}>
            <Avatar alt="ANNNN" src="src/assets/avatars/image-juliusomo.png" />
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="outlined-multiline-static"
              multiline
              fullWidth
              rows={3}
              value={addReplyInput}
              onChange={handleReplyInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              size="large"
              disabled={!addReplyInput}
              style={{ backgroundColor: addReplyInput ? "#5457b6" : "" }}
              onClick={handleReplyButton}
            >
              <Typography fontWeight={"bold"}>Reply</Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
    )
  );
};
export default AddReplyCard;
