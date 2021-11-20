import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Box,
    Button,
  } from "@chakra-ui/react"

import { BellIcon, CloseIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'

export const MenuBar = () => {
return (<div>
    <Box bg="gray" w="100%" p={4} color="white" rounded="md">
    <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<HamburgerIcon />}
      variant="outline"
    />
    <MenuList bg="gray">
      <MenuItem icon={<SettingsIcon />}>
        Settings
      </MenuItem>
      <MenuItem icon={<CloseIcon />}>
        Log Out
      </MenuItem>
    </MenuList>
    <Button bg="red">
        <BellIcon/>
    </Button>
    FlOwless
  </Menu>
  </Box></div>)
};