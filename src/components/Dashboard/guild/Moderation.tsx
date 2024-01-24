import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetDiscordMembersResult,
  useGetGuildMembersQuery,
  useGetPrivilegedMembersQuery,
} from "../../../generated/graphql";
import { ModList } from "./components/ModList";
import { ReFetchData } from "./components/ReFetchData";
import { FetchingData } from "../FetchingData";

export const Moderation: FC = () => {
  const { id } = useParams();
  const [members, setMembers] = useState<GetDiscordMembersResult[]>();
  const [{ data, fetching }] = useGetGuildMembersQuery({
    variables: {
      gid: id!,
    },
  });

  useEffect(() => {
    if (!fetching && data && data.getGuildMembers !== null) {
      setMembers(data.getGuildMembers);
    }
  }, [fetching, data, members]);
  if (!members) return <FetchingData />;

  return <Flex flex="1" justifyContent="center" m="60px">
  <Box bg="gray.700" p={5} w="700px">
    <Heading display="inline-block">Guild members list</Heading>
    {/* <ReFetchData reFetch={reExec} /> */}
    <Divider />
    <ModList memberList={members} />
  </Box>
</Flex>;
};
