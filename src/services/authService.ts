import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';
import type { User } from '../types';

/** Converts a Firebase User to our internal User model */
function toAppUser(firebaseUser: import('firebase/auth').User): User {
  return {
    id:    firebaseUser.uid,
    name:  firebaseUser.displayName ?? firebaseUser.email?.split('@')[0] ?? 'User',
    email: firebaseUser.email ?? '',
  };
}

/**
 * Sign in with email and password using Firebase Authentication.
 * Throws a Firebase AuthError on failure.
 */
export async function login(email: string, password: string): Promise<User> {
  const credential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
  return toAppUser(credential.user);
}

/**
 * Create a new user account and set the displayName.
 * Throws a Firebase AuthError on failure.
 */
export async function register(name: string, email: string, password: string): Promise<User> {
  const credential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Set the display name immediately after account creation
  await updateProfile(credential.user, { displayName: name });
  // Force a reload of the user's details to apply the profile updates
  await credential.user.reload();
  return toAppUser(auth.currentUser ?? credential.user);
}

/**
 * Sign the currently authenticated user out.
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}
