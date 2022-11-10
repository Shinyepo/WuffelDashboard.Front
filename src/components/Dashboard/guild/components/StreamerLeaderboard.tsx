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
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router";
import {
  StreamLeaderboard,
  useRemoveRankingMutation,
  useStreamerRankingQuery,
} from "../../../../generated/graphql";
import { msToDuration } from "../../../../utilities/TimeUtils";
import { FetchingData } from "../../FetchingData";
import "../../../../styles/paginationStyles.css";
import { Divider, Heading, useToast } from "@chakra-ui/react";
import {
  failedRequest,
  successfulRequest,
} from "../../../../utilities/Toaster";
import { ReFetchData } from "./ReFetchData";

interface Props {}

interface ItemsProps {
  currentItems: StreamLeaderboard[] | null | undefined;
  offset: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const StreamerLeaderboard: FC<Props> = () => {
  const { id }: { id: string } = useParams();
  const [{ data, fetching }, reExec] = useStreamerRankingQuery({
    variables: { gid: id },
  });
  const [ranking, setRanking] = useState<
    StreamLeaderboard[] | null | undefined
  >();
  const [currentItems, setCurrentItems] = useState<
    StreamLeaderboard[] | null
  >();
  const toast = useToast();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;
  const [, removeRanking] = useRemoveRankingMutation();

  useEffect(() => {
    setRanking(data?.streamerRanking);
    const endOffset = itemOffset + itemsPerPage;
    if (ranking) {
      setCurrentItems(ranking.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(ranking.length / itemsPerPage));
    }
  }, [ranking, fetching, itemOffset, itemsPerPage]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const res = await removeRanking({ id: value, guildId: id });

    if (!res.data) return failedRequest(toast);
    if (!ranking) return failedRequest(toast);
    const rank = ranking.find((x) => x.id === parseInt(value));
    if (!rank) return failedRequest(toast);
    const idx = ranking.indexOf(rank);
    const newRanking = ranking.splice(idx, 1);

    setRanking(newRanking);
    successfulRequest(toast);
  };

  const handlePageClick = (event: any) => {
    if (ranking) {
      const newOffset = (event.selected * itemsPerPage) % ranking.length;
      setItemOffset(newOffset);
    }
  };
  return (
      <>
        <Heading display="inline-block">Discord streamer ranking</Heading>
        <ReFetchData reFetch={reExec} />
        <Divider />
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
            <Items
              currentItems={currentItems}
              offset={itemOffset}
              onClick={handleClick}
            />
          </Tbody>
        </Table>
        {ranking && (
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BsArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<BsArrowLeft />}
            renderOnZeroPageCount={undefined}
            nextClassName="next"
            previousClassName="previous"
            containerClassName="container"
            pageClassName="page"
            breakClassName="break"
          />
        )}
      </>
    );
};

const Items: FC<ItemsProps> = ({ currentItems, offset, onClick }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((x, idx) => (
          <>
            <Tr key={x.id}>
              <Td>{idx + 1 + offset}</Td>
              <Td>
                {x.username}
                {x.nickname ? "(" + x.nickname + ")" : ""}
              </Td>
              <Td>{msToDuration(parseInt(x.timeStreamed))}</Td>
              <Td textAlign="right">
                <Button bg="red.400" value={x.id} onClick={onClick}>
                  Delete
                </Button>
              </Td>
            </Tr>
          </>
        ))}
    </>
  );
};
