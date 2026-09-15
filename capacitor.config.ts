import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ndnanalytics.uaenurseprep',
  appName: 'UAE Nurse Prep',
  webDir: 'dist',
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com']
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0a1526',
      showSpinner: false
    }
  }
};

export default config;
