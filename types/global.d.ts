// Ambient types for the small amount of imperative DOM work the app does.

declare global {
  interface Window {
    // Guard flag set by Scripts.tsx so the Elementor bundle is injected once.
    __soulSurferScriptsLoaded?: boolean;
  }
}

export {};
