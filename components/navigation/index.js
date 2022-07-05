import {
  Box,
  Button,
  Stack,
  VStack,
  HStack,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession, signOut } from "next-auth/react";
function Navigation() {
  const { data: session } = useSession();
  return (
    <Box width="80%" mx="auto" height="15vh">
      <HStack></HStack>
    </Box>
  );
}

export default Navigation;
