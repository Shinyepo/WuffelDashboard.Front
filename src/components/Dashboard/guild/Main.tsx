import { FC } from "react";
import { Route, Switch } from "react-router";
import { CurrGuildQuery } from "../../../generated/graphql";
import { Logs } from "./Logs";
import { Settings } from "./Settings";
import { StreamerRanking } from "./StreamerRanking";
import { Summary } from "./Summary";

interface Props {
  guildData: CurrGuildQuery | undefined;
}

export const Main: FC<Props> = ({ guildData }) => (
  <>
    <Switch>
      <Route exact path="/dashboard/:id" component={() => <Summary count={guildData?.currGuild!.userCount} />} />
      <Route path="/dashboard/:id/summary" component={() => <Summary count={guildData?.currGuild!.userCount} />} />
      <Route path="/dashboard/:id/settings" component={Settings} />
      <Route path="/dashboard/:id/logs" component={Logs} />
      <Route path="/dashboard/:id/streamerranking" component={StreamerRanking} />
    </Switch>
  </>
);
