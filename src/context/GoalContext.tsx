import { createContext } from "react";

const GoalContext = createContext({
  goal: localStorage.getItem("Liters"),
  setGoal: (goal: string) => {
    console.log(goal);
  },
});

export default GoalContext;
