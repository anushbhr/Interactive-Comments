import { Box, IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";

const VotesBtn = (props) => {
  const { setData, data, commentData } = props;

  const [addHover, setAddHover] = useState(false);
  const [removeHover, setRemoveHover] = useState(false);

  const [score, setScore] = useState(commentData.score);

  const handleVotes = (btnType) => {
    if (btnType === "upVote") {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
  };

  useEffect(() => {
    let allComments = [...data.comments];
    allComments = allComments.map((ele) => {
      if (ele.id === commentData.id) {
        return { ...ele, score };
      } else {
        ele.replies = ele.replies.map((ele) => {
          if (ele.id === commentData.id) {
            return { ...ele, score };
          } else {
            return ele;
          }
        });
        return ele;
      }
    });
    setData({ ...data, comments: allComments });
  }, [score]);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={0}
      borderRadius={2}
      style={{ backgroundColor: "#f5f6fa" }}
    >
      <IconButton
        onClick={() => handleVotes("upVote")}
        disableRipple={true}
        onMouseEnter={() => setAddHover(true)}
        onMouseLeave={() => setAddHover(false)}
      >
        <AddIcon color={addHover ? "primary" : ""} />
      </IconButton>
      <Typography style={{ color: "#5357b6" }} fontWeight={"bold"}>
        {score}
      </Typography>
      <IconButton
        onClick={() => handleVotes("downVote")}
        disableRipple={true}
        onMouseEnter={() => setRemoveHover(true)}
        onMouseLeave={() => setRemoveHover(false)}
      >
        <RemoveIcon color={removeHover ? "primary" : ""} />
      </IconButton>
    </Stack>
  );
};
export default VotesBtn;
