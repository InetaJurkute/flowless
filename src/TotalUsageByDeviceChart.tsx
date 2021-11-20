import { Heading } from "@chakra-ui/layout";
import { ResponsiveRadar } from "@nivo/radar";
import { flowless } from "./charts/theme";
import { Appliance } from "./context/DataContext";

interface TotalUsageByDeviceChartProps {
  data: {
    device: Appliance;
    total: number;
  }[];
}

export const TotalUsageByDeviceChart = ({
  data,
}: TotalUsageByDeviceChartProps) => {
  return (
    <div className="responsive-chart-wrapper">
      <Heading as="h5" size="sm">
        Total Consumption For Current Month
      </Heading>

      <ResponsiveRadar
        data={data}
        keys={["total"]}
        indexBy="device"
        valueFormat=">-.2f"
        margin={{ top: 60, right: 80, bottom: 120, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={24}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        motionConfig="wobbly"
        enableDotLabel={true}
        theme={flowless}
      />
    </div>
  );
};
