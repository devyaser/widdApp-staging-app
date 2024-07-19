import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";
import { MongoClient } from "mongodb";
import { hashPassword, verifyPassword } from "../../../src/lib/auth";
import EmailProvider from "next-auth/providers/email";
import { randstring, sendEmail } from "../../../src/lib/email";

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const options = {
  site: process.env.NEXTAUTH_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user._id;
        token.user = user;
      }
      return token;
    },
    async signIn(user, account, metadata) {
      let emails;
      let primaryEmail;

      if (account?.provider === "github") {
        const emailRes = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${account.accessToken}`,
          },
        });
        emails = await emailRes.json();
        primaryEmail = emails.find((e) => e.primary).email;

        user.email = primaryEmail;
      }
      const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
      const db = client.db();

      const existingUser = await db.collection("users").findOne({ email: user.user?.email });

      // if (existingUser) {
      //   if (!existingUser?.username) {
      //     let newId = makeid(12).toString() + "!@$";
      //     user.user.username = newId;

      //     const result = await usersCollection.updateOne(
      //       { email: user?.email },
      //       { $set: { username: newId } }
      //     );
      //   } else {
      //     user.user.username = existingUser?.username;
      //   }
      // } else {
      //   let tempId = makeid(12).toString() + "!@$";

      //   const result = await db.collection("users").insertOne({
      //     email: user.user?.email,
      //     username: user.user?.name,
      //     username: tempId,
      //   });
      //   user.user.username = tempId;
      // }
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

          const db = client.db("botrix");

          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          console.log("this is the user", user);

          if (!user) {
            throw new Error("No user found!");
          }

          const isValid = await verifyPassword(credentials.password, user.password);

          if (!isValid) {
            return null;
            // throw new Error(JSON.stringify({ errors: "Could not log you in", status: false }));
            // throw new Error("Could not log you in");
          }

          // if (!user.isValid) {
          //   const code = randstring();
          //   await db.collection("users").updateOne({ email: user.email }, { $set: { code: code } });
          //   sendEmail(email, code);
          //   throw new Error("Email not verified. Please check your inbox to verify your email!");
          // }

          let userCopy = JSON.parse(JSON.stringify(user));

          delete userCopy["password"];

          return userCopy;
        } catch (err) {
          console.log(err);
        }
        // client.close();
      },
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  pages: {
    signIn: "/auth",
  },
};
//
// export default async function auth(req, res, options) {
//     return await NextAuth(req, res, options, {
//         adapter: MongoDBAdapter({
//             db: (await clientPromise).db("your-database")
//         }),
//     })
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => NextAuth(req, res, options);
