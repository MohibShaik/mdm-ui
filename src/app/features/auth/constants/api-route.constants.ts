const api = '/api';

export const endPoint = {
  login: `${api}/auth/signin`,
  getUserInfoById: (userId: string) => `${api}/users/${userId}`,
};
