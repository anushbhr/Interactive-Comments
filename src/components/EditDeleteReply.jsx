import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VotesBtn from "./VotesBtn";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AddReplyCard from "./AddReplyCard";
import DeleteComp from "./DeleteComp";
import EditIcon from "@mui/icons-material/Edit";

const EditDeleteReply = (props) => {
  const [editHover, setEditHover] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  const [replyHover, setReplyHover] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleteEnable, setIsDeleteEnable] = useState(false);

  const { currentUser, commentData, data, setData } = props;
  const [updatedInput, setUpdatedInput] = useState(commentData.content);

  const handleUpdatedInputChange = (event) => {
    setUpdatedInput(event.target.value);
  };

  const onUpdateComment = () => {
    setIsEditable(false);

    let allComments = [...data.comments];
    allComments = allComments.map((ele) => {
      if (ele.id === commentData.id) {
        return { ...ele, content: updatedInput };
      } else {
        ele.replies = ele.replies.map((ele) => {
          if (ele.id === commentData.id) {
            return { ...ele, content: updatedInput };
          } else {
            return ele;
          }
        });
        return ele;
      }
    });
    setData({ ...data, comments: allComments });
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: "white",
          width: "40%",
          padding: "25px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item>
            <VotesBtn commentData={commentData} data={data} setData={setData} />
          </Grid>
          <Grid item xs={10}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <Avatar
                    alt="ANNNN"
                    src="assets/avatars/image-amyrobson.png"
                  />
                </Grid>
                <Grid item>
                  <Typography fontWeight={"bold"}>
                    {commentData?.user?.username}
                  </Typography>
                </Grid>
                {currentUser.username === commentData?.user?.username && (
                  <Grid item>
                    <Box sx={{ borderRadius: "3px" }}>
                      <Typography
                        style={{
                          color: "#fff",
                          backgroundColor: "#5457b6",
                          fontWeight: "bold",
                          padding: "2px 8px",
                        }}
                      >
                        you
                      </Typography>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={6}>
                  <Typography style={{ color: "#717682" }}>
                    42 years ago
                  </Typography>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    {currentUser.username === commentData?.user?.username ? (
                      <>
                        <Button
                          style={{
                            color: deleteHover ? "#f28d90" : "#ed6368",
                            fontWeight: "bold",
                            backgroundColor: "transparent",
                          }}
                          onClick={() => setIsDeleteEnable(true)}
                          onMouseEnter={() => setDeleteHover(true)}
                          onMouseLeave={() => setDeleteHover(false)}
                          startIcon={
                            <DeleteIcon
                              style={{
                                color: deleteHover ? "#f28d90" : "#ed6368",
                              }}
                            />
                          }
                        >
                          Delete
                        </Button>
                        <Button
                          style={{
                            color: editHover ? "#a6a7d9" : "#5357b6",
                            fontWeight: "bold",
                            backgroundColor: "transparent",
                          }}
                          onClick={() => setIsEditable(true)}
                          onMouseEnter={() => setEditHover(true)}
                          onMouseLeave={() => setEditHover(false)}
                          startIcon={
                            <EditIcon
                              style={{
                                color: editHover ? "#a6a7d9" : "#5357b6",
                              }}
                            />
                          }
                        >
                          Edit
                        </Button>
                      </>
                    ) : (
                      <Button
                        style={{
                          color: replyHover ? "#a6a7d9" : "#5357b6",
                          fontWeight: "bold",
                          backgroundColor: "transparent",
                        }}
                        disabled={isReply}
                        onClick={() => setIsReply(true)}
                        onMouseEnter={() => setReplyHover(true)}
                        onMouseLeave={() => setReplyHover(false)}
                        startIcon={
                          <ReplyIcon
                            style={{
                              color: replyHover ? "#a6a7d9" : "#5357b6",
                            }}
                          />
                        }
                      >
                        Reply
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              {isEditable ? (
                <>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    rows={3}
                    value={updatedInput}
                    onChange={handleUpdatedInputChange}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: "#5457b6" }}
                    onClick={onUpdateComment}
                  >
                    <Typography fontWeight={"bold"}>Update</Typography>
                  </Button>
                </>
              ) : (
                <Typography color={"#67727e"}>{commentData.content}</Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <AddReplyCard
        commentData={commentData}
        currentUser={currentUser}
        data={data}
        setData={setData}
        isReply={isReply}
        setIsReply={setIsReply}
      />
      {commentData.replies?.map((ele) => (
        <EditDeleteReply
          key={ele.id}
          commentData={ele}
          currentUser={currentUser}
          data={data}
          setData={setData}
        />
      ))}
      {isDeleteEnable && (
        <DeleteComp
          commentData={commentData}
          currentUser={currentUser}
          data={data}
          setData={setData}
          setIsDeleteEnable={setIsDeleteEnable}
          isDeleteEnable={isDeleteEnable}
        />
      )}
    </>
  );
};
export default EditDeleteReply;
