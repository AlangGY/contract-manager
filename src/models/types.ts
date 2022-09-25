export type Company = string;
export interface User {
  id: string;
  pw: string;
  admin: boolean;
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
