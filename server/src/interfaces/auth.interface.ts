export interface DataStoredInToken {
  id: string;
  username: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
