import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    if (!config.plugins) {
      config.plugins = [];
    }
    
    config.plugins.push(
      svgr({
        svgrOptions: {
          icon: true,
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      })
    );

    // Ensure SVG files are handled as assets
    config.assetsInclude = Array.isArray(config.assetsInclude) 
      ? [...config.assetsInclude, '**/*.svg']
      : ['**/*.svg'];

    if (config.server) {
      config.server.host = true;
      config.server.allowedHosts = ['f84c-2800-e6-1010-664-c86-3ce3-e348-43a8.ngrok-free.app'];
    }

    return config;
  }
};

export default config;