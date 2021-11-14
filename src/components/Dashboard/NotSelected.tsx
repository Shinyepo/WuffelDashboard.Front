import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FC } from "react";

interface Props {}

export const NotSelected: FC<Props> = () => (
  <Flex flex={1} justifyContent="center">
    <Box display="table" margin="200px" >
      <Image
        src="https://i.imgur.com/iwUocCr.png"
        boxSize="150px"
        objectFit="cover"
        margin="auto"
      />
      <Heading margin="50px 0">Please select a server first.</Heading>
    </Box>
  </Flex>
);
