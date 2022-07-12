import { Box, Flex, Spacer, HStack } from "@chakra-ui/react";
import Feed from "../components/feed";
import Sidebar from "../components/sidebar";
import Widgets from "../components/widgets";
function Home() {
  return (
    <Flex justifyContent={"space-around"}>
      <Sidebar />
      <Feed />
      <Widgets />
    </Flex>
  );
}
export default Home