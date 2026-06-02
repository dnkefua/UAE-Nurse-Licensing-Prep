import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ndnanalytics.uaenurseprep',
  appName: 'UAE Nurse Prep',
  webDir: 'dist',
  server: {
    // Load from Firebase Hosting so the WebView is on the same HTTPS origin
    // as the app. signInWithRedirect then navigates *within* the WebView
    // (not to a separate system browser), so Google OAuth redirects back
    // cleanly — no Play App Signing SHA-1 required.
    url: 'https://uae-nurse-licensing-prep-feb76.web.app',
    cleartext: false,
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0a1526',
      showSpinner: false
    }
  }
};

export default config;
