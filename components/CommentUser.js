import moment from "moment";
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
import { my_api } from "../constraint";
import { useState } from "react";

function CommentUser(props) {
  const {comment} = props
  const {post} = props
  const [imageUser, setImageUser] = useState(
    my_api + props.comment.createdBy.profilePicture
  );
// console.log(comment)
  return (
    <Flex
      direction={"column"}
      mt="5px"
      _hover={{
        background: "#e8f5fe",
        borderRadius: "10px",
      }}
      // transitionDuration="500ms"
    >
      <Box padding="3">
        <Flex direction={"row"}>
          <Image
            src={imageUser}
            height="30px"
            width="30px"
            rounded={"full"}
            marginBottom={2}
          />
          <Text marginStart={2} fontWeight={"bold"}>{props.comment.createdBy.fullName}</Text>
          <Text marginStart={2}>@{props.comment.createdBy.username}</Text>
          <Text marginStart={3}>
            {moment(props.comment.createdAt).fromNow()}
          </Text>
        </Flex>
        <Text>{comment.comments}</Text>
      </Box>
    </Flex>
  );
}

export default CommentUser;