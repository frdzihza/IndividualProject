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
import {
  BsHeart,
  BsHeartFill,
  BsThreeDots,
  BsChatRightText,
} from "react-icons/bs";
import moment from "moment";
import { MdOutlineModeComment } from "react-icons/md";
import { useState } from "react";
import { getSession } from "next-auth/react";
import axiosInstance from "../services/axios";
import { my_api } from "../constraint";
import NextLink from "next/link";
import EditPost from "./EditPost";

function Feed(props) {
  const [imagePost, setImagePost] = useState(
    my_api + props.post.imagePost
  );
  const [imageUser, setImageUser] = useState(
    my_api + props.post.createdBy.profilePicture
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [likers, setLikers] = useState(props.post.likers.length)
  const [comment, setComment] = useState(props.post.comment.length)
  const [isLiked, setIsLiked] = useState(
    props.post.likers.includes(props.user._id)
  );
  // console.log(props.user._id);
  
  const [post, setPost] = useState(props.post)

  const onDeleteHandler = async () =>{
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        body: { createdBy: post.createdBy},
        headers: { Authorization: `Bearer ${accessToken}` },
      }
      const isDeleted = await axiosInstance.delete(
        `/posts/${post._id}`,
        config
      );
      window.location.reload();
      alert(isDeleted.data.message);
    } catch (error) {
      alert("itsnotyourpost");
    }
  };
  
  const onEditHandler = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        body: { caption: post.caption },
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const editPost = await axiosInstance.patch(
        `/posts/${post._id}`,
        config
      );
      alert(editPost.data.message);
      setEditMode(false);
    } catch (error) {
      if (error.response.data) return alert(error.response.data.message);
      alert(error.message);
    }
  };

const onSavePatchPostButton = async (body) => {
  try {
    const session = await getSession();

    const { accessToken } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    await axiosInstance.patch(`/posts/${post._id}`, body, config);
    const getUserPost = await axiosInstance.get(`posts/${post._id}`,config);
    setPost(getUserPost.data.data.message);
    alert("update post success")
    window.location.reload();
  } catch (error) {
    console.log(error);
    alert("You cant edit other people post")
    // alert(error.message);
  }
};

  const onLikeHandler = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      await axiosInstance.put(
        `/posts/like/${post._id}`,
        {
          userId: props.user._id,
        },
        config
      );

    } catch (error) {
     alert(error.message)
    }
    setLikers(isLiked ? likers - 1 : likers + 1);
    setIsLiked(!isLiked);
  };

  const onChangeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Box
      marginBottom={2}
      padding="3"
      // marginInlineStart={"25%"}
      // backgroundColor={"yellow"}
    >
      <Flex>
        <Image
          src={imageUser}
          height="45px"
          width="45px"
          objectFit={"cover"}
          rounded={"full"}
          marginBottom={2}
        ></Image>
        <Flex direction={"column"}>
          <Text marginStart={3} marginTop={2} fontSize="xl" fontWeight={"bold"}>
            {props.post.createdBy.fullName}
          </Text>
          <Text marginStart={3}  fontSize="m">
            @{props.post.createdBy.username}
          </Text>
          <Text marginStart={3} fontSize={"xs"} fontStyle={"italic"}>
            {moment(props.post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
        </Flex>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDots />}
            variant="ghost"
          />
          <MenuList>
            <MenuItem onClick={onOpen}>
              <EditPost
                isOpen={isOpen}
                onClose={onClose}
                thisPost={props.post}
                onSavePatchPostButton={onSavePatchPostButton}
              />{" "}
              Edit Post
            </MenuItem>
            <MenuItem onClick={onDeleteHandler}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Text marginStart={12} marginBottom={2}>
        {props.post.caption}
      </Text>
      {props.post.imagePost && (
        <Image
          marginStart={12}
          rounded="10"
          src={imagePost}
          maxHeight="400px"
          width="50%"
        ></Image>
      )}

      <Flex flexDirection={"row"}>
        {isLiked ? (
          <IconButton
            marginStart={10}
            padding="3"
            variant={"unstyled"}
            color="red.400"
            _hover={{
              background: "#e8f5fe",
              color: "red.400",
              rounded: "full",
            }}
            icon={<BsHeartFill />}
            onClick={() => onLikeHandler()}
          ></IconButton>
        ) : (
          <IconButton
            marginStart={10}
            padding="3"
            variant={"unstyled"}
            _hover={{
              background: "#e8f5fe",
              color: "red.400",
              borderRadius: "25px",
            }}
            icon={<BsHeart />}
            onClick={() => onLikeHandler()}
          ></IconButton>
        )}
        <Text marginTop={1.5}>{likers}</Text>
        <NextLink href={`#`}>
          <Link variant="unstyle">
            <IconButton
              marginStart={10}
              padding="3"
              variant={"unstyled"}
              _hover={{
                background: "#e8f5fe",
                color: "red.400",
                borderRadius: "25px",
              }}
              icon={<MdOutlineModeComment />}
            ></IconButton>
          </Link>
        </NextLink>
        <Text marginTop={1.5}>{comment}</Text>
      </Flex>
    </Box>
  );
          
}

export default Feed;
