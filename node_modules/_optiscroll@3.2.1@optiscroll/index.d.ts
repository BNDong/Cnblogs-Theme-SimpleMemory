declare function optiscroll(element: Element, options: optiscroll.OptiscrollOptions): optiscroll.Instance;

declare namespace optiscroll {

  class Instance {
    constructor(element: Element, options: OptiscrollOptions)

    init(): void;

    bind(): void;

    update(): void;

    scrollTo(destX: number, destY: number, duration: number): void;

    animateScroll(startX: number, endX: number, startY: number, endY: number, duration: number): void;

    scrollIntoView(elem: Element, duration: number, delta: number): void;

    destroy(): void;

    fireCustomEvent(eventName: string): void;
  }

  interface OptiscrollOptions {
    preventParentScroll?: boolean;
    forceScrollbars?: boolean;
    scrollStopDelay?: number;
    maxTrackSize?: number;
    minTrackSize?: number;
    draggableTracks?: boolean;
    autoUpdate?: boolean;
    classPrefix?: string;
    wrapContent?: boolean;
    rtl?: boolean;
  }

  interface GlobalSettings {
    scrollMinUpdateInterval: number;
    checkFrequency: number;
    pauseCheck: boolean;
  }

  const defaults: OptiscrollOptions;

  const globalSettings: GlobalSettings;
}

export = optiscroll;
