import { createContext } from "react";

const GoalContext = createContext({
  litersGoal: localStorage.getItem("Liters"),
  setLitersGoal: (goal: string) => {
    console.log(goal);
  },
  moneyGoal: localStorage.getItem("Liters"),
  setMoneyGoal: (goal: string) => {
    console.log(goal);
  },
});

export default GoalContext;
