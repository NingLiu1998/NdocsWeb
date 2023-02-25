import { Config } from './config';
import { inject, provide } from 'vue';

export default {
  install(app: any) {
    provide('config', Config);
  },
};

export function useConfig() {
  const config = inject('config');
  if (!config) {
    throw new Error('useConfig() must be used inside a component wrapped with the ConfigProvider.');
  }
  return config;
}
