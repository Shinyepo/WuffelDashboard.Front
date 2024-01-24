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
import { FC, useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { GuildTraffic, GuildTrafficQuery } from "../../../../generated/graphql";
import { FetchingData } from "../../FetchingData";
import { NoData } from "../../NoData";
import "../../../../styles/paginationStyles.css";

interface Props {
  trafficData: GuildTrafficQuery | undefined;
}
interface ItemsProps {
  currentItems: GuildTraffic[] | null | undefined;
  offset: number;
}

const Items: FC<ItemsProps> = ({ currentItems, offset }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((x, idx) => (
            <Tr key={idx} color={x.joined ? "green.500" : "red.500"}>
              <Td>{idx + 1 + offset}</Td>
              <Td>{x.nickname ? x.nickname : x.username}</Td>
              <Td>{new Date(x.createdAt).toLocaleString()}</Td>
              <Td>{x.joined ? "joined" : "left"}</Td>
            </Tr>
        ))}
    </>
  );
};

export const TrafficList: FC<Props> = ({ trafficData }) => {
  const [currentItems, setCurrentItems] = useState<GuildTraffic[] | null>();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;
  let body = <FetchingData />;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (trafficData && trafficData.guildTraffic) {
      setCurrentItems(
        trafficData.guildTraffic.reverse().slice(itemOffset, endOffset)
      );
      setPageCount(Math.ceil(trafficData.guildTraffic.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, trafficData?.guildTraffic]);
  if (!trafficData || !trafficData.guildTraffic) return (body = <NoData />);

  const handlePageClick = (event: any) => {
    if (trafficData && trafficData.guildTraffic) {
      const newOffset =
        (event.selected * itemsPerPage) % trafficData?.guildTraffic.length;
      setItemOffset(newOffset);
    }
  };

  body = (
    <TableContainer>
      <Table variant="simple" colorScheme="whiteAlpha">
        {trafficData.guildTraffic.length < 1 ? (
          <TableCaption fontSize="2xl" pb={5}>No Data...</TableCaption>
        ) : (
          ""
        )}
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>User</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Items currentItems={currentItems} offset={itemOffset} />
        </Tbody>
      </Table>
      {trafficData.guildTraffic.length > 0 && (
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
    </TableContainer>
  );

  return body;
};
