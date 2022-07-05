import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
function Login() {
  return (
    <Flex height="85vh" alignItems="center" justifyContent="center" src="">
      <Flex direction="column" background="blue.400" p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
        <Input
          type="text"
          value={""}
          placeholder="username"
          variant="filled"
          mb={3}
        />
        <Input
          type="password"
          value={""}
          placeholder="**************"
          variant="filled"
          mb={6}
        />
        <Button color="blue.500">Login</Button>
      </Flex>
    </Flex>
  );
}

export default Login;
