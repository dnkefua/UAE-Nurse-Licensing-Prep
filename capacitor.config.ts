import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ndnanalytics.uaenurseprep',
  appName: 'UAE Nurse Prep',
  webDir: 'dist',
  server: {
    // The WebView loads the live web build from Firebase Hosting so JS/UI
    // updates ship instantly without a new AAB. Google Sign-In uses the
    // native @capacitor-firebase/authentication plugin (native Google SDK),
    // which bypasses Google's WebView OAuth ban. It requires the app's
    // signing-cert SHA-1 (upload key AND Play App Signing key) to be
    // registered on the Firebase Android app.
    url: 'https://uae-nurse-licensing-prep-feb76.web.app',
    cleartext: false,
    androidScheme: 'https'
  },
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
