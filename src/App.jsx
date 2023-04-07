import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import AddComment from "./components/AddComment";

import EditDeleteReply from "./components/EditDeleteReply";

function App() {
  const [storedValue, setValue] = useLocalStorage("data", null);

  const handleData = (prevData, newData) => {
    if (prevData) {
      return prevData;
    } else {
      return newData;
    }
  };

  const getJsonData = () => {
    fetch("./data.json") //If your JSON file is hosted externally or located inside the public folder of the project, we can use the fetch() API to access it.
      .then((response) => response.json())
      .then((data) => setValue((prevState) => handleData(prevState, data)))
      .catch((err) => console.error(`An error occurred: ${err}`));
  };

  useEffect(() => {
    getJsonData();
  }, []);

  return (
    <Stack spacing={2} style={{ backgroundColor: "#f5f6fa" }} overflow>
      {console.log("storedValue", storedValue)}
      {storedValue &&
        storedValue.comments?.map((ele) => (
          <EditDeleteReply
            key={ele.id}
            currentUser={storedValue.currentUser}
            commentData={ele}
            data={storedValue}
            setData={setValue}
          />
        ))}
      <AddComment data={storedValue} setData={setValue} />
    </Stack>
  );
}

export default App;
