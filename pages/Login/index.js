import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
function Login() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      background={
        "linear-gradient(90deg, rgba(208,206,205,1) 10%, rgba(200,42,42,1) 63%)"
      }
    >
      <Flex direction="column" p={12} rounded={6}>
        <Heading mb={6}>Sign In</Heading>
        <Input
          type="text"
          value={""}
          placeholder="Username"
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
