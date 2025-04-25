import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export const saveAudioToFirestore = async ({ fileName, url, type }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");

  const audioRef = doc(db, "audios", `${user.uid}_${Date.now()}`);
  await setDoc(audioRef, {
    uid: user.uid,
    fileName,
    url,
    type,
    status: "pendiente",
    createdAt: serverTimestamp(),
  });

  return audioRef.id;
};