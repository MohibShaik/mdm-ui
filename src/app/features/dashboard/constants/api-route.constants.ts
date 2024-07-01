const api = '/api';

export const endPoint = {
  usersList: `${api}/users`,
  deleteUser: (userId: number) => `${api}/users/${userId}`,
};
