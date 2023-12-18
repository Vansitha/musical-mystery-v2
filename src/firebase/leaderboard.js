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
  deleteDoc,
  increment,
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
    const topPlayers = snapshot.docs.map((doc, index) => {
      const { totalGamesPlayed, isAnonymous, highScore, country } = doc.data();
      const rank = ++index;

      if (totalGamesPlayed == 0) return;

      let name = doc.data().name;
      if (isAnonymous) {
        name = `Anonymous#${rank}`;
      }

      return {
        rank,
        name,
        highScore,
        country,
        totalGamesPlayed,
        email: doc.id,
      };
    });

    const filteredPlayers = topPlayers.filter((player) => player != undefined);
    return filteredPlayers;
  } catch (error) {
    throw new Error("An error getting top players.");
  }
}

export async function updateUserHighScore(email, newScore, gameId) {
  if (!email || newScore == 0) return;
  const currHighestScore = await getHigestScore(email);
  if (currHighestScore >= newScore) return;

  try {
    await updateDoc(doc(db, USERS_COLLECTION, email), {
      highScore: newScore,
      totalGamesPlayed: increment(1),
      prevGameId: gameId,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function incrementTotalGamesPlayed(email) {
  if (!email) return;

  try {
    await updateDoc(doc(db, USERS_COLLECTION, email), {
      totalGamesPlayed: increment(1),
    });
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

export async function getPrevGameId(email) {
  if (!email) return 0;
  try {
    const user = await getDoc(doc(db, USERS_COLLECTION, email));
    if (!user.exists()) return 0;
    return user.data().prevGameId;
  } catch (err) {
    console.log(err);
  }
  return 0;
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
      isAnonymous: false,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUserAccount(email) {
  if (!email) return false;

  try {
    await deleteDoc(doc(db, USERS_COLLECTION, email));
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function toggleAnonymousMode(email, mode) {
  if (!email) return false;

  try {
    const user = await getDoc(doc(db, USERS_COLLECTION, email));
    if (!user.exists()) return false;

    await updateDoc(doc(db, USERS_COLLECTION, email), {
      isAnonymous: mode,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function getAnonymousMode(email) {
  if (!email) return false;

  try {
    const user = await getDoc(doc(db, USERS_COLLECTION, email));
    if (!user.exists()) return false;

    return user.data().isAnonymous;
  } catch (error) {
    console.log(error);
  }
  return false;
}
