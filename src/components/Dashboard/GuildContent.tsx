import { FC, useEffect } from "react";
import { useCurrGuildQuery } from "../../generated/graphql";
import { FetchingData } from "./FetchingData";
import { FetchingNetworkError } from "./FetchingNetworkError";
import { Main } from "./guild/Main";
import { NotInvited } from "./NotInvited";
import { OperationContext } from "urql";

interface Props {
  gid: string;
  handleSorting: () => void;
  reFetchGuilds: (opts?: Partial<OperationContext> | undefined) => void;
}

export const GuildContent: FC<Props> = ({ gid, handleSorting, reFetchGuilds }) => {
  const [{ data, fetching, error }, reExecute] = useCurrGuildQuery({ variables: { gid }, pause: true});
  let body = <FetchingData />;

  useEffect(() => {
    reExecute({requestPolicy: "network-only"});
    
    // eslint-disable-next-line
  }, [gid]);

  if (error) {
    return <FetchingNetworkError />;
  }

  if (!fetching && data)
    body = <>{data?.currGuild === null ? <NotInvited id={gid} handleClose={reExecute} reFetch={reFetchGuilds} handleSorting={handleSorting} /> : <Main guildData={data}/>}</>; 

  return body;
};
