import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence, createUserWithEmailAndPassword, getRedirectResult,
  GoogleAuthProvider, indexedDBLocalPersistence, initializeAuth,
  sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId : undefined;
export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
export const auth = initializeAuth(app, { persistence: [indexedDBLocalPersistence, browserLocalPersistence] });

/** Native platforms use the system Google SDK; the returned credential is
 * bridged into Firebase Web Auth so Firestore and API ID tokens share identity. */
export async function signInWithGoogle() {
  const result = await FirebaseAuthentication.signInWithGoogle();
  const idToken = result.credential?.idToken;
  if (!idToken) throw new Error('google_credential_unavailable');
  await signInWithCredential(auth, GoogleAuthProvider.credential(idToken));
}
export { getRedirectResult };
export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const registerWithEmail = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);
export const logoutUser = () => signOut(auth);

export enum OperationType { CREATE = 'create', UPDATE = 'update', DELETE = 'delete', LIST = 'list', GET = 'get', WRITE = 'write' }
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  // Do not log account identifiers, emails, document data, or credentials.
  console.error('Firestore operation failed:', operationType, path);
  throw new Error(error instanceof Error ? error.message : 'firestore_operation_failed');
}
