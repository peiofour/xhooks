import * as React from "react";

/**
 * A simple hook that returns a boolean value and its setters. It's useful for managing boolean states. 
 * @param {boolean} initialValue The initial value of the boolean state
 * @returns {[boolean, (value: boolean) => void, () => void, () => void, () => void]} 
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const setTrue = React.useCallback(() => setValue(true), []);
  const setFalse = React.useCallback(() => setValue(false), []);
  const toggle = React.useCallback(() => setValue((v) => !v), []);

  return [value, setValue, setTrue, setFalse, toggle];
}

/**
 * A hook that fires a callback when the user clicks anywhere on the document
 * @param {() => void} callback The callback to fire
 */
export function useClickAnywhere(callback) {
  React.useEffect(() => {
    const handler = (e) => {
      callback();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

/**
 * A hook that fires a callback when the user clicks outside of the given ref element
 * @param {React.MutableRefObject} ref The ref element
 * @param {() => void} callback The callback to fire
 */
export function useClickAway(ref, callback) {
  React.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

/**
 *
 * A hook that copies the text to the clipboard and sets the isCopied state to true for a given timeout
 * @param {number} timeout The timeout of the isCopied state in ms
 * @returns {[(text: string) => void, boolean]} A tuple containing the copyToClipboard function and the isCopied state
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
 * A hook that manages the state of the dark mode
 * @returns {[() => void, () => void, () => void, boolean]} A tuple containing the toogle, enable, disable and isDarkMode state
 */
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const toogle = React.useCallback(() => setIsDarkMode((v) => !v), []);
  const enable = React.useCallback(() => setIsDarkMode(true), []);
  const disable = React.useCallback(() => setIsDarkMode(false), []);

  React.useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(isDarkMode);
  }, []);

  return [toogle, enable, disable, isDarkMode];
}

/**
 * A hook that returns the current location
 * @returns {{loading: boolean, error: GeolocationPositionError | ErrorConstructor | null, data: GeolocationPosition | null}} The current location
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

/**
 * A hook that returns the current value of the local storage
 * @template TValue The type of the local storage
 * @param {string} key The key of the local storage
 * @param {TValue} initialValue The initial value of the local storage
 * @returns {[TValue, (value: TValue) => void]}
 */

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

/**
 * A hook that takes in a media query string and utilizes the matchMedia API to check whether it corresponds to the present document.
 * @param {string} query The media query
 * @returns {boolean} The current value of the media query
 */

export function useMediaQuery(query) {
  const [isMatch, setIsMatch] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setIsMatch(mediaQuery.matches);
    const handler = (e) => setIsMatch(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isMatch;
}

/**
 * A hook that returns the current value of the mouse position
 * @returns {{x: number, y: number}} The current value of the mouse position
 */

export function useMousePosition() {
  const [position, setPosition] = React.useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  React.useEffect(() => {
    const handler = (e) =>
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return position;
}

/**
 * A hook that returns the previous value of the given value
 * @template TValue The type of the value
 * @param {TValue} value The value
 * @returns {TValue} The previous value of the given value
 */
export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * A hook that returns the current value of the session storage
 * @template TValue The type of the session storage
 * @param {string} key The key of the session storage
 * @param {TValue} initialValue The initial value of the session storage
 * @returns {[TValue, (value: TValue) => void]}
 */

export function useSessionStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  React.useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

/**
 * A hook that returns the current value of the window scroll
 * @returns {{scrollX: number, scrollY: number}} The current value of the window scroll
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
 * A hook that returns the current value of the window size
 * @returns {{width: number, height: number}} The current value of the window size
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
 * A hook that fires a callback when the window resizes
 * @param {() => void} callback The callback to fire
 */

export function useWindowResize(callback) {
  React.useEffect(() => {
    const handler = () => callback();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
}

