import { useContext } from "react";
import { DashboardContext } from "./dashboardContext";

export function useDashboardContext(){
  return useContext(DashboardContext)
}