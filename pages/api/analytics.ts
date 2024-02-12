import {collection, doc, setDoc} from "firebase/firestore";
import {appFirebaseDb} from "../../firebase";

const collectionName = 'analytics';

export const writeEvent = async (eventName: string, data: unknown) => {
    const newEventRef = doc(collection(appFirebaseDb, collectionName));
    await setDoc(newEventRef, {
        eventName,
        data,
        timestamp: new Date(),
    });
}