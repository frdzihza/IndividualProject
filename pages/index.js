import { Box, Flex, Spacer, HStack, Button } from "@chakra-ui/react";
import Feed from "../components/feed";
import Sidebar from "../components/sidebar";

import { getSession } from "next-auth/react";
import axiosInstance from "../services/axios";

function Home(props) {

  return (
    <Flex justifyContent={"space-around"}>
      <Sidebar />
      <Feed user={props.user}/>
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


    return {
      props: { user: res.data.data.result, session },
    
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Home