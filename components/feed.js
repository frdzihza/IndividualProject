import {
  Text,
  Flex,
  Textarea,
  Input,
  FormData,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import TalkBox from "./TalkBox";

function Feed() {
  return (
    <Flex flexGrow={"0.5"} boxShadow="outline">
      <Flex fontWeight={"bold"} fontSize={"lg"} direction={"column"}>
        Home
        <Flex marginTop={"3"}>
          <TalkBox />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Feed;
