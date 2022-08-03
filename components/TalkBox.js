
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
import { MdOutlineClose } from "react-icons/md";
import { my_api } from "../constraint"
import { useState } from "react";
import { getSession } from "next-auth/react";
import axiosInstance from "../services/axios";

function TalkBox(props) {
  const [imageSource, setImageSource] = useState(
    my_api + props.user.profilePicture
  );
const [caption, setCaption] = useState("");
const [imagePost, setImagePost] = useState();

const postHandler = async () => {
  const session = await getSession();
  const { accessToken } = session.user;
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const newPost = {
    caption,
  };
  if (imagePost) {
    const body = new FormData();
    const fileName = Date.now() + imagePost.name;
    body.append("name", fileName);
    body.append("imagePost", imagePost);
    body.append("caption", caption);
    body.append("imagePostPath", `/public/post/${fileName}`);
    try {
      await axiosInstance.post("/posts/uploadImage", body, config);
      setCaption("");
      setImagePost();
      window.location.reload();
    } catch (error) {
      return alert(error.response.data?.message);
    }
};
}
  return (
    <Box
      // backgroundColor={"red.300"}
      w={"1000px"}
      // border={"2px"}
    >
      <Flex marginLeft={"260px"} fontWeight={"bold"} fontSize={"lg"}>
          Home
      </Flex>
      <Flex
      marginLeft={"200px"}
        // backgroundColor={"yellow.600"}
        w={"600px"}
        // h={"500px"}
        justifyContent="center"
      >
      <Image
        src={imageSource}
        borderRadius={"full"}
        boxSize="50px"
        objectFit={"cover"}
      />
        <form>
          <Input
            type={"text"}
            marginLeft={"5px"}
            placeholder="What's on your mind?"
            variant={"ghost"}
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
          {imagePost && (
            <Flex flexDirection="column">
              <MdOutlineClose onClick={() => setImagePost()} />
              <Image src={URL.createObjectURL(imagePost)} />
            </Flex>
          )}
          <Flex marginLeft={"5px"} alignItems={"center"}>
            <label
              htmlFor="imagePost"
              style={{
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "10px",
                marginTop: "5px",
              }}
            >
              <MdInsertPhoto />
              <Input
                htmlFor={"imagepost"}
                style={{ display: "none" }}
                type="file"
                objectFit={"fill"}
                id="imagePost"
                onChange={(event) => setImagePost(event.target.files[0])}
              />
            </label>
            <Button
              // px={"5"}
              // py={"2"}
              bgColor={"red.200"}
              marginLeft={"300px"}
              rounded={"full"}
              onClick={postHandler}
            >
              Talk to us
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
}

export default TalkBox