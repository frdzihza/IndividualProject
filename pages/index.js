import { Box, Flex, Spacer, HStack, Button } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import { getSession } from "next-auth/react";
import axiosInstance from "../services/axios";
import TalkBox from "../components/TalkBox";
import Feed from "../components/feed"
import { useState } from "react";

function Home(props) {
const [post, setPost] = useState(props.post);

  const getPost = async () => {
    const res = await axiosInstance.get("/posts/timeline/all");
    setPost(res.data.data);
  };

const renderPost = () => {
  return post.map((PST) => {
    return (
      <Feed key={PST._id} post={PST} user={props.user} getPost={getPost}/>
      );
    });
  };

  return (
    <Flex>
      <Sidebar />
      <Flex flexDirection="column" marginInline={2}>
        <TalkBox user={props.user} getPost={getPost} />
        <Box marginInlineStart={"25%"} key={0}>
          {renderPost()}
        </Box>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: "/login" } };

    const { accessToken } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const res = await axiosInstance.get("/users/profile", config);
    const getPost = await axiosInstance.get("/posts/timeline/all", config);


  
      return {
      props: {
        user: res.data.data.result,
        post: getPost.data.data,
        session,
      },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Home