import React from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Image,
  Input,
} from "@chakra-ui/react";
import { MdInsertPhoto } from "react-icons/md";

function TalkBox() {
  return (
    <Flex backg>
      <Image
        src={"/profile-pict.png"}
        borderRadius={"full"}
        boxSize="50px"
        objectFit={"cover"}
      />
      <Flex direction={"row"}>
        <form>
          <Input
            type={"text"}
            marginLeft={"5px"}
            // style={{ width: "356%" }}
            w={"353%"}
            placeholder="What's on your mind?"
            variant={"ghost"}
          />
          <Flex marginLeft={"5px"} w={"353%"} alignItems={"center"}>
            <Flex mt={"3"}>
              <MdInsertPhoto />
              <MdInsertPhoto />
              <MdInsertPhoto />
              <MdInsertPhoto />
            </Flex>
            <Spacer />
            <Button px={"5"} py={"2"} rounded={"full"}>
              Talk to us
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

export default TalkBox;
