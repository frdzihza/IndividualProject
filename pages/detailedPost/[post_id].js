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
  Center,
  HStack
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
  const [commentLength, setCommentLength] = useState(props.commentLength);
  const [paginate, setPaginate] = useState(1);
  const [paginatePost, setPaginatePost] = useState(3);

  
  const renderComment = () => {
    return allComment.map((comment) => {
      return <CommentUser key={comment._id} comment={comment} />;
    });
  }
  

  const getComments = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        params: { paginate, paginatePost },
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const newComment = await axiosInstance.get(
        `/comments/${comment._id}`,
        config
        );
        setAllComment(newComment.data.data);
        setPaginate(1)
    } catch (error) {
      if (error.response.data) return alert(error.response.data.message);
      alert(error.message);
    }
  };

  const moreComments = async () =>{
    setPaginate(paginate + 1);
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        params: { paginate: paginate + 1, paginatePost },
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const newComment = await axiosInstance.get(
        `/comments/${post._id}`,
        config
      );
      setAllComment([...allComment, ...newComment.data.data]);
    } catch (error) {
      if (error.response.data) return alert(error.response.data.message);
      alert(error.message);
    }
  }

  
  return (
    <HStack
      height="auto"
      w={"100vw"}
      marginEnd={"600px"}
      background={"linear-gradient(to top, #5ee7df 0%, #b490ca 100%)"}
      // justifyContent={"center"}
    >
      <Flex>
        <Sidebar />

        <Flex flexDirection="column">
          <Box
            // backgroundColor={"red"}
            width="800px"
          >
            <Feed key={post._id} post={post} user={props.user}></Feed>
            {/* <Feed/> */}
          </Box>
          <Box
            rounded={5}
            boxShadow="md"
            marginBottom={2}
            padding="2"
            marginInlineEnd={"25%"}
            marginInlineStart={"17%"}
            // backgroundColor="yellow"
          >
            <CommentBox
              key={comment._id}
              post_id={post._id}
              getComments={getComments}
            />
            {renderComment()}
            <Flex flexDirection="row-reverse" mt="2">
              {allComment.length <= commentLength && (
                <Button variant="link" onClick={moreComments}>
                  Show More Comment
                </Button>
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </HStack>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: "/login" } };

    const { accessToken} = session.user;
    const paginate = 1
    const paginatePost = 3
    const config = {
      params: {paginate, paginatePost},
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
        commentLength: comment.data.length
      },
    };
  } catch (error) {
    // console.error(error.response.data);
    const { message } = error;
    
    return { props: { message } };
  }
}

export default DetailedPost