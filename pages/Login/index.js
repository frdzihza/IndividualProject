import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [view, setView] = useState()

  const { data: session} = useSession()
  if(session) router.replace("/")

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
      <Flex h={"50vh"} width="1250px" justifyContent={"center"}>
        <Image src="/talk-logo.png" />
      <Flex direction="column" p={12} rounded={6}>
        <Heading mb={6}>Sign In</Heading>
        <Input
          type="text"
          value={username}
          placeholder="Username or Email"
          variant="filled"
          mb={3}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Flex>
          <Input
            type={view ? "text" : "password"}
            value={password}
            placeholder="**************"
            variant="filled"
            mb={6}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button onClick={() => setView((view) => !view)}>
            {view ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </Button>
        </Flex>
        <Button color="blue.500" w={"full"} onClick={onLoginClick}>
          Login
        </Button>
        <Text marginTop={"15"}>
          Did not Have an Account?
          <Link href={"/register"}> Sign Up</Link>
        </Text>
      </Flex>
      </Flex>
    </Flex>
  );
}


export default Login;
