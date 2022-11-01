import { Flex } from "@chakra-ui/layout";
import { FC } from "react";
import { CurrGuildQuery } from "../../../generated/graphql";
import { MainSwitch } from "./components/MainSwitch";

interface Props {
  settings: CurrGuildQuery | undefined | null;
}

export const Settings: FC<Props> = ({ settings }) => {
  return (
    <>
      <Flex flex={1} direction="row" m="60px">
        <MainSwitch activeStatus={settings!.currGuild!.active} />
      </Flex>
    </>
  );
};
