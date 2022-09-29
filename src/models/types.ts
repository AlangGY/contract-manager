export type Company = string;
export interface User {
  id: string;
  pw: string;
  isAdmin: boolean;
}

export interface Contract {
  id: string;
  company: string;
  contractor: User;
  date: Date;
}

export interface ContractRemote {
  id: string;
  company: string;
  contractor: User;
  timestamp: string;
}
