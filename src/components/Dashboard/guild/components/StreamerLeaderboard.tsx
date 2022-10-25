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
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  StreamLeaderboard,
  useRemoveRankingMutation,
  useStreamerRankingQuery,
} from "../../../../generated/graphql";
import { msToDuration } from "../../../../utilities/TimeUtils";
import { FetchingData } from "../../FetchingData";

interface Props {}

export const StreamerLeaderboard: FC<Props> = () => {
  const { id }: { id: string } = useParams();
  const [{ data, fetching }] = useStreamerRankingQuery({
    variables: { gid: id },
  });
  const [ranking, setRanking] = useState<
    StreamLeaderboard[] | null | undefined
  >();
  const [, removeRanking] = useRemoveRankingMutation();

  useEffect(() => {
    setRanking(data?.streamerRanking);
  }, [ranking, fetching]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const res = await removeRanking({ id: value });

    if (!res.data) return;
    if (!ranking) return;
    const rank = ranking.find((x) => x.id === parseInt(value));
    if (!rank) return;
    const idx = ranking.indexOf(rank);
    const newRanking = ranking.splice(idx, 1);

    setRanking(newRanking);
  };
  let body = <FetchingData />;

  if (!fetching && data) {
    body = (
      <>
        <Table variant="simple" colorScheme="whiteAlpha">
          {ranking && ranking.length > 0 ? null : (
            <TableCaption fontSize="2xl">No Data...</TableCaption>
          )}
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>User</Th>
              <Th>Time</Th>
              <Th textAlign="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ranking && ranking.length > 0
              ? ranking.map((x, idx) => {
                  return (
                    <Tr key={x.id}>
                      <Td>{idx+1}</Td>
                      <Td>
                        {x.username}
                        {x.nickname ? "(" + x.nickname + ")" : ""}
                      </Td>
                      <Td>{msToDuration(parseInt(x.timeStreamed))}</Td>
                      <Td textAlign="right">
                        <Button bg="red.400" value={x.id} onClick={handleClick}>
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </>
    );
  }

  return body;
};
