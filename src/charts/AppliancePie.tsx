import { ResponsivePie } from '@nivo/pie'
import { useMemo } from 'react';
import { Heading } from "@chakra-ui/layout";

import { flowless } from "./theme";
import { Appliance } from "../context/DataContext";

interface AppliancePieProps {
    data: {
        device: Appliance;
        total: number;
    }[];
}

export const AppliancePie = ({
    data,
}: AppliancePieProps) => {
    const colorMap = {
        [Appliance.Dishwasher]: "hsl(220, 70%, 50%)",
        [Appliance.Faucet]: "hsl(1, 70%, 50%)",
        [Appliance.KitchenFaucet]: "hsl(194, 70%, 50%)",
        [Appliance.Shower]: "hsl(284, 70%, 50%)",
        [Appliance.WashingMachine]: "hsl(156, 70%, 50%)",
    }

    const pieData = useMemo(() => {
        return data.map(x => ({
            id: x.device,
            label: x.device,
            value: Math.floor(x.total),
            color: colorMap[x.device]
        }))
    }, [data.length])

    return (
        <div className="responsive-chart-wrapper">
            <Heading as="h5" size="sm">
                Your Water Consumption This Month
            </Heading>
            <ResponsivePie
                data={pieData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'nivo' }}
                theme={flowless}
                borderWidth={1}
                borderColor={{ from: "color" }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [["brighter", 2]] }}
                fill={[
                    {
                        match: {
                            id: Appliance.Dishwasher
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: Appliance.Faucet
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: Appliance.KitchenFaucet
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: Appliance.Shower
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: Appliance.WashingMachine
                        },
                        id: 'lines'
                    },
                ]}
            />
        </div>
    );
};
