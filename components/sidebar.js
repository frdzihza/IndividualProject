import { Box, Button, Flex, Spacer, Text, Image } from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMoreHoriz } from "react-icons/md";

function Sidebar() {
  return (
    <Box>
      <Flex
        flexGrow={"0.3"}
        direction={"column"}
        // width="30vw"
        height="100vh"
        marginLeft={"25"}
        fontFamily={"sans-serif"}
        alignItems={"center"}
      >
        <Flex>
          <Box w={"5vw"}>
            <Image src="/logo.png" />
          </Box>
        </Flex>
        <Flex>
          <Button
            leftIcon={<MdHome />}
            // marginBottom={"0"}
            variant={"ghost"}
            fontSize={"3xl"}
            _hover={{
              background: "blue.100",
            }}
            size={"xl"}
          >
            Home
          </Button>
        </Flex>

        <Flex>
          <Button
            leftIcon={<CgProfile w={9} h={9} />}
            _hover={{
              background: "blue.100",
            }}
            variant={"ghost"}
            spacing={"24px"}
            fontSize={"3xl"}
            size={"xl"}
          >
            Profile
          </Button>
        </Flex>
        <Flex>
          <Button
            leftIcon={<MdOutlineMoreHoriz w={9} h={9} />}
            _hover={{
              background: "blue.100",
            }}
            variant={"ghost"}
            spacing={"24px"}
            fontSize={"3xl"}
            size={"xl"}
          >
            More
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Sidebar;
