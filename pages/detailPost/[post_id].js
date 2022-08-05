import CommentBox from "../../components/CommentBox";
import CommentUser from "../../components/CommentUser";
import Sidebar from "../../components/sidebar";
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
  VStack,
  Center
} from "@chakra-ui/react";
import { useState } from "react";
import { getSession } from "next-auth/react";
import axiosInstance from "../../services/axios";
import Feed from "../../components/feed";

function DetailedPost(props) {
  const {post} = props
  // console.log({post})
  const {comment} = props
  const [allComment, setAllComment] = useState(comment);

  
  const renderComment = () => {
    return allComment.map((comment) => {
      return <CommentUser key={comment._id} comment={comment} />;
    });
  }
  
  // console.log(renderComment())

  const getComments = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const newComment = await axiosInstance.get(
        `/comments/${comment._id}`,
        config
        );
        setAllComment(newComment.data.data);
    } catch (error) {
      if (error.response.data) return alert(error.response.data.message);
      alert(error.message);
    }
  };
  // console.log(getComments)
  
  return (
    <VStack>
      <Flex
        height="100vh"
        width="full"
        maxWidth="100vw"
        ms="auto"
        me="auto"
        padding="0 10px"
      >

        <Sidebar />

        <Flex flexGrow={"0.4"} ml={"300px"} w="70%" flexDirection="column" justifyContent={""}>
          <Feed key={post._id} post={post} user={props.user}></Feed>
          {/* <Feed/> */}
          <Box
            rounded={5}
            boxShadow="md"
            marginBottom={2}
            padding="2"
            marginInlineEnd={"25%"}
          >
            <CommentBox
              key={comment._id}
              post_id={post._id}
              getComments={getComments}
              
              />
                {renderComment()}
          </Box>
            </Flex>
            </Flex>
    </VStack>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: "/login" } };

    const { accessToken} = session.user;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    
    const {post_id} = context.params


    const comment = await axiosInstance.get(`/comments/${post_id}`, config);
    const res = await axiosInstance.get("/users/profile", config);
    const post = await axiosInstance.get(`/posts/${post_id}`, config);
    
    if (!post) return { redirect: { destination: "/" } };

    return {
      props: {
        post: post.data.data.posted,
        user: res.data.data.result,
        comment: comment.data.data,
      },
    };
  } catch (error) {
    // console.error(error.response.data);
    const { message } = error;
    
    return { props: { message } };
  }
}

export default DetailedPost