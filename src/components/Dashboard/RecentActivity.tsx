import {
  Box,
  Divider,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { LogActivity, useGetActivityQuery } from "../../generated/graphql";
import { ReFetchData } from "./guild/components/ReFetchData";

interface ItemsProps {
  currentItems: LogActivity[] | null | undefined;
  offset: number;
}

export const RecentActivity: FC = () => {
  const { id }: { id: string } = useParams();
  const [{ data, fetching }, reExec] = useGetActivityQuery({
    variables: {
      id,
    },
  });
  const [activity, setActivity] = useState<LogActivity[] | null | undefined>();

  const [currentItems, setCurrentItems] = useState<LogActivity[] | null>();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    setActivity(data?.getActivity as any);
    const endOffset = itemOffset + itemsPerPage;
    if (activity) {
      setCurrentItems(activity.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(activity.length / itemsPerPage));
    }
  }, [activity, fetching, itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    if (activity) {
      const newOffset = (event.selected * itemsPerPage) % activity.length;
      setItemOffset(newOffset);
    }
  };
  return (
    <Box bg="gray.700" p={5} minW="48%">
      <Heading display="inline-block">Recent user activity</Heading>
      <ReFetchData reFetch={reExec} />

      <Divider />
      <TableContainer>
        <Table variant="simple" colorScheme="whiteAlpha">
          {data && data.getActivity.length > 0 ? null : (
            <TableCaption fontSize="2xl">No Data...</TableCaption>
          )}
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Action</Th>
              <Th>User</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Items currentItems={currentItems} offset={itemOffset} />
          </Tbody>
        </Table>
      </TableContainer>
      {activity && (
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
    </Box>
  );
};

const Items: FC<ItemsProps> = ({ currentItems, offset }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((x, idx) => (
          <Tr key={idx} color={x.activityType ? "green" : "red"}>
            <Td>{idx + 1 + offset}</Td>
            <Td>{x.activity}</Td>
            <Td>{x.username}</Td>
            <Td>{x.createdAt}</Td>
          </Tr>
        ))}
    </>
  );
};
