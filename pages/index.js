import { Box, Flex, Spacer, HStack, Button, Text } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import { getSession } from "next-auth/react";
import axiosInstance from "../services/axios";
import TalkBox from "../components/TalkBox";
import InfiniteScroll from "react-infinite-scroller";
import Feed from "../components/feed"
import { useState } from "react";
import { MdVerified, MdWarningAmber } from "react-icons/md";

function Home(props) {
const [post, setPost] = useState(props.post);
const [paginate, setPaginate] = useState(1)
const [paginatePost, setPaginatePost] = useState(4)
const [morePost, setMorePost] = useState(true);
const [postLength, setPostLength] = useState(props.length);

const fetchMorePost = async () => {

     setTimeout(async () => {
       const res = await axiosInstance.get("/posts/timeline/all", {
         params: { paginate: paginate + 1, paginatePost },
       });

       if (res) {
         const newPosting = [...post, ...res.data.data];
         if (newPosting.length >= postLength) {
           setMorePost(false);
         }
         setPost(newPosting);
         setPaginate(paginate + 1);
       }
     }, 400);
};

  const getPost = async () => {
    const res = await axiosInstance.get("/posts/timeline/all", {
      params: { paginate: 1, paginatePost },
    });
     setPost(res.data.data);
     setPostLength(res.data.length);
     setPaginate(1);
     setMorePost(true);
  };
  const resendVerificationHandler = async () => {
    const body = {
      email: props.user.email,
      userId: props.user._id,
    };
    await axiosInstance.post("/users/verifyToken", body);
    alert("Success sending email");
  };

const renderPost = () => {
  return post.map((PST) => {
    return (
      <Feed key={PST._id} post={PST} user={props.user} getPost={getPost}/>
      );
    });
  };



  return (
    <Flex background={"linear-gradient(to top, #5ee7df 0%, #b490ca 100%)"}>
      <Sidebar />
      {!props.user.isVerified ? (
        <Flex direction={"column"}>
          <Button onClick={resendVerificationHandler}>
            Resend verification
          </Button>
          <Box marginStart={10} fontSize="m" fontStyle={"italic"} color={"red"}>
            <MdWarningAmber /> unverified
          </Box>
        </Flex>
      ) : (
        <Box marginStart={10} fontSize="m" fontStyle={"italic"} color={"green"}>
          
        </Box>
      )}
      <Flex flexDirection="column" marginInline={2}>
        <TalkBox user={props.user} getPost={getPost} />

        <InfiniteScroll
          pageStart={0}
          loadMore={fetchMorePost}
          hasMore={morePost}
          loader={
            <Box
              rounded={5}
              boxShadow="md"
              marginBottom={2}
              padding="2"
              marginInlineStart={"17%"}
              marginInlineEnd={"25%"}
              // backgroundColor={"red"}
              alignItems={"center"}
              key={0}
              textAlign={"center"}
            >
              Please Wait A Second 😊
            </Box>
          }
        >
          {renderPost()}
        </InfiniteScroll>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: "/login" } };
    // if (session) return { redirect: { destination: "/" } };

    const { accessToken } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      
    };
    const paginate = 1
    const paginatePost = 4

    const res = await axiosInstance.get("/users/profile", config);
    const getPost = await axiosInstance.get("/posts/timeline/all", {
      params: { paginate, paginatePost },
    });


  
      return {
      props: {
        user: res.data.data.result,
        post: getPost.data.data,
        length: getPost.data.length,
        session,
      },
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}
export default Home