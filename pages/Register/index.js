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
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axiosInstance from "../../services/axios";
import { getSession } from "next-auth/react";
import PasswordStrengthBar from 'react-password-strength-bar';


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("")
  const [fullName, setFullName] = useState("")
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  
  const { data: session } = useSession();
  if (session) router.replace("/");

  

  const onRegisterClick = async () => {
    try {

    if(password != password2){
      throw{
        code: 400,
        message: "Password Did not Match"
      }
    }
      const body = {
        username,
        email,
        fullName,
        password: password
      };
      const res = await axiosInstance.post("/users", body);
      alert(res.data.message);
    } catch (error) {
      if(error.response?.data) return alert(error.response.data.message);
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent={"space-between"}
      background={"linear-gradient(to top, #5ee7df 0%, #b490ca 100%)"}
    >
      <Flex h={"100vh"} width="1250px" justifyContent={"center"}>
        <Image src="/talk-logo.png" />
      </Flex>
      <Flex
        width="1250px"
        height={"100vh"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Flex direction="column" h={"100vh"} justifyContent={"center"}>
          <Heading mb={"6"} size={"2xl"} fontStyle={"oblique"} as={"h1"}>
            Join Talk Today!
          </Heading>
          <Heading as={"h2"} mb={6}>
            Sign Up
          </Heading>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"}>Full Name</FormLabel>
            <Input
              type="text"
              value={fullName}
              placeholder="Full Name"
              variant="filled"
              // mb={6}
              onChange={(event) => setFullName(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"} htmlFor="username">
              Username
            </FormLabel>
            <Input
              type="text"
              value={username}
              placeholder="Username"
              variant="filled"
              id="username"
              // mb={3}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"}>Email</FormLabel>
            <Input
              type="text"
              value={email}
              placeholder="Email"
              variant="filled"
              // mb={3}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"}>Password</FormLabel>
            <Input
              type="password"
              value={password}
              placeholder="Password"
              variant="filled"
              // mb={6}
              onChange={(event) => setPassword(event.target.value)}
            />
            
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"xl"}>Repeat Password</FormLabel>
            <Input
              type="password"
              value={password2}
              placeholder="Password"
              variant="filled"
              mb={6}
              onChange={(event) => setPassword2(event.target.value)}
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
