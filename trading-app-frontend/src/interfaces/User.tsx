export default interface User {
  userID?: number;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  DOB: string;
  balance: number;
}
