export const LOGIN_USER = 'LOGIN_USER';

export function login(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}
