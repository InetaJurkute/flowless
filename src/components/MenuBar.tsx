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
            borderRadius="50%"
            boxSize="40px"
            marginRight="16px"
            src="data:image/jpeg;base64,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"
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
