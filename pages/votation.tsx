import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Progress,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {FaQuestion, FaRegGrinAlt, FaRegAngry, FaRegFrown} from 'react-icons/fa';
import {useState} from 'react';
import {Idea, IDEIAS, SupportValues} from './api/parties';
import {useRouter} from 'next/router';
import {useAppContext} from '../context/AppContext';

export default function Votation() {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const router = useRouter();

  const [_appState, setAppState] = useAppContext();

  const ideasArray = Object.values(IDEIAS);

  const handleVote = (vote: SupportValues, idea: Idea) => {
    handleVoteValue(idea, vote);
  };

  const handleVoteValue = (idea: Idea, support: SupportValues) => {
    setAppState((prevState) => ({
      ...prevState,
      vision: {
        [idea.id]: support,
        ...prevState.vision,
      },
    }));

    if (ideaIndex + 1 === ideasArray.length) {
      router.push('/vision');
    } else {
      setIdeaIndex(ideaIndex + 1);
    }
  };

  const currentIdea: () => Idea = () => ideasArray[ideaIndex];
  return (
    <div className={styles.container}>
      <Head>
        <title>Society Vision</title>
        <meta
          name="description"
          content="Verifica a tua identidade politica de acordo com a tua visão da sociedade"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          h="100vh"
          w="100%"
        >
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            textAlign="center"
            flex="2"
            bgColor="tier"
            marginTop="50px"
            w="100vw"
          >
            <Heading
              size="lg"
              color="white"
              bgColor="primary"
              p={2}
              w={'100vw'}
            >
              Society vision
            </Heading>
            <Progress
              colorScheme="green"
              height="32px"
              w="90vw"
              value={(ideaIndex / ideasArray.length) * 100}
            />
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            flex="4"
          >
            {ideasArray.map(
              (idea, index) =>
                index === ideaIndex && (
                  <Box
                    key={`Idea_${index}`}
                    bg="primary"
                    w="90vw"
                    minH="300px"
                    p={4}
                    color="teal.900"
                    borderColor="accent"
                    border="2px"
                    borderRadius="3px"
                    fontSize="22px"
                    textAlign="center"
                  >
                    <Heading size="lg" color="teal.900">
                      {idea.title}
                    </Heading>
                    <Text color="teal.700" mt={15}>
                      {idea.description}
                    </Text>
                  </Box>
                ),
            )}
            <Flex
              justifyContent="space-around"
              width="100%"
              marginTop={50}
              marginLeft={20}
              marginRight={20}
            >
              <Button
                w="50px"
                h="50px"
                bgColor="emojies.favor"
                borderRadius="50px"
                lineHeight="62px"
                textAlign="center"
                onClick={() => handleVote(SupportValues.FAVOR, currentIdea())}
              >
                <Icon as={FaRegGrinAlt} color="white" w={6} h={6} />
              </Button>
              <Button
                w="50px"
                h="50px"
                bgColor="emojies.abstain"
                borderRadius="50px"
                lineHeight="62px"
                textAlign="center"
                onClick={() => handleVote(SupportValues.ABSTAIN, currentIdea())}
              >
                <Icon as={FaQuestion} color="white" w={6} h={6} />
              </Button>
              <Button
                w="50px"
                h="50px"
                bgColor="emojies.against"
                borderRadius="50px"
                lineHeight="62px"
                textAlign="center"
                onClick={() => handleVote(SupportValues.AGAINST, currentIdea())}
              >
                <Icon as={FaRegFrown} color="white" w={6} h={6} />
              </Button>
              <Button
                w="50px"
                h="50px"
                bgColor="emojies.blocker"
                borderRadius="50px"
                lineHeight="62px"
                textAlign="center"
                onClick={() => handleVote(SupportValues.BLOCKER, currentIdea())}
              >
                <Icon as={FaRegAngry} color="white" w={6} h={6} />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </div>
  );
}
