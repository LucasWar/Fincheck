import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboardContext } from "../DashboardContext/useDashboardContext";

export function useAccountController() {
  const windowWidth = useWindowWidth()

  const {arevaluesVisible, toggleValueVIsiblility} = useDashboardContext()

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })


  return {
    windowWidth,
    sliderState,
    setSliderState,
    arevaluesVisible,
    toggleValueVIsiblility,
    isLoading: false,
    accounts: []
  }
}