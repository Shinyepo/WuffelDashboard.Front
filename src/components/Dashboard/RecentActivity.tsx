import {
  Box,
  Divider,
  Flex,
  Heading,
  Tab,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FC } from "react";

export const RecentActivity: FC = () => {
  return (
    <Box bg="gray.700" p={5} minW="48%">
      <Heading>Recent user activity</Heading>
      <Divider />
      <TableContainer>
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>Action</Th>
              <Th>User</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>jes</Td>
              <Td>jes2</Td>
              <Td>jes3</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
