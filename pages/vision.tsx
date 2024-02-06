// Vision.tsx
import Head from 'next/head';
import { useAppContext } from '../context/AppContext';
import { Radar } from 'react-chartjs-2';
import { Party, SupportValues } from './api/parties';
import {
  Button,
  Flex,
  Heading, Link,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { useRouter } from 'next/router';
import {Idea} from "./api/ideas";

interface PartySupport {
  name: string;
  support: number;
}

export default function Vision() {
  const [appState] = useAppContext();
  const [parties, setParties] = useState<Party[]>();
  const [ideas] = useState(appState.ideas);
  const router = useRouter();
  const vision: Record<number, number> | undefined = appState.vision;

  useEffect(() => {
    fetch('/api/parties')
      .then((response) => response.json())
      .then((data) => {
        setParties(data);
      });
  }, []);

  if (!parties?.length) {
    return <div>Loading...</div>; // You might want to add a loading state
  }

  const partySupport: Record<string, PartySupport> = parties.reduce(
    (support: Record<string, PartySupport>, party: Party) => {
      support[party.acronym] = { name: party.name, support: 0 };
      return support;
    },
    {},
  );

  if(!vision) {
    router.push('/votation');
  }

  Object.keys(vision).forEach((ideaId: string) => {
    const idea: Idea = ideas[ideaId];
    const opinion = vision[ideaId];
    parties.forEach((party) => {
      if (idea.owners.includes(party.acronym)) {
        switch (opinion) {
          case SupportValues.FAVOR:
            partySupport[party.acronym].support += 1;
            break;
          case SupportValues.AGAINST:
            partySupport[party.acronym].support -= 1;
            break;
          case SupportValues.BLOCKER:
            partySupport[party.acronym].support -= 2;
            break;
          default:
            partySupport[party.acronym].support += 0;
            break;
        }
      }
    });
  });

  const partySupportArray = Object.values(partySupport).sort(
    (a, b) => b.support - a.support,
  );

  const data = {
    labels: parties.map((party) => party.acronym),
    datasets: [
      {
        label: 'Compatibilidade politica',
        data: (Object.values(partySupport) || []).map(
          (partySupport) => partySupport.support,
        ),
        backgroundColor: 'rgba(178,245,234, 0.2)',
        borderColor: 'rgb(241,161,110)',
        borderWidth: 1,
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

  const topMatchingParties = getTopMatchingParties();

  return (
    <div>
      <Head>
        <title>Voto consciente</title>
        <meta
          name="description"
          content="Verifica a tua identidade politica de acordo com a tua visão da sociedade"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          w="100vw"
          mt="15px"
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
                O(s) partido(s) com que mais se identifica:
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
            Compatibilidade com os diferentes partidos
          </Heading>
          <Flex wrap="wrap">
            {partySupportArray.map((partySupport, index) => (
              <Stat minW="30vw" textAlign="center" key={`stat_${index}`}>
                <StatLabel>{partySupport.name}</StatLabel>
                <StatNumber>{partySupport.support}</StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={partySupport.support > 0 ? 'increase' : 'decrease'}
                  />
                </StatHelpText>
              </Stat>
            ))}
          </Flex>
          <Heading
            color="accent"
            as="h5"
            size="sm"
            marginTop={15}
            marginBottom={15}
          >
            Radar de compatibilidade
          </Heading>
          <Radar data={data} />
          <Link href="/votation">
            <Button colorScheme="teal" variant="outline">
              Recomeçar
            </Button>
          </Link>
        </Flex>
      </main>
    </div>
  );
}
