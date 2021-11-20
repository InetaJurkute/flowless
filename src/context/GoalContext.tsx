import { createContext } from "react";

const GoalContext = createContext({
  litersGoal: localStorage.getItem("Liters"),
  setLitersGoal: (goal: string) => {
    console.log(goal);
  },
  moneyGoal: localStorage.getItem("Money"),
  setMoneyGoal: (goal: string) => {
    console.log(goal);
  },
  powerGoal: localStorage.getItem("Power"),
  setPowerGoal: (goal: string) => {
    console.log(goal);
  },
});

export default GoalContext;
