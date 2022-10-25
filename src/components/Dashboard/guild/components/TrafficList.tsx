import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Th,
  Tr,
  TableCaption,
} from "@chakra-ui/react";
import { FC } from "react";
import { GuildTrafficQuery } from "../../../../generated/graphql";
import { FetchingData } from "../../FetchingData";
import { NoData } from "../../NoData";

interface Props {
  trafficData: GuildTrafficQuery | undefined;
}

export const TrafficList: FC<Props> = ({ trafficData }) => {
  let body = <FetchingData />;

  if (!trafficData || !trafficData.guildTraffic) return (body = <NoData />);

  body = (
    <TableContainer>
      <Table variant="simple" colorScheme="whiteAlpha">
        {trafficData.guildTraffic.length < 1 ? <TableCaption><NoData /></TableCaption> : ""}
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>User</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {trafficData.guildTraffic.map((x, idx) => {
            return (
              <>
                <Tr key={idx} color={x.joined ? "green.500" : "red.500"}>
                  <Td>{trafficData.guildTraffic!.length - idx}</Td>
                  <Td>{x.nickname ? x.nickname : x.username}</Td>
                  <Td>{new Date(x.createdAt).toLocaleString()}</Td>
                  <Td>{x.joined ? "joined" : "left"}</Td>
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );

  return body;
};
