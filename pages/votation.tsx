import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Progress, Switch, Tag,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import {FaQuestion, FaRegGrinAlt, FaRegAngry, FaRegFrown} from 'react-icons/fa';
import React, {useEffect, useState} from 'react';
import {Party, Subjects, SupportValues} from './api/parties';
import {useRouter} from 'next/router';
import {useAppContext} from '../context/AppContext';
import {getVotation, Idea} from "./api/ideas";
import {writeEvent} from "./api/analytics";

export default function Votation() {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [showVotationForm, setShowVotationForm] = useState(false);
  const [parties, setParties] = useState<Party[]>([]);

  const router = useRouter();

  const [_appState, setAppState] = useAppContext();

  useEffect(() => {
    fetch('/api/parties')
        .then((response) => response.json())
        .then((data) => {
          setParties(data);
        });
  }, []);

  const isSubjectChecked = (subject: string) => subjects.indexOf(subject) > -1;

  const onToggleSubject = (subject: string) => {
    const index = subjects.indexOf(subject);
    if(index === -1) {
      setSubjects([...subjects, subject]);
    }else {
      setSubjects(subjects.filter(s => s !== subject));
    }
  }

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

    if (ideaIndex + 1 === ideas.length) {
      router.push('/vision');
    } else {
      setIdeaIndex(ideaIndex + 1);
    }
  };

  const currentIdea: () => Idea = () => ideas[ideaIndex];

  const startQuiz = () => {
    // Checking if at least one subject is selected
    if (subjects.length === 0) {
      // prompt mensagem pop up
      alert('Escolha pelo menos um tema para iniciar o quiz.');
      return;
    }

    getVotation(subjects).then((data) => {
      setIdeas(data);
      setShowVotationForm(true);
      setAppState((prevState) => ({
        ...prevState,
        ideas: data.reduce((ideasMap: Record<string, Idea>, idea: Idea) => ({...ideasMap, [idea.id.toString()]: idea}), {} ),
      }));

      writeEvent('start-quiz', {
        subjects,
        ideas: data,
      })
    })
  }

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
          alignItems="self-start"
        >
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            textAlign="center"
            flex="2"
            bgColor="tier"
            w="100vw"
          >
            <Heading
              size="lg"
              color="white"
              bgColor="accent"
              p={2}
              w={'100vw'}
            >
              Voto consciente
            </Heading>

            {!showVotationForm && <Heading
                size="md"
                color="primary"
                p={2}
                marginTop={5}
                w={'100vw'}
            >
              Escolhe os temas que queres ver cobertos no questionário?
            </Heading>}

            {!showVotationForm && <Heading
                size="sm"
                color="secondary"
                p={2}
                w={'100vw'}
            >
              Para cada tema que escolheres, iremos apresentar uma proposta de cada partido.
            </Heading>}

            {!showVotationForm && <Box>
              {Object.keys(Subjects).map((subject) => (
                  <Flex key={subject}
                        flexDirection={'row'}
                        alignItems={'flex-end'}
                        justifyContent={'flex-end'}
                        gap={5}
                        marginBottom={5}
                        w={'90vw'}>
                    <Text>{Subjects[subject]}</Text>
                    <Switch
                        size={'lg'}
                        colorScheme='teal'
                        isChecked={isSubjectChecked(subject)}
                        onChange={() => onToggleSubject(subject)}
                    >
                    </Switch>
                  </Flex>
              ))}
            </Box>}


            {!ideas.length && <Heading size={'sm'} textAlign={'right'} width='90vw' color={'accent'} marginBottom={5}>
              Estimativa de ideas: {subjects.length * parties.length}
            </Heading>}
            {!ideas.length && <Button
                size='md'
                height='48px'
                width='90vw'
                border='2px'
                borderColor='green.500'
                onClick={startQuiz}
            >
              Começar teste!
            </Button>}

            {!!ideas.length && <Progress
              colorScheme="green"
              height="32px"
              w="90vw"
              marginTop={"1rem"}
              marginBottom={"1rem"}
              value={(ideaIndex / ideas.length) * 100}
            /> }
          </Flex>

          {!!ideas.length && <Flex
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
                      <Heading size="sm" alignSelf={'flex-end'}>
                        {ideaIndex+1} de {ideas.length}
                      </Heading>
                      <Heading size="lg" marginBottom={"2rem"}>
                        {idea.title}
                      </Heading>
                      <Flex
                          flexDirection={"column"}
                          bg="primary"
                          w="90vw"
                          minH="200px"
                          p={4}
                          color="primary"
                          borderColor="accent"
                          border="2px"
                          borderRadius="3px"
                          fontSize="22px"
                          position={'relative'}
                      >
                        <Tag size={'lg'} variant='solid' colorScheme='black' position={'absolute'} top={0} right={0}>
                          {idea.subject}
                        </Tag>
                        <Text color="black" mt={15} fontWeight={'bold'} fontSize={'1.2rem'}>
                          {idea.description}
                        </Text>

                        <Text color={'black'} mt={8} fontSize={'1rem'}>{idea.info}</Text>
                      </Flex>
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
                    variant={'link'}
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
                  variant={'link'}
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
                  variant={'link'}
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
                    variant={'link'}
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
          }
        </Flex>
      </main>
    </div>
  );
}
