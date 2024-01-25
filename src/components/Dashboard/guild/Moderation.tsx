import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetDiscordMembersResult,
  useGetGuildMembersQuery,
  useMeQuery,
} from "../../../generated/graphql";
import { ModList } from "./components/ModList";
import { FetchingData } from "../FetchingData";

export const Moderation: FC = () => {
  const [{ data: me, fetching: meFetching }] = useMeQuery();
  const { id } = useParams();
  const [members, setMembers] = useState<GetDiscordMembersResult[]>();
  const [{ data, fetching }] = useGetGuildMembersQuery({
    variables: {
      gid: id!,
    },
  });

  useEffect(() => {
    if (!fetching && data && data.getGuildMembers !== null) {
      if (!meFetching && me && me.me) {
        const guildMembers = data.getGuildMembers!;
        const found = guildMembers.find((x) => x.id === me.me?.userId);
        if (found) {
          const idx = guildMembers.indexOf(found);
          guildMembers.splice(idx!, 1);
        }
        setMembers(guildMembers);
      }
    }
  }, [fetching, data, members, me, meFetching]);
  if (!members) return <FetchingData />;

  return (
    <Flex flex="1" justifyContent="center" m="60px">
      <Box bg="gray.700" p={5} w="700px">
        <Heading display="inline-block">Guild members list</Heading>
        {/* <ReFetchData reFetch={reExec} /> */}
        <Divider />
        <ModList memberList={members} />
      </Box>
    </Flex>
  );
};
