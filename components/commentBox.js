import {
  Text,
  Flex,
  Textarea,
  Input,
  FormData,
  Button,
  Box,
  Image,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { getSession } from "next-auth/react";
import axiosInstance from "../services/axios";

function CommentBox(props) {
  const [commenting, setCommenting] = useState("");

  const onChangeHandler = (event) => {
    setCommenting(event.target.value);
  };
  // console.log(onInputHandler())

  const onCommentHandler = async () => {
    const session = await getSession();
    const { accessToken } = session.user;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const body = {
      comments: commenting,
      post_id: props.post_id,
      // createdBy: props.createdBy
    };
    try {
      await axiosInstance.post("/comments", body, config);
      // {props.getComments()};
      setCommenting("");
      window.location.reload();
    } catch (error) {}
  };
// console.log(props.getComments())

  return (
    <>
      <Textarea
        // maxLength={300}
        value={commenting}
        placeholder="Leave a comment"
        resize="none"
        size={"sm"}
        onChange={onChangeHandler}
      />
      <Flex justifyContent="space-between" mt="2">
        <Text fontSize={"medium"} fontStyle="italic" fontWeight={"semibold"}>
          Max Characters 300
        </Text>
        <Button variant="ghost" onClick={onCommentHandler}>
          Comment
        </Button>
      </Flex>
    </>
  );
}

export default CommentBox;
