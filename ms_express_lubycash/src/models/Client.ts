export default interface Clients {
  fullName: string;
  email: string;
  phone: string;
  cpfNumber: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  status?: string;
  averageSalary: number;
  currentBalance?: number;
}
