import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { FC, MouseEvent, useEffect, useState } from "react";
import {
  GetDiscordMembersResult,
  useGetModeratorsQuery,
  useGrantGuildPrivilegeMutation,
  useRevokeGuildPrivilegeMutation,
} from "../../../../generated/graphql";
import { useParams } from "react-router-dom";
import { FetchingData } from "../../FetchingData";
import {
  failedRequest,
  successfulRequest,
} from "../../../../utilities/Toaster";
import ReactPaginate from "react-paginate";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface Props {
  memberList?: GetDiscordMembersResult[];
  // reFetch: (opts?: Partial<OperationContext> | undefined) => void;
}

type pMembers = {
  display: string;
  id: string;
  permission: boolean;
};

export const ModList: FC<Props> = ({ memberList }) => {
  const [pMembers, sett] = useState<pMembers[]>([]);
  const [currentItems, setCurrentItems] = useState<pMembers[] | null>();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;
  const toast = useToast();
  const { id } = useParams();
  const [, revoke] = useRevokeGuildPrivilegeMutation();
  const [, grant] = useGrantGuildPrivilegeMutation();
  const [{ data, fetching }] = useGetModeratorsQuery({
    variables: { gid: id! },
  });

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget;
    const permission = element.getAttribute("data-permission");

    if (permission === "true") {
      const res = await revoke({ gid: id!, userId: element.value });
      if (res.error) return failedRequest(toast);
      sett((a) => {
        a.find((x) => x.id === element.value)!.permission = false;
        return [...a];
      });
      return successfulRequest(toast);
    } else if (permission === "false") {
      const res = await grant({ guildId: id!, userId: element.value });
      if (res.error) return failedRequest(toast);
      sett((a) => {
        a.find((x) => x.id === element.value)!.permission = true;
        return [...a];
      });
      return successfulRequest(toast);
    }
  };

  useEffect(() => {
    if (!fetching) {
      const mods = data?.getModerators;
      memberList!.forEach((x) => {
        if (pMembers.some((b) => b.id === x.id)) return;
        sett((a) => {
          const newList = [...a];

          newList.push({
            display: x.username + (x.nick ? "(" + x.nick + ")" : ""),
            id: x.id,
            permission: mods ? mods.some((a) => a === x.id) : false,
          });
          return newList;
        });
      });
    }
  }, [fetching, data]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (pMembers) {
      const trueFirst = pMembers.sort((a, b) => Number(b.permission) - Number(a.permission));
      setCurrentItems(trueFirst.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(pMembers.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, pMembers]);

  const handlePageClick = (event: any) => {
    if (pMembers) {
      const newOffset = (event.selected * itemsPerPage) % pMembers.length;
      setItemOffset(newOffset);
    }
  };

  if (!pMembers) return <FetchingData />;
  return (
    <>
      <TableContainer>
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Access</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems &&
              currentItems.map((x, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{x.display}</Td>
                    <Td color={x.permission ? "green.400" : "red.400"}>
                      {x.permission ? "Moderator" : "User"}
                    </Td>
                    <Td>
                      <Button
                        float="right"
                        p={2}
                        bg={x.permission ? "red.400" : "green.400"}
                        value={x.id}
                        data-permission={x.permission}
                        onClick={handleClick}
                      >
                        {x.permission ? "Revoke" : "Grant"}
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        {pMembers.length > 0 && (
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
    </>
  );
};


