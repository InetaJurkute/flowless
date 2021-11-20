import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/layout";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { GithubContributionsChart } from "../charts/GithubContributionsChart";
import { GoalSetter } from "../components/GoalSetter";
import { WaterIcon } from "../components/icons/WaterIcon";
import { MenuBar } from "../components/MenuBar";
import { DataSet } from "../context/DataContext";
import GoalContext from "../context/GoalContext";
import { blueColor, mediumGrayColor } from "../theme/colors";
import { AppliancePie } from "../charts/AppliancePie";
import { SpendCard } from "../widgets/SpendCard";
import { EnergyIcon } from "../components/icons/EnergyIcon";
import { MoneyIcon } from "../components/icons/MoneyIcon";
import { ChallengeIcon } from "../components/icons/ChallengeIcon";

export const Dashboard = ({
  data,
  getTotalUsageByDeiceData,
  getTotalPowerConsumption,
  getTotalConsumption,
}: {
  data: DataSet;
  getTotalUsageByDeiceData: any;
  getTotalPowerConsumption: any;
  getTotalConsumption: any;
}) => {
  const { litersGoal, powerGoal, moneyGoal } = useContext(GoalContext);
  const navigate = useNavigate();
  return (
    <>
      <MenuBar />
      <div className="app">
        {/* До́брый ве́чер ( ͡° ͜ʖ ͡°) */}
        <Heading textAlign="left" as="h1" size="xl" marginBottom="32px">
          Dashboard
        </Heading>
        <div className="dashboard-wrapper">
          <div className="flex-bigger">
            {/* <TotalUsageByDeviceChart data={getTotalUsageByDeiceData} /> */}
            <AppliancePie data={getTotalUsageByDeiceData} />
            <GithubContributionsChart data={data} />
          </div>
          <div className="flex-small">
            <Grid
              gap={4}
              templateRows="repeat(6, 1fr)"
              templateColumns="repeat(2, 1fr)"
            >
              <GridItem colStart={2} colEnd={2} rowStart={1} rowEnd={4}>
                <Flex
                  height="100%"
                  justifyContent="space-between"
                  boxShadow="base"
                  flexDirection="column"
                  borderRadius="lg"
                  bg={mediumGrayColor}
                  color={blueColor}
                  padding="16px"
                >
                  <Box>
                    <Heading
                      as="h2"
                      fontSize={{ base: "sm", md: "md" }}
                      margin="16px 0"
                    >
                      Set your consumption goals
                    </Heading>
                  </Box>
                  <GoalSetter data={data} />
                </Flex>
              </GridItem>

              <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={5}>
                <SpendCard
                  icon={<WaterIcon />}
                  title="Water Consumption"
                  amount={getTotalConsumption}
                  measurementUnit="liters"
                  goalAmount={Number(litersGoal)}
                  bgColor={mediumGrayColor}
                  textColor={blueColor}
                  onClick={() => navigate("/flowless/consumption")}
                />
              </GridItem>
              <GridItem colStart={2} colEnd={3} rowStart={4} rowEnd={7}>
                <SpendCard
                  icon={<EnergyIcon />}
                  title="Energy and Sustainability"
                  amount={getTotalPowerConsumption}
                  measurementUnit="kWh"
                  goalAmount={Number(powerGoal)}
                  bgColor={mediumGrayColor}
                  textColor={blueColor}
                  onClick={() => navigate("/flowless/power")}
                />
              </GridItem>
              <GridItem colStart={1} colEnd={2} rowStart={5} rowEnd={9}>
                <SpendCard
                  icon={<MoneyIcon />}
                  title="Spend"
                  amount={22}
                  measurementUnit="EUR"
                  goalAmount={Number(moneyGoal)}
                  bgColor={mediumGrayColor}
                  textColor={blueColor}
                  onClick={() => navigate("/flowless/spend")}
                />
              </GridItem>
              <GridItem colStart={2} colEnd={3} rowStart={7} rowEnd={9}>
                <SpendCard
                  icon={<ChallengeIcon />}
                  title="Challenges"
                  amount={getTotalConsumption}
                  measurementUnit="liters"
                  goalAmount={120}
                  bgColor={mediumGrayColor}
                  textColor={blueColor}
                  hideContent={true}
                  onClick={() => navigate("/flowless/challenges")}
                />
              </GridItem>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};
