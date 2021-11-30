import { Button } from "@chakra-ui/button";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/table";
import { FC } from "react";
import { useParams } from "react-router";
import { useStreamerRankingQuery } from "../../../../generated/graphql";
import { FetchingData } from "../../FetchingData";

interface Props {}

export const StreamerLeaderboard: FC<Props> = () => {
  const { id }: { id: string } = useParams();
  const [{ data, fetching }] = useStreamerRankingQuery({
    variables: { gid: id },
  });
  let body = <FetchingData />;

  if (!fetching && data) {
    body = (
      <>
        <Table variant="simple" colorScheme="whiteAlpha">
            {!data?.streamerRanking ? <TableCaption fontSize="2xl">No Data...</TableCaption> : null}
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>User</Th>
              <Th>Time</Th>
              <Th textAlign="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!data?.streamerRanking
              ? null
              : data.streamerRanking!.map((x) => {
                  return (<Tr key={x.id}>
                    <Td>#1</Td>
                    <Td>
                      {x.username}
                      {x.nickname ? "(" + x.nickname + ")" : ""}
                    </Td>
                    <Td>{x.timeStreamed}</Td>
                    <Td textAlign="right">
                      <Button bg="red.400">Delete</Button>
                    </Td>
                  </Tr>);
                })}
          </Tbody>
        </Table>
      </>
    );
  }

  return body;
};
