import Head from 'next/head';
import {useAppContext} from '../context/AppContext';
import {Radar} from 'react-chartjs-2';
import {Idea, IDEIAS, Parties, SupportValues, VOTE_MATRIX} from './api/parties';
import {
  Flex,
  Heading,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';

interface PartySupport {
  name: string;
  support: number;
}
export default function Vision() {
  const [appState] = useAppContext();

  const labels: string[] = Object.values(Parties);
  const partySupport: Record<string, PartySupport> = labels.reduce(
    (support: Record<string, PartySupport>, party: string) => {
      support[party] = {name: party, support: 0};
      return support;
    },
    {},
  );

  const vision: Record<number, number> = appState.vision;

  Object.keys(vision).forEach((ideaId: string) => {
    const idea: Idea = IDEIAS[ideaId];
    Object.keys(idea.partiesVision).forEach((party: Parties) => {
      const proximity = VOTE_MATRIX[vision[ideaId]][idea.partiesVision[party]];
      partySupport[party].support += proximity;
    });
  });

  const partySupportArray = Object.values(partySupport).sort(
    (a, b) => b.support - a.support,
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'My society vision',
        data: Object.values(partySupport).map(
          (partySupport) => partySupport.support,
        ),
        backgroundColor: 'rgba(178,245,234, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>Society Vision</title>
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
            {partySupportArray.map((partySupport) => (
              <Stat minW="30vw" textAlign="center">
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
