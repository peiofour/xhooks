import * as React from "react";

/**
 * A hook that returns the current value of the window size
 */
export function useWindowSize() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handler = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
}

/**
 * A hook that returns the current value of the window scroll
 */
export function useWindowScroll() {
  const [scroll, setScroll] = React.useState({
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  });

  React.useEffect(() => {
    const handler = () =>
      setScroll({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return scroll;
}

/**
 * A hook that manages the state of the dark mode
 */
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const toogle = React.useCallback(() => setIsDarkMode((v) => !v), []);
  const enable = React.useCallback(() => setIsDarkMode(true), []);
  const disabled = React.useCallback(() => setIsDarkMode(false), []);

  React.useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(isDarkMode);
  }, []);

  return [toogle, enable, disabled, isDarkMode];
}

/**
 *
 * A hook that copies the text to the clipboard and sets the isCopied state to true for a given timeout
 * @param {number} timeout
 * @returns {[function, boolean]}
 */
export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = React.useCallback((text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  }, []);
  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), timeout);
    }
  }, [isCopied]);
  return [copyToClipboard, isCopied];
}

/**
 * A hook that returns the current location
 */
export function useGeolocation() {
  const [state, setState] = React.useState({
    loading: true,
    error: null,
    data: null,
  });

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: new Error("GEOLOCATION_NOT_SUPPORTED"),
        data: null,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          error: null,
          data: position,
        });
      },
      (error) => {
        setState({
          loading: false,
          error,
          data: null,
        });
      }
    );
  }, []);

  return state;
}
