import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetGuildMembersQuery, useGetPrivilegedMembersQuery } from "../../../generated/graphql";
import { ModList } from "./components/ModList";
import { ReFetchData } from "./components/ReFetchData";

export const Moderation: FC = () => {
  const { id } = useParams();
  const [{data: memberData, fetching: memberFetching}] = useGetGuildMembersQuery({
    variables: {
      gid: id!,
    },
  });
  const [{ data, fetching }, reExec] = useGetPrivilegedMembersQuery({
    variables: {
      gid: id!,
    },
  });
  const res = data?.getPrivilegedMembers

  return (
    <Flex flex="1" justifyContent="center" m="60px">
      <Box bg="gray.700" p={5} w="700px">
        <Heading display="inline-block">Guild members list</Heading>
        <ReFetchData reFetch={reExec} />
        <Divider />
        <ModList memberList={memberData?.getGuildMembers!} reFetch={reExec}/>
      </Box>
    </Flex>
  );
};
