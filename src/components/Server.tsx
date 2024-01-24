import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { WrapItem } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import "../styles/server.css";

interface Props {
  icon?: string | null;
  name: string;
  id: string;
  inGuild?: boolean | null;
}

export const Server: FC<Props> = ({ icon, name, id, inGuild }) => {
  return (
    <WrapItem justifyContent="center" margin="10px 0" padding=" 0 2px">
      <Tooltip label={name} placement="right" className="linkWrapper">
        <NavLink style={{}} to={`/dashboard/${id}`}>
          <Avatar src={`https://cdn.discordapp.com/icons/${id}/${icon}.png`} name={name}>
            <AvatarBadge boxSize="1.25em" bg={inGuild === true ? "green.500" : "red.500"} />
          </Avatar>
        </NavLink>
      </Tooltip>
    </WrapItem>
  );
};
