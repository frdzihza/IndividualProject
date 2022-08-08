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

function EditPost({ isOpen, onClose, thisPost, onSavePatchPostButton }) {
  const [post, setPost] = useState(thisPost);
  const { caption } = post;
  console.log(caption)
  const onUserChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Input
                name="caption"
                type="text"
                value={caption}
                variant="filled"
                placeholder="What's on your mind?"
                mt={"10px"}
                onChange={onUserChange}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => onSavePatchPostButton(post)}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditPost;
