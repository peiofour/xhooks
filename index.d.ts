import * as React from "react";

declare module "@peiofour/xhooks" {
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
  export function useCopyToClipboard(
    timeout?: number
  ): [copyToClipboard: (text: string) => void, isCopied: boolean];
  export function useDarkMode(): [
    toggle: () => void,
    enable: () => void,
    disable: () => void,
    isDarkMode: boolean
  ];
  export function useGeolocation(): {
    loading: boolean;
    error: GeolocationPositionError | ErrorConstructor | null;
    data: GeolocationPosition | null;
  };
  export function useLocalStorage<TValue>(
    key: string,
    initialValue?: TValue
  ): [value: TValue, setValue: (value: TValue) => void];
  export function useMediaQuery(query: string): boolean;
  export function useMousePosition(): {
    x: number;
    y: number;
  };
  export function usePrevious<TValue>(value: TValue): TValue;
  export function useSessionStorage<TValue>(
    key: string,
    initialValue?: TValue
  ): [value: TValue, setValue: (value: TValue) => void];
  export function useWindowScroll(): { scrollX: number; scrollY: number };
  export function useWindowSize(): { width: number; height: number };
  export function useWindowResize(callback: () => void): void;
}
