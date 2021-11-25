import { Box, Flex } from "@chakra-ui/layout";
import { FC } from "react";
import { StreamerLeaderboard } from "./components/StreamerLeaderboard";

export const StreamerRanking: FC = () => (
  <Flex
    flex={1}
    direction="row"
    justifyContent="center"
    position="relative"
    mt="60px"
  >
    <Box bg="gray.700" p={6} minWidth="70%">
      <StreamerLeaderboard />
    </Box>
  </Flex>
);
