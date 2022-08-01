import { Box, Button, Flex, Spacer, Text, Image, Menu, MenuList, MenuButton, MenuItem} from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { signOut, getSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import NextLink from "next/link";
import { useSession } from "next-auth/react";


function Sidebar() {
  const { data: session } = useSession();
  const onLogoutClick = async () => {
  await signOut();
  };

  // const profileClick = 

  return (
    <Box>
      <Flex
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
          <NextLink href="/">
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
          </NextLink>
        </Flex>
        <Flex>
          <NextLink href="/profile">
          <Button
            leftIcon={<CgProfile w={9} h={9} />}
            _hover={{
              background: "blue.100",
            }}
            variant={"ghost"}
            spacing={"24px"}
            fontSize={"3xl"}
            size={"xl"}
            mt={"20"}
          >
            Profile
          </Button>
          </NextLink>
        </Flex>
        {session && (
          <>
            <NextLink href="/register">
              <Button
                // leftIcon={<MdOutlineMoreHoriz w={9} h={9} />}
                leftIcon={<MdLogout w={9} h={9} />}
                _hover={{
                  background: "blue.100",
                }}
                variant={"ghost"}
                spacing={"24px"}
                fontSize={"3xl"}
                size={"xl"}
                mt={"20"}
                onClick={onLogoutClick}
              >
                Logout
              </Button>
            </NextLink>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Sidebar;
