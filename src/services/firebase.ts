import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// ─────────────────────────────────────────────────────────────────────────────
// Firebase configuration
// Uzupełnij tymi wartościami ze swojego projektu Firebase Console:
//   https://console.firebase.google.com → Project Settings → Your apps → SDK setup
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            ?? 'AIzaSyDspUvfpcW6wyCExA2u0cnGKlz5APWa9kM',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        ?? 'ds-tpf.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         ?? 'ds-tpf',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     ?? 'ds-tpf.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '971813432547',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             ?? '1:971813432547:web:3224b9bfbad629a30c29d6',
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     ?? 'G-KTJELW0K66',
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize analytics only if measurementId is provided and analytics is supported in the current environment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let analytics: any = null;
isSupported()
  .then((supported: boolean) => {
    if (supported && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  })
  .catch(() => {
    // Ignore analytics failure in non-browser environments
  });

export default app;

