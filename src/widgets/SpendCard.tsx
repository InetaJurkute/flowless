import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import { useContext } from "react";
import GoalContext from "../context/GoalContext";

interface SpendCardProps {
  amount: number;
}

export const SpendCard = ({ amount }: SpendCardProps) => {
  const { litersGoal } = useContext(GoalContext);
  return (
    <Flex maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="4" bg="red.400">
        <Heading as="h3" size="lg" display="inline">
          {amount} L
        </Heading>
        <Text display="inline" fontSize="sm">
          {" "}
          spent this month
        </Text>
      </Box>
      <Spacer />
      <Box p="4" bg="green.400">
        <Heading as="h3" size="lg">
          {litersGoal ? <>Under {litersGoal}L</> : <>No goal set</>}
        </Heading>
        {litersGoal && <Text fontSize="sm"> which is your set goal</Text>}
      </Box>
    </Flex>
  );
};
