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
import styles from '../styles/Home.module.css';
import {FaQuestion, FaRegGrinAlt, FaRegAngry, FaRegFrown} from 'react-icons/fa';
import React, {useState} from 'react';
import {Subjects, SupportValues} from './api/parties';
import {useRouter} from 'next/router';
import {useAppContext} from '../context/AppContext';
import {getVotation, Idea} from "./api/ideas";

export default function Votation() {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [subjects, setSubjects] = useState<string[]>(Object.keys(Subjects));
  const [showVotationForm, setShowVotationForm] = useState(false);

  const router = useRouter();

  const [_appState, setAppState] = useAppContext();

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
    getVotation(subjects).then((data) => {
      setIdeas(data);
      setShowVotationForm(true);
      setAppState((prevState) => ({
        ...prevState,
        ideas: data.reduce((ideasMap: Record<string, Idea>, idea: Idea) => ({...ideasMap, [idea.id.toString()]: idea}), {} ),
      }));
    })
  }

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

            {!showVotationForm && <Heading
                size="md"
                color="white"
                p={2}
                marginTop={10}
                marginBottom={10}
                w={'100vw'}
            >
              Escolhe os temas que queres ver cobertos no questionário?
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



            {!ideas.length && <Button
                size='md'
                height='48px'
                width='90vw'
                border='2px'
                borderColor='green.500'
                onClick={startQuiz}
            >
              Começar
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
          }
        </Flex>
      </main>
    </div>
  );
}
