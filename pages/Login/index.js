import { Box, Button, Flex, Heading, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLoginClick = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (!res.error) {
      router.replace("/");
    } else {
      alert(res.error);
      console.log({ error: res.error });
    }
  };
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      background={"linear-gradient(to top, #5ee7df 0%, #b490ca 100%)"}
    >
      <Flex direction="column" p={12} rounded={6}>
        <Heading mb={6}>Sign In</Heading>
        <Input
          type="text"
          value={username}
          placeholder="Username"
          variant="filled"
          mb={3}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="**************"
          variant="filled"
          mb={6}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
        
          color="blue.500"
          w={"full"}
          onClick={onLoginClick}
        >
          Login
        </Button>
        <Text marginTop={"15"}>
          Did not Have an Account?
          <Link href={"/register"}> Sign Up</Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default Login;
