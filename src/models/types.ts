export interface Company {
  name: string;
}

export interface User {
  id: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

export interface Contract {
  id: string;
  company: Company;
  contractor: User;
  date: Date;
}

export interface ContractRemote {
  id: string;
  company: Company;
  contractor: User;
  timestamp: number;
}
