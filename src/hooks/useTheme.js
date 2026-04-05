import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme, setTheme } from "../../../Zorvyn-task/src/store/slices/uiSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      body.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      body.classList.add("light");
    }
  }, [isDark]);

  return {
    theme,
    isDark,
    toggle: () => dispatch(toggleTheme()),
    set: (t) => dispatch(setTheme(t)),
  };
};

// Utility: return conditional class based on theme
export const useThemeClass = () => {
  const { isDark } = useTheme();
  return (darkClass, lightClass) => (isDark ? darkClass : lightClass);
};
