import { Button, Flex, Text,Box, VStack, Image, HStack, Input, useDisclosure } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import axiosInstance from "../../services/axios";
import NextLink from "next/link";
import Sidebar from "../../components/sidebar";
import {my_api} from "../../constraint"
import { useState } from "react";
import EditProfile from "../../components/EditProfile"


function Profile(props) {
const [profAva, setProfAva] = useState()
const { isOpen, onOpen, onClose } = useDisclosure();
const [user, setUser] = useState(props.user);
const {fullName, username, email, bio, profilePicture} = user
const [imageSource, setImageSource] = useState(
  my_api + profilePicture
  );

const onPicChange = (event) =>{
  setProfAva(event.target.files[0])
  setImageSource(URL.createObjectURL(event.target.files[0]))
}

const onSaveAvatarButton = async () => {
  try {
    const session = await getSession();

    const { accessToken } = session.user;

    const body = new FormData();

    body.append("avatar", profAva);
  

    const config = {
       headers: { Authorization: `Bearer ${accessToken}` },
     };

    const res = await axiosInstance.patch("/users/avatar", body, config);

    alert(res.data.message);
    window.location.reload();
   } catch (error) {
     console.log({ Error });
     alert(error.response.data?.message);
   }
 };

const onSaveUpdateProfileButton = async (body) =>{
  try {
    const session = await getSession();

    const { accessToken } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    await axiosInstance.patch("/users/profileUpdate", body, config)

    
    const getUserProfile = await axiosInstance.get("/users/profile", config)
    
    setUser(getUserProfile.data.data.result)
    alert ("Update Profile Success")
  } catch (error) {
    console.log(error.response.data);
    alert("Username already Exist")
  }
}
 
  return (
    <Box background={"linear-gradient(to top, #5ee7df 0%, #b490ca 100%)"}>
      <Flex>
        <Sidebar />
        <Box
          width="1000px"
          height="795,5px"
          ml={"10%"}
          justifyItems={"center"}
          borderInlineStart={"5px"}
        >
          <Flex justifyContent={"center"}>
            <VStack>
              <Image
                src={imageSource}
                borderRadius={"full"}
                boxSize="50px"
                width={"200"}
                height={"200"}
                objectFit={"cover"}
              />
              <Input type={"file"} onChange={onPicChange} />
              <Button
                variant={"solid"}
                onClick={onSaveAvatarButton}
                _hover={{
                  background: "#1DA1F2",
                }}
              >
                Save
              </Button>
            </VStack>
          </Flex>
          <VStack marginTop={"100px"}>
            <Text fontSize={"xl"}>Full Name: {fullName}</Text>
            <Text fontSize={"xl"}>Username: {username}</Text>
            <Text fontSize={"xl"}>Email: {email}</Text>
            <Text fontSize={"xl"}>Bio: {bio}</Text>
            <Button
              onClick={onOpen}
              _hover={{
                background: "#1DA1F2",
              }}
            >
              Edit Profile
            </Button>
            <EditProfile
              isOpen={isOpen}
              onClose={onClose}
              thisUser={props.user}
              onSaveUpdateProfileButton={onSaveUpdateProfileButton}
            />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) return { redirect: { destination: "/login" } };

    const { accessToken } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const res = await axiosInstance.get("/users/profile", config);

    return {
      props: { user: res.data.data.result, session },
    
    };
  } catch (error) {
    console.log({ error });
    return { props: {} };
  }
}

export default Profile