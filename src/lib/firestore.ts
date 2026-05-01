import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { firebaseDb, firebaseStorage } from "./firebase";

export const uploadFile = async (file: File, folder: string) => {
  if (!firebaseStorage) {
    throw new Error("Firebase Storage not configured");
  }
  const storageRef = ref(
    firebaseStorage,
    `${folder}/${Date.now()}-${file.name}`
  );
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};

export const fetchCollection = async <T>(collectionName: string) => {
  if (!firebaseDb) {
    return [] as T[];
  }
  const snapshot = await getDocs(collection(firebaseDb, collectionName));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<T, "id">),
  })) as T[];
};

export const addDocument = async (collectionName: string, data: object) => {
  if (!firebaseDb) {
    throw new Error("Firestore not configured");
  }
  const payload = { ...data } as Record<string, unknown>;
  if (!("createdAt" in payload)) {
    payload.createdAt = serverTimestamp();
  }
  return addDoc(collection(firebaseDb, collectionName), payload);
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: object
) => {
  if (!firebaseDb) {
    throw new Error("Firestore not configured");
  }
  return updateDoc(doc(firebaseDb, collectionName, id), data);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  if (!firebaseDb) {
    throw new Error("Firestore not configured");
  }
  return deleteDoc(doc(firebaseDb, collectionName, id));
};

export const setDocument = async (
  collectionName: string,
  id: string,
  data: object
) => {
  if (!firebaseDb) {
    throw new Error("Firestore not configured");
  }
  return setDoc(doc(firebaseDb, collectionName, id), data, { merge: true });
};

export const recordAnalytics = async (field: string, amount = 1) => {
  if (!firebaseDb) {
    return;
  }
  await setDoc(
    doc(firebaseDb, "analytics", "metrics"),
    {
      [field]: increment(amount),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
