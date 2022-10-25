import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGuildTrafficQuery } from "../../../generated/graphql";
import { DailyStatistics } from "./components/DailyStatistics";
import { TrafficList } from "./components/TrafficList";

interface Props {
  count: string | undefined;
}

export const Summary: FC<Props> = ({ count }) => {
  const { id }: { id: string } = useParams();
  const [{ data, fetching }] = useGuildTrafficQuery({ variables: { gid: id } });
  return (
    <>
      <DailyStatistics count={count} trafficData={data} />
      <Flex position="relative" flex={1} flexDirection="row" m="4" mt="10">
        <Box minW="50%" bg="gray.700">
          <Heading textAlign="center" mt="2">
            Last 24h traffic
          </Heading>
          <TrafficList trafficData={data} />
        </Box>
      </Flex>
    </>
  );
};
