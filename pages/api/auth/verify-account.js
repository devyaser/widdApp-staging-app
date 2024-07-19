import { MongoClient } from "mongodb";
import { hashPassword } from "../../../src/lib/auth";
import { randstring, sendEmail } from "../../../src/lib/email";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { code } = data;

    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

    const db = client.db();

    const user = await db.collection("users").findOne({ code: code });

    if (user) {
      await db.collection("users").updateOne({ code: code }, { $set: { isValid: true } });
      res.status(201).json({ message: "Verified successfully!" });
    } else {
      res.status(422).json({ message: "User not found" });
    }
  } else {
    return;
  }
}

export default handler;
