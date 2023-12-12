import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  orderBy,
  collection,
  limit,
  query,
} from "firebase/firestore";
import { db } from "./config";

const USERS_COLLECTION = "User";

export async function getTopTenLeaderboard() {
  const usersCollection = collection(db, USERS_COLLECTION);
  const topPlayersQuery = query(
    usersCollection,
    orderBy("highScore", "desc"),
    limit(10)
  );

  try {
    const snapshot = await getDocs(topPlayersQuery);
    const topPlayers = snapshot.docs.map((doc, index) => ({
      rank: ++index,
      ...doc.data(),
    }));
    return topPlayers;
  } catch (error) {
    console.log(error);
  }

  return [];
}

export async function updateUserHighScore(email, newScore) {
  if (!email || newScore == 0) return;
  const currHighestScore = await getHigestScore(email);
  if (currHighestScore < newScore) return;

  try {
    await updateDoc(
      (doc(db, USERS_COLLECTION, email),
      {
        highScore: newScore,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getHigestScore(email) {
  if (!email) return 0;
  try {
    const user = await getDoc(doc(db, USERS_COLLECTION, email));
    if (!user.exists()) return 0;
    return user.data().highScore;
  } catch (err) {
    console.log(err);
  }
}

export async function createUser(email, name, country) {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const region = regionNames.of(country);

  try {
    const user = await getDoc(doc(db, USERS_COLLECTION, email));
    if (user.exists()) return;

    await setDoc(doc(db, USERS_COLLECTION, email), {
      name: name,
      country: region,
      totalGamesPlayed: 0,
      highScore: 0,
    });
  } catch (err) {
    console.log(err);
  }
}
