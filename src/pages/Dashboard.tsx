import { Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FetchingData } from "../components/Dashboard/FetchingData";
import { GuildContent } from "../components/Dashboard/GuildContent";
import { NotSelected } from "../components/Dashboard/NotSelected";
import Sidebar from "../components/Dashboard/Sidebar";
import {
  DiscordGuilds,
  useGetGuildsQuery,
  useMeQuery,
} from "../generated/graphql";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Summary } from "../components/Dashboard/guild/Summary";

interface Props {}

export const Dashboard: FC<Props> = () => {
  const [{ data: me, fetching: meFetching }] = useMeQuery();
  const [{ data: guilds, fetching: guildFetching }, reGuildsQuery] =
    useGetGuildsQuery({ pause: true });
  const [initialized, setInitialized] = useState(false);
  const [guildsState, setGuildsState] = useState(guilds?.guilds);
  const { id } = useParams();
  const history = useNavigate();

  const gid = parseInt(id!);
  let body = <FetchingData />;

  function SortGuilds() {
    let sortedIns = null;
    let sortedOuts = null;
    let sortedGuilds: DiscordGuilds[] = [];
    if (guilds?.guilds) {
      const insList = guilds.guilds.filter((x) => x.in);
      const outsList = guilds.guilds.filter((x) => !x.in);

      sortedIns = insList.sort((a, b) => b.name.localeCompare(a.name));
      sortedOuts = outsList.sort((a, b) => a.name.localeCompare(b.name));
      sortedIns.map((guild) => sortedGuilds.push(guild));
      sortedOuts.map((guild) => sortedGuilds.push(guild));

      setGuildsState(sortedGuilds);
      setInitialized(true);

      return sortedGuilds;
    }
    return null;
  }
  const [meReady, setMeReady] = useState(false);
  useEffect(() => {
    if (!me?.me && !meFetching) {
      return history("/");
    } else if (me?.me && !meFetching) {
      setMeReady(true);
    }
    // eslint-disable-next-line
  }, [me, meFetching]);

  useEffect(() => {
    if (meReady) {
      if (!guilds?.guilds && !guildFetching) {
        reGuildsQuery();
      } else if (guilds?.guilds && !guildFetching) {
        SortGuilds();
      }
    }
    // eslint-disable-next-line
  }, [meReady, guildFetching, guilds]);

  if (meFetching || guildFetching || !initialized) {
    return <FetchingData />;
  }
  if (me && me.me !== null && guilds && guilds.guilds !== null && initialized) {
    body = (
      <>
        <Sidebar meData={me} guildsData={guildsState} />
        <Box ml="300px">
          {isNaN(gid) ? (
            <NotSelected />
          ) : (
            <GuildContent gid={id!} handleSorting={SortGuilds} />
          )}
        </Box>
      </>
    );
  }
  return body;
};
