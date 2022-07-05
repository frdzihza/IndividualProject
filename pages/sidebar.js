import { Box, Button, Flex, Spacer, Text, Image } from "@chakra-ui/react";
import { MdPlayArrow } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { MdNotificationImportant } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Icon } from "@chakra-ui/react";

function Sidebar() {
  return (
    <Box background={"blue.200"}>
      <Flex
        direction={"column"}
        width="15vw"
        height="100vh"
        marginLeft={"25"}
        fontFamily={"sans-serif"}
      >
        <Flex padding={"5%"}>
          <Button
            _hover={{
              background: "blue.100",
            }}
            w={"7vw"}
            // h={"4.5vh"}
            variant={"ghost"}
            size={"md"}
          >
            <Image src="/logo.png" />
          </Button>
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
            leftIcon={<MdNotificationImportant />}
            _hover={{
              background: "blue.100",
            }}
            // marginBottom={"1.5"}
            variant={"ghost"}
            fontSize={"3xl"}
            size={"xl"}
          >
            Notifications
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
      </Flex>
    </Box>
  );
}

export default Sidebar;
