import * as React from "react";

declare module "@peiofour/xhooks" {
  export function useWindowSize(): { width: number; height: number };
  export function useWindowScroll(): { scrollX: number; scrollY: number };
  export function useDarkMode(): {
    toogle: () => void;
    enabled: () => void;
    disabled: () => void;
    isDarkMode: boolean;
  };
  export function useCopyToClipboard(timeout?: number): {
    copyToClipboard: (text: string) => void;
    isCopied: boolean;
  };
  export function useGeolocation(): {
    loading: boolean;
    error: GeolocationPositionError | ErrorConstructor | null;
    data: GeolocationPosition | null;
  };
}
