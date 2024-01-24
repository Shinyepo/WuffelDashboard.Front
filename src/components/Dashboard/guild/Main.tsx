import { FC } from "react";
import { CurrGuildQuery } from "../../../generated/graphql";
import { Logs } from "./Logs";
import { Moderation } from "./Moderation";
import { Settings } from "./Settings";
import { StreamerRanking } from "./StreamerRanking";
import { Summary } from "./Summary";
import { Route, Routes } from "react-router-dom";

interface Props {
  guildData: CurrGuildQuery;
}

export const Main: FC<Props> = ({ guildData }) => (
  <>
    <Routes>
      <Route
        path=""
        element={<Summary count={guildData?.currGuild!.userCount} />}
      />
      <Route
        path="summary"
        element={<Summary count={guildData?.currGuild!.userCount} />}
      />
      <Route
        path="settings"
        element={<Settings settings={guildData} />}
      />
      <Route path="logs" element={<Logs />} />
      <Route path="moderation" element={<Moderation />} />
      <Route
        path="streamerranking"
        element={<StreamerRanking />}
      />
    </Routes>
  </>
);
