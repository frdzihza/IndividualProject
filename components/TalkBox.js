
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
    const data = new FormData();
    const fileName = Date.now() + imagePost.name;
    data.append("name", fileName);
    data.append("imagePost", imagePost);
    data.append("caption", caption);
    data.append("imagePostPath", `/public/post/${fileName}`);
    try {
      await axiosInstance.post("/posts/uploadImage", data, config);
      setCaption("");
      setImagePost();
    } catch (error) {
      return alert(error.response.data?.message);
    }
};
}
  return (
    <Flex>
      <Image
        src={imageSource}
        borderRadius={"full"}
        boxSize="50px"
        objectFit={"cover"}
      />
      <Flex direction={"row"}>
        <form>
          <Input
            type={"text"}
            marginLeft={"5px"}
            width={"100%"}
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
                marginLeft: "60px",
                marginTop: "5px",
              }}
            >
              <MdInsertPhoto />
              <input
                style={{ display: "none" }}
                type="file"
                id="imagePost"
                onChange={(event) => setImagePost(event.target.files[0])}
              />
            </label>
            <Button px={"5"} py={"2"} rounded={"full"} onClick={postHandler}>
              Talk to us
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

export default TalkBox