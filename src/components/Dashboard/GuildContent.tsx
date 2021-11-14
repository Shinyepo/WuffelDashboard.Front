import { FC, useEffect } from "react";
import { useCurrGuildQuery } from "../../generated/graphql";
import { FetchingData } from "./FetchingData";
import { FetchingNetworkError } from "./FetchingNetworkError";
import { Main } from "./guild/Main";
import { NotInvited } from "./NotInvited";

interface Props {
  gid: string;
  handleSorting: () => void;
}

export const GuildContent: FC<Props> = ({ gid, handleSorting }) => {
  const [{ data, fetching, error }, reExecute] = useCurrGuildQuery({ variables: { gid }, pause: true});
  let body = <FetchingData />;

  useEffect(() => {
    reExecute({requestPolicy: "network-only"});
    // eslint-disable-next-line
  }, [gid]);

  if (error?.networkError) {
    return <FetchingNetworkError />;
  }

  if (!fetching && data)
    body = <>{data?.currGuild === null ? <NotInvited id={gid} handleClose={reExecute} handleSorting={handleSorting} /> : <Main />}</>; 

  return body;
};
