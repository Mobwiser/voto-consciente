import {NextApiRequest, NextApiResponse} from "next";
import {collection, getDocs, query} from "firebase/firestore";
import {appFirebaseDb} from "../../firebase";

const debatesCollectionName = 'debates';

export interface Debate {
    party1: string;
    party2: string;
    channel: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case 'GET':
            const debatesRef = collection(appFirebaseDb, debatesCollectionName);
            const firebaseQuery = query(debatesRef);
            const querySnapshot = await getDocs(firebaseQuery);

            res.status(200).json(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            break;
        default:
            throw new Error('Unsupported method');
    }
}
