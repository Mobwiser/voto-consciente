import {NextApiRequest, NextApiResponse} from "next";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { partiesCollectionName } from "../parties";
import { useRouter } from "next/router";
import { appFirebaseDb } from "../../../firebase";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Hello');

    const {id} = req.query;

    console.log(id);

    switch(req.method) {
        case 'GET':
            const queryRef = doc(appFirebaseDb, partiesCollectionName, id.toString());
            const querySnapshot = await getDoc(queryRef);


            if (querySnapshot.exists()) {
                res.status(200).json(querySnapshot.data());
            }
            else {
                console.log("No such document")
            }

            break;
        default:
            throw new Error('Unsupported method');
    }
}