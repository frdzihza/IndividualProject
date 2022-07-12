import {
  Button,
  Flex,
  Heading,
  Input,
  Image,
  Link,
  Text,
  Box,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import {useState} from "react"
import axiosInstance from "../../services/axios";
import { getSession } from "next-auth/react";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  

  const onRegisterClick = async () => {
    try {
      const body = {
        username,
        email,
        password,
      };
      const res = await axiosInstance.post("/users", body);
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };


  return (
    <Flex
      alignItems="center"
      justifyContent={"space-between"}
      background={
        "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)"
      }
    >
      <Flex h={"100vh"} width="1250px" justifyContent={"center"}>
        <Image src="/logo.png" />
      </Flex>
      <Flex
        width="1250px"
        height={"100vh"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Flex direction="column" h={"100vh"} justifyContent={"center"}>
          <Heading mb={"6"} size={"2xl"} fontStyle={"oblique"} as={"h1"}>
            {" "}
            Join Talk Today!
          </Heading>
          <Heading as={"h2"} mb={6}>
            Sign Up
          </Heading>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"} htmlFor="username">
              Username
            </FormLabel>
            <Input
              type="text"
              // value={""}
              placeholder="Username"
              variant="filled"
              id="username"
              // mb={3}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"}>
              Email
            </FormLabel>
            <Input
              type="text"
              // value={""}
              placeholder="Email"
              variant="filled"
              // mb={3}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"}>
              Password
            </FormLabel>
            <Input
              type="password"
              // value={""}
              placeholder="Password"
              variant="filled"
              // mb={6}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"}>Re-Enter Password</FormLabel>
            <Input
              type="password"
              // value={""}
              placeholder="Password"
              variant="filled"
              mb={6}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            disabled={disabled}
            color="black.500"
            onClick={() => {
              onRegisterClick();
              setDisabled(true);
              setTimeout(() => {
                setDisabled(false);
              }, 5000);
            }}
          >
            Sign Up
          </Button>
          <Text marginTop={"15"}>
            Already Have an Account?
            <Link href={"/login"}> Sign In</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}


export default Register;
