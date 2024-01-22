import {NextApiRequest, NextApiResponse} from "next";
import {collection, getDocs, query} from "firebase/firestore";
import {appFirebaseDb} from "../../firebase";

const collectionName = 'ideas';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case 'GET':
            const partiesRef = collection(appFirebaseDb, collectionName);
            const firebaseQuery = query(partiesRef);
            const querySnapshot = await getDocs(firebaseQuery);

            res.status(200).json(querySnapshot.docs.map(doc => doc.data()));
            break;
        default:
            throw new Error('Unsupported method');
    }
}