/* eslint-disable react-refresh/only-export-components */

/**
 * Types definition
 */

import { createContext, useContext, useState } from "react";

type flags = {
  hasAutoComplete: boolean;
  hasAccordion: boolean;
  hasPopup: boolean;
  hasDarkMode: boolean;
  hasTicTacToe: boolean;
  hasScrollIndicator: boolean;
};

/**
 * Create static context
 */

const initialState = {
  flags: {
    hasAutoComplete: true,
    hasAccordion: true,
    hasPopup: true,
    hasDarkMode: true,
    hasTicTacToe: true,
    hasScrollIndicator: true,
  },
  setFlags: (_flags: flags): void => {},
};
const FeatureFlagsContext = createContext<typeof initialState | null>(null);

/**
 * Context provider
 */

export function FeatureFlagsContextProvider(props: {
  children: React.ReactNode;
}) {
  const [flags, setFlags] = useState<flags>(initialState.flags);

  return (
    <FeatureFlagsContext.Provider value={{ flags, setFlags }}>
      {props.children}
    </FeatureFlagsContext.Provider>
  );
}

/**
 * Custom hook
 */

export function useFeatureFlagsContext() {
  const themeContext = useContext(FeatureFlagsContext);
  if (themeContext == null) {
    throw new Error(
      "useFeatureFlagsContext must be used within a ThemeProvider"
    );
  }
  return themeContext;
}
