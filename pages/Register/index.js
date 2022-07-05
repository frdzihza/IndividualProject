import {
  Button,
  Flex,
  Heading,
  Input,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

function Register() {
  return (
    <Flex
      // height="85vh"
      alignItems="center"
      justifyContent={"space-evenly"}
      background={
        "linear-gradient(90deg, rgba(208,206,205,1) 10%, rgba(200,42,42,1) 63%)"
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
        <Flex direction="column" p={12} rounded={6}>
          <Heading mb={6}>Sign Up</Heading>
          <Input
            type="text"
            // value={""}
            placeholder="Username"
            variant="filled"
            mb={3}
          />
          <Input
            type="text"
            // value={""}
            placeholder="Email"
            variant="filled"
            mb={3}
          />
          <Input
            type="password"
            // value={""}
            placeholder="Password"
            variant="filled"
            mb={6}
          />
          <Button colorScheme="teal">Sign Up</Button>
          <Text marginTop={"15"}>
            Already Have an Account?
            <Link href={"/Login"}> Sign In</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Register;
