import type { User } from '../types';

const MOCK_USER: User = {
  id: 'user-1',
  name: 'Archivist',
  email: 'archivist@vaultandvellum.io',
};

/** Simulates a login API call with 800ms delay. */
export function login(_email: string, _password: string): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...MOCK_USER }), 800);
  });
}
