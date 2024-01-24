import { NextApiRequest, NextApiResponse } from "next";
import {collection, query, getDocs} from 'firebase/firestore';
import { appFirebaseDb } from "../../firebase";

export const partiesCollectionName = 'parties';

export enum Subjects {
  HEALTH = 'health',
  FINANCES = 'finances',
  SALARIES = 'salaries',
  LABOR = 'labor',
  EDUCATION = 'education',
  JUSTICE = 'justice',
  HUMAN_RIGHTS = 'humanRights',
  ANIMAL_RIGHTS = 'animalRights',
  FOREIGN_AFFAIRS = 'foreignAffairs',
  PUBLIC_FINANCES = 'publicFinances',
  TRANSPARENCY = 'transparency',
  GOVERNMENT_ADMINISTRATION = 'governmentAdministration',
  INTERNAL_ADMINISTRATION = 'internalAdministration',
  ENVIRONMENT = 'environment',
  TRANSPORTATION = 'transportation',
  SOCIAL_WELFARE = 'socialWelfare',
  HOUSING = 'housing',
  CULTURE = 'culture',
  GOVERNMENT = 'government',
}

export interface Party {
  name: string;
  acronym: string;
  site: string;
  slogan: string;
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

