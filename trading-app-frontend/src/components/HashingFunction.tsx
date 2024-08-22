import bcrypt from "bcryptjs";

export default async function HashingFunction(password: string) {
  const saltRounds = 10;

  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}
