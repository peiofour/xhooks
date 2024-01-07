import * as React from "react";

declare module "@peiofour/xhooks" {
  export function useWindowSize(): { width: number; height: number };
  export function useWindowScroll(): { scrollX: number; scrollY: number };
  export function useDarkMode(): [
    toggle: () => void,
    enable: () => void,
    disable: () => void,
    isDarkMode: boolean
  ];
  export function useCopyToClipboard(
    timeout?: number
  ): [copyToClipboard: (text: string) => void, isCopied: boolean];
  export function useGeolocation(): {
    loading: boolean;
    error: GeolocationPositionError | ErrorConstructor | null;
    data: GeolocationPosition | null;
  };
  export function useMousePosition(): {
    x: number;
    y: number;
  };
  export function useLocalStorage(
    key: string,
    initialValue?: any
  ): [value: any, setValue: (value: any) => void];
  export function useSessionStorage(
    key: string,
    initialValue?: any
  ): [value: any, setValue: (value: any) => void];
  export function useBoolean(
    initialValue?: boolean
  ): [
    value: boolean,
    setValue: (value: boolean) => void,
    setTrue: () => void,
    setFalse: () => void,
    toggle: () => void
  ];
  export function useClickAway<refElement>(
    ref: React.RefObject<refElement>,
    callback: () => void
  ): void;
  export function useClickAnywhere(callback: () => void): void;
}
