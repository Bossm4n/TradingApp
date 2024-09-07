import hashPassword from "./HashingFunction";

export default async function comparePassword(inputPassword: string, storedHashedPassword:string) {
  const hashedInputPassword = await hashPassword(inputPassword);
  console.log(hashedInputPassword, storedHashedPassword)
  
  // Compare the hashed input password with the stored hash
  return hashedInputPassword === storedHashedPassword;
}