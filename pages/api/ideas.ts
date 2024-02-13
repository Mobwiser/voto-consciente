import {NextApiRequest, NextApiResponse} from "next";
import {collection, getDocs, query, where} from "firebase/firestore";
import {appFirebaseDb} from "../../firebase";
import {Subjects} from "./parties";

const collectionName = 'ideas';

export interface Idea {
    id: string;
    subject: Subjects;
    title: string;
    description: string;
    info: string;
    owners: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case 'GET':
            const partiesRef = collection(appFirebaseDb, collectionName);
            const firebaseQuery = query(partiesRef);
            const querySnapshot = await getDocs(firebaseQuery);

            res.status(200).json(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            break;
        default:
            throw new Error('Unsupported method');
    }
}

export const getVotation = async (subjects: string[]): Promise<Idea[]> => {
    const partiesRef = collection(appFirebaseDb, collectionName);
    const firebaseQuery = query(partiesRef, where("subject", "in", subjects.map(subjectKey => Subjects[subjectKey])));
    const querySnapshot = await getDocs(firebaseQuery);

    const ideas = [];
    let counters: Record<string, { [key: string]: number, total: number }> = {};

    const shuffledArray = querySnapshot.docs.sort(() => Math.random() - 0.5);

    const subjectValues = subjects.map(subjectKey => Subjects[subjectKey]);

+    shuffledArray.forEach((doc) => {
        const idea = {...doc.data(), id: doc.id} as Idea;
        if(!idea.owners?.length) {
            return;
        }

        if(!subjectValues.includes(idea.subject)) {
            return;
        }

        const ownerParty = idea.owners;

        if(!counters[ownerParty]) {
            counters[ownerParty] = {
                [idea.subject]: 1,
                total: 1,
            }
            ideas.push(idea);
            return;
        }

        if(!counters[ownerParty][idea.subject]) {
            counters[ownerParty] = {
                ...counters[ownerParty],
                [idea.subject]: 1,
                total: counters[ownerParty].total + 1
            };
            ideas.push(idea);
            return;
        }

    });
    return ideas;
}


