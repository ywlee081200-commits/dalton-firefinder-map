import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.308384cd59b94f7cac454c70d4ece3c5',
  appName: 'dalton-firefinder-map',
  webDir: 'dist',
  server: {
    url: 'https://308384cd-59b9-4f7c-ac45-4c70d4ece3c5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;