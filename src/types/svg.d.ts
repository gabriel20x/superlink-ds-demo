/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
  import React from 'react';
  const Component: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  export default Component;
} 