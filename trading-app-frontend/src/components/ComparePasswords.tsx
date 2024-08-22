import bcrypt from "bcryptjs";

export default async function ComparePasswords(
  inputtedPassword: string,
  actualPassword: string
) {
  const passwordMatch: boolean = await new Promise((resolve, reject) => {
    bcrypt.compare(inputtedPassword, actualPassword, function (err, res) {
      if (err) {
        console.error("Error while comparing passwords: " + err);
        return false;
      }
      if (!res) {
        console.log("passwords dont match!");
      }
      resolve(res);
    });
  });

  return passwordMatch;
}
