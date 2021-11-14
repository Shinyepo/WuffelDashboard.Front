import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { FC } from "react";

export const FetchingData: FC = () => (
  <Flex flex={1} justifyContent="center">
    <Box display="table" margin="200px auto">
      <Spinner margin="auto" display="block" size="xl" speed="0.4s" emptyColor="gray.100" color="gray.600" />
      <Heading margin="50px 0">Fetching data...</Heading>
    </Box>
  </Flex>
);
