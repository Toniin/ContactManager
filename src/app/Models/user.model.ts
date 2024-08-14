export interface userState {
  username: string,
  isAuthenticated: boolean,
  errors: { isError: boolean, message: string },
}
