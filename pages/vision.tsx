import Head from 'next/head';
import {useAppContext} from '../context/AppContext';
import {Radar} from 'react-chartjs-2';
import {Idea, Party} from './api/parties';
import {
  Flex,
  Heading,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import {useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface PartySupport {
  name: string;
  support: number;
}
export default function Vision() {
  const [appState] = useAppContext();
  const [parties, setParties] = useState<Party[]>();
  const [ideas, setIdeas] = useState(appState.ideas);
  const router = useRouter();
  const vision: Record<number, number> | undefined = appState.vision;

  useEffect(() => {
    fetch('/api/parties').then((response) => response.json()).then((data) =>{
      setParties(data);
    });
  }, []);

  if(!parties?.length) {
    return; // FIXME: Add loading
  }

  const partySupport: Record<string, PartySupport> = parties.reduce(
    (support: Record<string, PartySupport>, party: Party) => {
      support[party.acronym] = {name: party.name, support: 0};
      return support;
    },
    {},
  )

  console.log(vision);
  if(!vision) {
    router.push('/votation');
  }

  Object.keys(vision).forEach((ideaId: string) => {
    const idea: Idea = ideas[ideaId];
    parties.forEach((party) => {
      if(idea.owners.includes(party.acronym)) {
        partySupport[party.acronym].support += 1;
      }
    })
  });

  const partySupportArray = Object.values(partySupport).sort(
    (a, b) => b.support - a.support,
  );

  console.log('data', (Object.values(partySupport) || []).map(
      (partySupport) => partySupport.support,
  ));

  const data = {
    labels: parties.map(party => party.acronym),
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
        </Flex>
      </main>
    </div>
  );
}
