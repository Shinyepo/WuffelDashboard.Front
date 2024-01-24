import {Icon} from "@chakra-ui/icon";
import { Flex, Box, Heading, Text } from "@chakra-ui/layout";
import { FC } from "react";
import { MdError } from "react-icons/md";

export const FetchingNetworkError: FC = () => (
  <Flex flex={1} justifyContent="center">
    <Box display="table" margin="200px auto">
      <Icon as={MdError} boxSize={10} color="red.400" />
      <Heading margin="50px 0">
        Encountered an error while fetching data.
      </Heading>
      <Text>Please try again in a moment or contact the service administrator.</Text>
    </Box>
  </Flex>
);
