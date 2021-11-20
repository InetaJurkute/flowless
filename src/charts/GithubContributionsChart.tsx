import { ResponsiveCalendar } from "@nivo/calendar";
import { useMemo } from "react";
import {
    DataSet,
    Measurement,
} from "../context/DataContext";

export const GithubContributionsChart = ({ data }: { data: DataSet }) => {
    const dataForChart = useMemo(() => {
        const dateMap: { [index: string]: number } = {}

        const processMeasurements = (x: Measurement) => {
            const key = x.TimeStamp.substring(0, 10)
            const value = dateMap[key]
            if (value) {
                dateMap[key] = value + parseFloat(x.Consumption)
            } else {
                dateMap[key] = parseFloat(x.Consumption)
            }
        }

        data.houses[0].apartments[0].Dishwasher.measurements.forEach(processMeasurements)
        data.houses[0].apartments[0].Kitchen_optima_faucet.measurements.forEach(processMeasurements)
        data.houses[0].apartments[0].Optima_faucet.measurements.forEach(processMeasurements)
        data.houses[0].apartments[0].Washing_machine.measurements.forEach(processMeasurements)
        data.houses[0].apartments[0].Hydractiva_shower.measurements.forEach(processMeasurements)

        return Object.entries(dateMap).map((kv) => ({ day: kv[0], value: kv[1] }))
    }, [data]);

    return (
        <div className="responsive-chart-wrapper">
            <h3>Consumptions by Day in 2020</h3>
            <ResponsiveCalendar
                data={dataForChart}
                from="2020-01-01"
                to="2020-12-31"
                emptyColor="#eeeeee"
                colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                minValue={0}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            />
        </div>
    );
};
