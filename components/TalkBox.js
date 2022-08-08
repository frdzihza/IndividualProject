
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
} else {
  try {
    await axiosInstance.post("/posts", newPost, config);
    window.location.reload();
    setCaption("");
    // alert("Success Create a Post");
  } catch (error) {
    
  }
};
}
  return (
    <>
      {!props.user.isVerified ? (
        <Box w={"625px"} marginInlineStart={"13%"}>
          <Flex marginLeft={"18px"} fontWeight={"bold"} fontSize={"lg"}>
            Home
          </Flex>
          <Flex w={"625px"} justifyContent="center">
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
              <Flex marginLeft={"5px"}>
                <label
                  htmlFor="imagePost"
                  style={{
                    cursor: "pointer",
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
                  px={"5"}
                  py={"2"}
                  _hover={{
                    background: "#1DA1F2",
                  }}
                  marginInlineStart={"400px"}
                  rounded={"full"}
                  onClick={postHandler}
                  isDisabled={true}
                >
                  Talk to us
                </Button>
              </Flex>
            </form>
          </Flex>
        </Box>
      ) : (
        <Box
          // backgroundColor={"red.300"}
          w={"625px"}
          // marginLeft={"100px"}
          // marginInlineEnd={"31%"}
          marginInlineStart={"13%"}
          // borderWidth="1px"
          // borderRadius="lg"
          // overflow="hidden"
          // border={"2px"}
        >
          <Flex fontWeight={"bold"} fontSize={"lg"}>
            Home
          </Flex>
          <Flex
            // marginLeft={"1px"}
            // backgroundColor={"yellow.600"}
            w={"570px"}
            // h={"500px"}
            justifyContent="center"
          >
            <Image
              src={imageSource}
              borderRadius={"full"}
              boxSize="50px"
              objectFit={"cover"}
              // marginLeft={"10px"}
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
              <Flex marginLeft={"5px"}>
                <label
                  htmlFor="imagePost"
                  style={{
                    cursor: "pointer",
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
                  px={"5"}
                  py={"2"}
                  _hover={{
                    background: "#1DA1F2",
                  }}
                  marginInlineStart={"400px"}
                  rounded={"full"}
                  onClick={postHandler}
                >
                  Talk to us
                </Button>
              </Flex>
            </form>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default TalkBox