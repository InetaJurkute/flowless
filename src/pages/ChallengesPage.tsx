import { useState } from "react";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { ChallengeCard } from "../widgets/ChallengeCard";
import { Link } from "react-router-dom";

export const ChallengesPage = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(
    null
  );

  interface challengeList {
    [index: string]: {
      id: string;
      title: string;
      desc: string;
      progress: string;
      nonStarted: boolean;
    };
  }

  const yourChallenges: challengeList = {
    "id-1": {
      id: "id-1",
      title: "Every Drop Counts",
      desc: "Make every single drop count! Use 100 ml less water today in order to successfully pass this challenge.",
      progress: "Not started",
      nonStarted: true,
    },
    "id-2": {
      id: "id-2",
      title: "Winter Is Coming",
      desc: "The colder the shower, the less energy is wasted. Use 0.1 kWh less today in order to successfully pass this challenge.",
      progress: "complete",
      nonStarted: false,
    },
  };

  const dailyChallenges: challengeList = {
    "id-3": {
      id: "id-3",
      title: "Every Drop Counts",
      desc: "Make every single drop count! Use 100 ml less water today in order to successfully pass this challenge.",
      progress: "1 out of 10",
      nonStarted: true,
    },
    "id-4": {
      id: "id-4",
      title: "Winter Is Coming",
      desc: "The colder the shower, the less energy is wasted. Use 0.1 kWh less today in order to successfully pass this challenge.",
      progress: "1 out of 10",
      nonStarted: false,
    },
  };

  const monthlyChallenges: challengeList = {
    "id-6": {
      id: "id-6",
      title: "Every Tub Counts",
      desc: "You should try fast showers instead of long baths! Use 200 litres less this month in order to pass this challenge.",
      progress: "1 out of 10",
      nonStarted: false,
    },
  };

  const allChallenges = {
    ...yourChallenges,
    ...dailyChallenges,
    ...monthlyChallenges,
  };

  const mapChallenges = (list: challengeList) => {
    return Object.values(list).map((x) => (
      <ChallengeCard
        onClick={() => setSelectedChallenge(x.id)}
        title={x.title}
        subtext={x.progress}
      />
    ));
  };

  return (
    <>
      <Heading>Your Challenges</Heading>
      <Stack spacing={8}>{mapChallenges(yourChallenges)}</Stack>
      <Heading>All Challenges</Heading>
      <Heading as="h3" size="lg">
        Daily
      </Heading>
      <Stack spacing={8}>{mapChallenges(dailyChallenges)}</Stack>
      <Heading as="h3" size="lg">
        Monthly
      </Heading>
      <Stack spacing={8}>{mapChallenges(monthlyChallenges)}</Stack>
      <Link to="/flowless">Back</Link>

      <Modal
        isOpen={Boolean(selectedChallenge)}
        onClose={() => setSelectedChallenge(null)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedChallenge && allChallenges[selectedChallenge].title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {selectedChallenge && allChallenges[selectedChallenge].desc}
            </Text>
            <Text>
              {selectedChallenge && allChallenges[selectedChallenge].progress}
            </Text>
            {selectedChallenge &&
              allChallenges[selectedChallenge].nonStarted && (
                <Button colorScheme="green">Start</Button>
              )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setSelectedChallenge(null)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
