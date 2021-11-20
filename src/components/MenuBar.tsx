import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Button,
} from "@chakra-ui/react";

import {
  BellIcon,
  CloseIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { mediumGrayColor } from "../theme/colors";

export const MenuBar = () => {
  return (
    <Box bg={mediumGrayColor} w="100%" p={4} color="white">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList bg="gray">
          <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
          <MenuItem icon={<CloseIcon />}>Log Out</MenuItem>
        </MenuList>
        <Button bg="red" width="40px">
          <BellIcon />
        </Button>
        FlOwless
      </Menu>
    </Box>
  );
};
