/* eslint-disable react-refresh/only-export-components */
import classNames from "classnames";
import classes from "./Popup.module.css";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { BsX } from "react-icons/bs";

/**
 * Types definition
 */

export interface popupDef {
  header: React.JSX.Element;
  body: React.JSX.Element;
  footer: React.JSX.Element;
}

interface popupDefControled extends popupDef {
  isInDom: boolean;
  isOpened: boolean;
}

/**
 * Create static context
 */

const initialState: {
  popupDefControled: popupDefControled;
  setPopupDefControled: Dispatch<SetStateAction<popupDefControled>>;
} = {
  popupDefControled: {
    header: <h1>Header</h1>,
    body: <div>Body</div>,
    footer: <h4>Footer</h4>,
    isInDom: false,
    isOpened: false,
  },
  setPopupDefControled: () => {},
};
const PopupContext = createContext<typeof initialState | null>(null);

/**
 * Popup component
 */

function Popup(props: { popupDefControled: popupDefControled }) {
  const popupContext = useContext(PopupContext);
  function closePopup() {
    popupContext?.setPopupDefControled({
      ...popupContext.popupDefControled,
      isOpened: false,
    });
    setTimeout(() => {
      popupContext?.setPopupDefControled({
        ...popupContext.popupDefControled,
        isInDom: false,
      });
    }, 500);
  }

  return (
    <div
      className={classNames(classes.popupContainer, {
        [classes.isOpened]: props.popupDefControled.isOpened,
      })}
    >
      <div className={classes.headerContainer}>
        {props.popupDefControled.header}
        <BsX
          size={75}
          fill="white"
          color="white"
          className={classes.closeButton}
          onClick={closePopup}
        />
      </div>
      <div className={classes.bodyContainer}>
        {props.popupDefControled.body}
      </div>
      <div className={classes.footerContainer}>
        {props.popupDefControled.footer}
      </div>
    </div>
  );
}

/**
 * Provider: wrap app with it
 */

export function PopupContextProvider(props: { children: React.ReactNode }) {
  // create state
  const [popupDefControled, setPopupDefControled] = useState<popupDefControled>(
    initialState.popupDefControled
  );

  // create context provider
  return (
    <PopupContext.Provider value={{ popupDefControled, setPopupDefControled }}>
      {popupDefControled.isInDom && (
        <Popup popupDefControled={popupDefControled} />
      )}
      <div
        className={classNames({
          [classes.overlayDisabled]: popupDefControled.isInDom,
        })}
      >
        {props.children}
      </div>
    </PopupContext.Provider>
  );
}

/**
 * Custom hook: functions to control popup
 */

export function usePopup() {
  const popupContext = useContext(PopupContext);
  if (popupContext == null) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  const openPopup = (popupDef: popupDef): void => {
    popupContext.setPopupDefControled({
      ...popupDef,
      isInDom: true,
      isOpened: false,
    });
    setTimeout(() => {
      popupContext.setPopupDefControled({
        ...popupDef,
        isInDom: true,
        isOpened: true,
      });
    }, 0);
  };
  return { openPopup };
}
