import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { Menu, MenuButton } from "@chakra-ui/menu";
import { FC } from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

interface Props {
  url: string;
  icon: IconType;
  p: string;
}

export const SideItem: FC<Props> = ({ url, icon, p }) => (
  <Flex f="1">
    <Menu>
      <NavLink className="nav-link" activeClassName="nav-active" to={url}>
        <MenuButton>
          <Flex alignItems="center">
            <Icon as={icon} boxSize={5} mr={1} />
            <Text>{p}</Text>
          </Flex>
        </MenuButton>
      </NavLink>
    </Menu>
  </Flex>
);
