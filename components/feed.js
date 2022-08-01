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
import Content from "./content";
import TalkBox from "./TalkBox";

function Feed(props) {
  return (
    <Box  w={"80%"}>
      <Flex borderStart={"2px"}>
        <Flex fontWeight={"bold"} fontSize={"lg"} direction={"column"}>
          Home
          <Flex marginTop={"3"}>
            <TalkBox user={props.user} />
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Content />
      </Flex>
    </Box>
  );
}

export default Feed;
