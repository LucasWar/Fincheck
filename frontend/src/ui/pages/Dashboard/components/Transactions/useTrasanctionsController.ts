import { useDashboardContext } from "../DashboardContext/useDashboardContext";

export function useTrasanctionsController() {
  const { arevaluesVisible } = useDashboardContext()

  return {
    arevaluesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
  }
}