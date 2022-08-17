export interface Company {
  name: string;
}

export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

export interface Contract {
  id: string;
  company: Company;
  contractor: User;
  date: Date;
}
