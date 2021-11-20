import { Link } from "react-router-dom";
import { UsagePerDayChart } from "../charts/UsagePerDayChart";
import { MenuBar } from "../components/MenuBar";
import { DataSet } from "../context/DataContext";
import AverageList from "../widgets/AverageList";

export const ConsumptionPage = ({
  data,
  getTotalUsageByDeiceData,
  getTotalConsumption,
  monthData,
  monthlyAverages,
}: {
  data: DataSet;
  getTotalUsageByDeiceData: any;
  getTotalConsumption: any;
  monthData: any;
  monthlyAverages: any;
}) => {
  return (
    <>
      <MenuBar />
      <div className="app">
        <UsagePerDayChart data={monthData} />
        <AverageList
          monthlySpend={getTotalUsageByDeiceData}
          averageSpend={monthlyAverages}
          totalSpend={getTotalConsumption}
          peopleCount={parseFloat(data.houses[0].apartments[0].people)}
        />
        <Link to="/flowless">Back</Link>
      </div>
    </>
  );
};
