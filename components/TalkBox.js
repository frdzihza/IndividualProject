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

function TalkBox() {
  return (
    <Flex>
      <Image
        src={"/profile-pict.png"}
        borderRadius={"full"}
        boxSize="50px"
        objectFit={"cover"}
      />
      <Flex direction={"column"}>
        <form>
          <Input
            type={"text"}
            marginLeft={"1"}
            style={{ width: "356%" }}
            placeholder="What's on your mind?"
            variant={"ghost"}
          />
          <Button display={"flex"} justifyContent={"right"}>
            Talk to us
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default TalkBox;
