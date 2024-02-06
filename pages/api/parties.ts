import { NextApiRequest, NextApiResponse } from "next";
import {collection, getDocs, query} from 'firebase/firestore';

import { appFirebaseDb } from "../../firebase";

export const partiesCollectionName = 'parties';

export enum Subjects {
  HEALTH = 'Saúde',
  EDUCATION = 'Educação',
  JUSTICE = 'Justiça',
  ENVIRONMENT_ANIMAL_WELLFARE = 'Ambiente e direitos dos animais',
  CULTURE = 'Cultura',
  SECURITY = 'Segurança',
  INTERNAL_ADMINISTRATION = 'Administração interna',
  HUMAN_RIGHTS = 'Direitos humanos',
  MOBILITY = 'Mobilidade',
  TAXES = 'Impostos',
  HOUSING = 'Habitação',
}

export interface Party {
  name: string;
  acronym: string;
  site: string;
  slogan: string;
  program: string;
  image: string;
}

export enum SupportValues {
  FAVOR = 'favor',
  AGAINST = 'against',
  ABSTAIN = 'abstain',
  BLOCKER = 'blocker',
}

export interface Idea {
  id: number;
  subject: Subjects;
  title: string;
  description: string;
  info: string;
  owners: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      const partiesRef = collection(appFirebaseDb, partiesCollectionName);
      const firebaseQuery = query(partiesRef);
      const querySnapshot = await getDocs(firebaseQuery);

      res.status(200).json(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
      break;
    default:
      throw new Error('Unsupported method');
  }
}

