import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

import {
  BellIcon,
  CloseIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { blueColor, mediumGrayColor } from "../theme/colors";

import { Image } from "@chakra-ui/image";

import logo from "../logo.png";

export const MenuBar = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg={mediumGrayColor}
      w="100%"
      p={4}
      color={blueColor}
      boxShadow="md"
    >
      <Flex alignItems="center" justifyContent="space-between">
        {/* <Box
          borderRadius="50%"
          backgroundColor={blueColor}
          height="40px"
          width="40px"
          marginRight="16px"
        /> */}
        <Box>
          <Image
            padding="8px"
            backgroundColor={blueColor}
            borderRadius="50%"
            boxSize="40px"
            marginRight="16px"
            src={logo}
            alt="logo"
          />
        </Box>
        <Text fontSize="lg" fontWeight="bold">
          Flowless
        </Text>
      </Flex>
      <Box>
        <Button bg="transparent" width="40px" marginRight="8px">
          <BellIcon width="24px" height="24px" />
        </Button>
        <Menu>
          <MenuButton
            bg="white"
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList boxShadow="lg" color={blueColor}>
            <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
            <MenuItem icon={<CloseIcon />}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
