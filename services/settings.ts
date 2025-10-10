/*
- Load data from collection 'timerkit_settings' in Firestore
- Update data in collection 'timerkit_settings' in Firestore
*/
import {
  getDocs,
  addDoc,
  collection,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { firestoreDb } from "../config/FirebaseConfig";
import { Settings } from "../types/settings";

const COLLECTION_NAME = "timerkit_settings";

const DEFAULT_SETTINGS: Omit<Settings, "id"> = {
  theme: "system",
};

/*
  returns the only one settings document in collection 'timerkit_settings'
  If it does not exist, create one with default settings and return it
*/
export const loadSettings = async (): Promise<Settings | null> => {
  try {
    // Get the only document in the collection
    const colRef = collection(firestoreDb, COLLECTION_NAME);
    const snapshot = await getDocs(colRef);

    if (!snapshot.empty) {
      const firstDoc = snapshot.docs[0];
      return {
        id: firstDoc.id,
        ...(firstDoc.data() as Omit<Settings, "id">),
      } as Settings;
    }

    // If none exists, create one with default settings
    const newSettings = {
      ...DEFAULT_SETTINGS,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const createdRef = await addDoc(colRef, newSettings);
    return {
      id: createdRef.id,
      ...newSettings,
    } as Settings;
  } catch (error) {
    console.error("Error getting settings:", error);
    throw error;
  }
};

/*
  Update settings document in collection 'timerkit_settings' 
*/
export const updateSettings = async (
  id: string,
  settingsData: Partial<Settings>
): Promise<void> => {
  try {
    const docRef = doc(firestoreDb, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...settingsData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
};
