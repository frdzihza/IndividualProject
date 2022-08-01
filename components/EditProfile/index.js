import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

function EditProfile({ isOpen, onClose, thisUser, onSaveUpdateProfileButton }) {
  const [user, setUser] = useState(thisUser);
  const { fullName, username, email, bio, profilePicture } = user;

  const onUserChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Full Name
              <Input
                name="fullName"
                type="text"
                value={fullName}
                variant="filled"
                mt={"10px"}
                onChange={onUserChange}
              />
            </Box>
            <Box>
              Username
              <Input
                name="username"
                type="text"
                value={username}
                variant="filled"
                mt={"10px"}
                onChange={onUserChange}
              />
            </Box>
            <Box>
              Bio
              <Input
                name="bio"
                type="text"
                value={bio}
                variant="filled"
                mt={"10px"}
                onChange={onUserChange}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => onSaveUpdateProfileButton(user)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile