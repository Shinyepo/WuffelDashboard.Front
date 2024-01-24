import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FC } from "react";
import { OperationContext } from "urql";
import {
  GetDiscordMembersResult,
  PrivilegedMembers,
  useRevokeGuildPrivilegeMutation,
} from "../../../../generated/graphql";
import { NoData } from "../../NoData";
import { useParams } from "react-router-dom";

interface Props {
  memberList?: GetDiscordMembersResult[];
  reFetch: (opts?: Partial<OperationContext> | undefined) => void;
}

export const ModList: FC<Props> = ({ memberList, reFetch }) => {
  const { id } = useParams();
  const [, revoke] = useRevokeGuildPrivilegeMutation();
  return (
    <>
      <TableContainer>
        <Table variant="simple" colorScheme="whiteAlpha">
          {memberList && memberList.length > 0 ? null : (
            <TableCaption>
              <NoData />
            </TableCaption>
          )}
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Access</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {memberList &&
              memberList.map((x, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{x.username + (x.nick ? "(" + x.nick + ")" : "")}</Td>
                    <Td color="green.300">Granted</Td>
                    <Td>
                      <Button
                        float="right"
                        p={2}
                        bg="red.400"
                        value={x.id}
                        onClick={() => {
                          revoke({
                            gid: id!,
                            userId: x.id,
                          });
                          reFetch();
                        }}
                      >
                        Revoke
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
