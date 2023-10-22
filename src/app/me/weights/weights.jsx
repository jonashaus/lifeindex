"use client";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Pencil, Plus } from "lucide-react";
import { LifeIndexContext } from "../lifeIndexContext";
import { useState, useEffect, useContext } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import WeightsDialog from "./components/weightsDialog";
import { CreateWeightDialog } from "./components/weightsDialog";

const Weights = () => {
  const { weights } = useContext(LifeIndexContext); //  1 - All data
  const [visualizationData, setVisualizationData] = useState([]); // 2 - The data that is used for the visualization

  function interpolateWeights(data) {
    let result = [];

    for (let i = 0; i < data.length - 1; i++) {
      let start = data[i];
      let end = data[i + 1];

      // Parse the dates and get the difference in days
      let startDate = new Date(start.created_at);
      let endDate = new Date(end.created_at);
      let dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);

      // Calculate the weight change per day
      let weightChangePerDay = (end.weight - start.weight) / dayDifference;

      // Push the starting data point to the result
      result.push(start);

      // Interpolate and push the missing data points to the result
      for (let j = 1; j < dayDifference; j++) {
        let interpolatedDate = new Date(startDate);
        interpolatedDate.setDate(startDate.getDate() + j);
        let interpolatedWeight = start.weight + weightChangePerDay * j;

        result.push({
          created_at: `${interpolatedDate.getFullYear()}-${String(
            interpolatedDate.getMonth() + 1
          ).padStart(2, "0")}-${String(interpolatedDate.getDate()).padStart(
            2,
            "0"
          )}`,
          weight: parseFloat(interpolatedWeight.toFixed(1)),
          interpolated: true,
        });
      }
    }

    // Push the last data point to the result
    result.push(data[data.length - 1]);
    return result;
  }

  useEffect(() => {
    const getInterpolatedData = async () => {
      const transformedData = weights.map((item) => ({
        id: item.id,
        created_at: item.created_at.split("T")[0],
        weight: item.weight,
      }));

      // Sort the data by date
      const sortedData = transformedData.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });

      const interpolatedData = interpolateWeights(sortedData);
      setVisualizationData(interpolatedData);
    };
    if (weights.length > 0) {
      getInterpolatedData();
    }
  }, [weights]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
          Weight Tracking
        </h4>
        <div className="flex space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <CreateWeightDialog />
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <WeightsDialog weights={weights} />
          </AlertDialog>
        </div>
      </div>
      {weights.length == 0 && <div>No weights yet</div>}
      {weights.length > 0 && (
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={400} height={400} data={visualizationData}>
              <XAxis dataKey="created_at" interval="preserveStartEnd" />
              <YAxis type="number" domain={["dataMin", "dataMax"]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="weight" stroke="#666666" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="bg-white p-2 rounded-md">
        <p className="font-semibold my-1 ">
          <span className="mr-2 p-2 rounded-lg bg-secondary">
            {payload[0].value} kg
          </span>
          {label}
        </p>
        {payload[0].payload.interpolated && (
          <p className="text-xs text-gray-500">
            This data point is interpolated.
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default Weights;
