// Vision.tsx
import Head from 'next/head';
import { useAppContext } from '../context/AppContext';
import {Bar} from 'react-chartjs-2';
import { Party, SupportValues } from './api/parties';
import {
  Button,
  Flex,
  Heading, Link,
  Text,
  Box, Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Navbar from '../components/navbar/navbar';
import {Idea} from "./api/ideas";
import MyEuriborAd from "../components/myeuribor-ad";
import MobwiserBanner from "../components/mobwiser-banner";
import {writeEvent} from "./api/analytics";
import {ArcElement, CategoryScale, Chart, Legend, LinearScale, Tooltip, BarElement} from "chart.js";

Chart.register(LinearScale, ArcElement, Tooltip, Legend, CategoryScale, BarElement);

export const options = {
  indexAxis: 'x' as const,
  elements: {
    bar: {
      borderWidth: 10,
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
    },
  },
};

interface PartySupport {
  name: string;
  support: number;
  color: string;
  acronym: string;
}

export default function Vision() {
  const [appState] = useAppContext();
  const [parties, setParties] = useState<Party[]>();
  const [ideas] = useState(appState.ideas);
  const vision: Record<number, number> | undefined = appState.vision;

  useEffect(() => {
    fetch('/api/parties')
      .then((response) => response.json())
      .then((data) => {
        setParties(data);
      });

    if(vision && Object.keys(ideas|| {}).length) {
      writeEvent('end-quiz', appState);
    }
  }, []);

  if (!parties?.length) {
    return <Flex width={'100vw'} height={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Spinner size={'xl'} color='primary' />
    </Flex>; // You might want to add a loading state
  }

  const maxVotingValue = Math.ceil(Object.keys(vision || []).length / parties.length) * 2;

  const partySupport: Record<string, PartySupport> = parties.reduce(
    (support: Record<string, PartySupport>, party: Party) => {
      support[party.acronym] = { name: party.name, support: 0, color: party.color , acronym: party.acronym};
      return support;
    },
    {},
  );

  Object.keys(vision || []).forEach((ideaId: string) => {
    const idea: Idea = ideas[ideaId];
    const opinion = vision[ideaId];
    parties.forEach((party) => {
      if(!idea?.owners) {
        return;
      }
      if (idea.owners === party.acronym) {
        switch (opinion) {
          case SupportValues.FAVOR:
            partySupport[party.acronym].support += 1;
            break;
          case SupportValues.AGAINST:
            partySupport[party.acronym].support -= 2;
            break;
          case SupportValues.BRILLIANT:
            partySupport[party.acronym].support += 2;
            break;
          default:
            partySupport[party.acronym].support += 0;
            break;
        }
      }
    });
  });


  const partySupportArray = Object.values(partySupport || []).sort(
    (a, b) => b.support - a.support,
  );

  const data = {
    labels: partySupportArray.map((partySupport) => partySupport.acronym),
    datasets: [
      {
        axis: 'y',
        label: 'Compatibilidade politica',
        data: partySupportArray.map(
          (partySupport) => Math.min(100,(Math.max(partySupport.support,0) / maxVotingValue * 100)),
        ),
        fill: false,
        backgroundColor: partySupportArray.map(partySupport => partySupport.color),
        borderColor: partySupportArray.map(partySupport => partySupport.color),
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const getTopMatchingParties = (): PartySupport[] => {
    if (partySupportArray.length > 0) {
      const maxSupport = Math.max(...partySupportArray.map(partySupport => partySupport.support));
      return partySupportArray.filter(partySupport => partySupport.support === maxSupport);
    }
    return [];
  };

  const onRestart = () => {
    writeEvent('restart-quiz');
  }

  const topMatchingParties = getTopMatchingParties();

  return (
    <div>
      <Head>
        <title>Voto consciente</title>
      </Head>

      <main>
        <Navbar />
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          w="100vw"
        >
          <Heading
            size="lg"
            color="white"
            bgColor="accent"
            p={2}
            w={'100vw'}
            textAlign="center"
          >
            Visão da sociedade
          </Heading>

          {topMatchingParties.length > 0 && (
            <Box
              borderRadius="lg"
              overflow="hidden"
              p={{ base: 4, sm: 6 }}
              bgColor="#f2f2f2"
              maxW={{ base: 'full', sm: 'md', lg: 'lg' }}
              width="90%"
              margin="auto"
              mt={5}
            >

              <Heading size="sm" textAlign="center">
                Com base nos temas que escolheste e as tuas respostas, o(s) partido(s) com que mais se identifica:
              </Heading>
              <Text fontSize="md" fontWeight="bold" color="gray.500" textAlign="center" mt={2}>
                {topMatchingParties.map((partySupport, index) => (
                  <span key={`top_party_${index}`}>
                    {index > 0 && ', '}
                    {partySupport.name}
                  </span>
                ))}
              </Text>

            </Box>
          )}

          <Heading
            color="accent"
            as="h5"
            size="sm"
            marginTop={15}
            marginBottom={15}
          >
            Gráfico de compatibilidade
          </Heading>
          <Bar data={data} options={options}  />
          <Link href="/votation" marginTop={5} onClick={onRestart}>
            <Button colorScheme="teal" variant="outline">
              Recomeçar
            </Button>
          </Link>
          <Box marginTop={10}>
            <MyEuriborAd />
            <MobwiserBanner />
          </Box>
        </Flex>
      </main>
    </div>
  );
}
