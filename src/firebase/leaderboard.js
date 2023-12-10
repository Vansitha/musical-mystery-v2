import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

const USERS_COLLECTION = "User";

export async function getLeaderboardData() {
  //TODO: Filter out the top 10 users based on their score
}

export async function updateUserScore(email, score) {
  //TODO: Update the total number of games players also
}

export async function createUser(email, name, country) {
  // TODO: Create fields for highScore and totalGamesPlayed also and init to 0
  try {
    const user = await getDoc(doc(db, USERS_COLLECTION, email));
    if (user.exists()) return;

    await setDoc(doc(db, USERS_COLLECTION, email), {
      name: name,
      country: country,
      totalGamesPlayed: 0,
      highScore: 0,
    });
  } catch (err) {
    console.log(err);
  }
}
