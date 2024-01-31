import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Progress,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';
import {FaQuestion, FaRegGrinAlt, FaRegAngry, FaRegFrown, FaArrowDown, FaArrowUp} from 'react-icons/fa';
import React, {useEffect, useState} from 'react';
import {Idea, SupportValues} from './api/parties';
import {useRouter} from 'next/router';
import {useAppContext} from '../context/AppContext';

export default function Votation() {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  useEffect(() => {
    fetch('/api/ideas').then((response) => response.json()).then((data) => {
      setIdeas(data);
      setAppState((prevState) => ({
        ...prevState,
        ideas: data.reduce((ideasMap: Record<string, Idea>, idea: Idea) => ({...ideasMap, [idea.id.toString()]: idea}), {} ),
      }));
    })
  }, []);
  const router = useRouter();

  const [_appState, setAppState] = useAppContext();

  const handleVote = (vote: SupportValues, idea: Idea) => {
    handleVoteValue(idea, vote);
  };

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const handleVoteValue = (idea: Idea, support: SupportValues) => {
    setAppState((prevState) => ({
      ...prevState,
      vision: {
        [idea.id]: support,
        ...prevState.vision,
      },
    }));

    if (ideaIndex + 1 === ideas.length) {
      router.push('/vision');
    } else {
      setIdeaIndex(ideaIndex + 1);
    }
  };

  const currentIdea: () => Idea = () => ideas[ideaIndex];
  const showInfo = (index) => ideaIndex === index && isOpen;

  return (
    <div className={styles.container}>
      <Head>
        <title>Voto consciente</title>
        <meta
          name="description"
          content="Verifica a tua identidade politica de acordo com a tua visão da sociedade"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Navbar />
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          alignItems="self-start"
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
              Voto consciente
            </Heading>
            <Progress
              colorScheme="green"
              height="32px"
              w="90vw"
              marginTop={"1rem"}
              marginBottom={"1rem"}
              value={(ideaIndex / ideas.length) * 100}
            />
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            flex="4"
            w="100vw"
          >
            {ideas.map(
              (idea, index) =>
                index === ideaIndex && (
                    <Flex  key={`Idea_${index}`} flexDirection={"column"} alignItems={"center"}  justifyContent={"center"} w={"90vw"}>
                      <Heading size="lg" marginBottom={"2rem"}>
                        {idea.title}
                      </Heading>
                      <Flex
                          flexDirection={"column"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          bg="primary"
                          w="90vw"
                          minH="200px"
                          p={4}
                          color="primary"
                          borderColor="accent"
                          border="2px"
                          borderRadius="3px"
                          fontSize="22px"
                          textAlign="center"
                      >
                        <Text color="black" mt={15}>
                          {idea.description}
                        </Text>

                        {showInfo(index) && (<IconButton aria-label='Show info'
                                    icon={<Icon as={FaArrowUp} color="white" w={6} h={6}></Icon>}
                                    onClick={toggleIsOpen}
                        />)}
                        {!showInfo(index) && (<IconButton aria-label='Hide info'
                                                         icon={<Icon as={FaArrowDown} color="white" w={6} h={6}></Icon>}
                                                         onClick={toggleIsOpen}
                        />)}
                      </Flex>
                      {showInfo(index) && (<Box bgColor={"lightgrey"}  w="90vw" p={"1rem"} color={"black"}>
                        {idea.info}
                      </Box>)}
                    </Flex>

                ),
            )}
            <Flex
              justifyContent="space-around"
              alignItems={"flex-start"}
              width="100%"
              marginTop={50}
              marginLeft={20}
              marginRight={20}
            >
              <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} maxW={"60px"}>
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
                <Text textAlign={"center"}>Concordo</Text>
              </Flex>
              <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} maxW={"60px"}>
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
                <Text textAlign={"center"}>Não concordo</Text>
              </Flex>
              <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} maxW={"60px"}>
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
                <Text textAlign={"center"}>Nem pensar</Text>
              </Flex>
              <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} maxW={"60px"}>
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
                <Text textAlign={"center"}>Não tenho opinião</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </div>
  );
}
