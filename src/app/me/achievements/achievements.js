"use client";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil, Filter, Loader2 } from "lucide-react";
import { LifeIndexContext } from "../lifeIndexContext";
import { useState, useEffect, useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AchievementsDialog from "./components/achievementsDialog";

const Achievements = () => {
  const { habits, achievements } = useContext(LifeIndexContext); //  1 - All data
  const [filteredData, setFilteredData] = useState([]); //           2 - The data that is filtered by the habit selector
  const [visualizationData, setVisualizationData] = useState([]); // 3 - The data that is used for the visualization
  const [selectedHabit, setSelectedHabit] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (selectedHabit == "all") {
      setFilteredData(achievements);
    } else {
      const filtered = achievements.filter(
        (item) => item.habit == selectedHabit
      );
      setFilteredData(filtered);
    }
    setLoading(false);
  }, [selectedHabit, achievements]);

  useEffect(() => {
    if (filteredData.length > 0) {
      const transformedData = filteredData.map((item) => ({
        id: item.id,
        created_at: item.created_at.split("T")[0],
        points: item.points,
        habit_name: item.habit_name,
      }));
      const reducedData = transformedData.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.created_at == item.created_at);
        if (existingItem) {
          existingItem.points += item.points;
          existingItem.habits.push(item.habit_name);
        } else {
          item.habits = [item.habit_name];
          acc.push(item);
        }
        return acc;
      }, []);
      const sortedData = reducedData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      // Find earliest date in the sortedData
      const earliestDate = new Date(sortedData[0].created_at);

      // Get today's date
      const today = new Date();

      // Generate an array of all dates from earliestDate to today
      const allDates = [];
      for (
        let d = new Date(earliestDate);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        allDates.push(new Date(d));
      }

      // Merge the sortedData with the allDates array, filling in missing data with zeroes
      const completeData = allDates.map((date) => {
        const existingData = sortedData.find(
          (item) => new Date(item.created_at).getTime() === date.getTime()
        );
        return existingData
          ? existingData
          : {
              id: null,
              created_at: date.toISOString().split("T")[0],
              points: 0,
              habits: [],
            };
      });

      setVisualizationData(completeData);
    }
  }, [filteredData]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
          Achievement Tracking
        </h4>

        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-fit">
              <Select
                onValueChange={setSelectedHabit}
                defaultValue={selectedHabit}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a habit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    {habits.length > 0 &&
                      habits.map((habit, index) => (
                        <SelectItem key={index} value={habit.id}>
                          {habit.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AchievementsDialog achievements={achievements} />
          </AlertDialog>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        </div>
      )}
      {!loading && (
        <>
          {achievements.length == 0 && <div>No achievements yet</div>}
          {achievements.length > 0 && (
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart width={400} height={400} data={visualizationData}>
                  <XAxis dataKey="created_at" interval="preserveStartEnd" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="points"
                    fill=""
                    stackId={1}
                    stroke=""
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md space-y-2">
        <p className="font-semibold">
          <span className="mr-2 p-2 rounded-lg bg-secondary">
            {payload[0].value} points
          </span>
          {label}
        </p>
        <ul className="list-disc list-inside">
          {payload[0].payload.habits.map((habit, index) => (
            <li key={index} className="text-sm">
              {habit}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default Achievements;
