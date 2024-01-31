import { Button, Center, Flex, Heading, Link, Text, Image, Box, Stack, Card, CardBody } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import Banner from '../components/banner';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [feedData, setFeedData] = useState(null);
  const [debates, setDebates] = useState([]);
  const [displayedNewsItems, setDisplayedNewsItems] = useState(5);
  const [displayedDebateItems, setDisplayedDebateItems] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setFeedData(data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }

      try {
        const debatesResponse = await fetch('/api/debates');
        const debatesData = await debatesResponse.json();
        setDebates(debatesData);
      } catch (error) {
        console.error('Error fetching debates data:', error);
      }
    };

    fetchData();
  }, []);

  const loadMoreNewsItems = () => {
    setDisplayedNewsItems(prev => prev + 5);
  };

  const loadMoreDebateItems = () => {
    setDisplayedDebateItems(prev => prev + 3);
  };

  // lógica não testada e so funciona se a ultima entry for a mais recente
const getNextDebateInfo = () => {
  if (debates.length > 0) {
    const nextDebate = debates[0];
    const formattedDate = new Date(nextDebate.datetime.seconds * 1000).toLocaleDateString();
    return `Próximo Debate: ${formattedDate} - ${nextDebate.title}`;
  }
  return "No upcoming debates scheduled";
};

// construcao das cards do news feed
const NewsCard = ({ item, onClick }) => (
<Box
  borderRadius="lg"
  overflow="hidden"
  p={{ base: 4, sm: 6 }}
  bgColor="#E8E8E8"
  maxW={{ base: 'full', sm: 'md' }} // Adjusted max width to 'md' for medium size
  width="90%"
  margin="auto" // Center the component by adding auto margin
>
    <Heading size="md" mb={4}>
      {item.title}
    </Heading>
    <Text fontSize="sm" color="gray.500" mb={4}>
      {new Date(item.pubDate).toLocaleDateString()}
    </Text>
    <Text fontSize="md">{item.description}</Text>
    <Center mt={4}>
    <Link href={item.link} isExternal>
      <Button bg="#5966B3" color={'white'}
              _hover={{
                bg: '#5966C6',
              }} size="sm">
        Ler Mais
      </Button>
    </Link>
    </Center>
  </Box>
);

// construcao das cards dos debates
const DebateCard = ({ debate, onClick }) => (
  <Box
    borderRadius="lg"
    overflow="hidden"
    p={{ base: 4, sm: 6 }}
    bgColor="#E8E8E8"
    maxW={{ base: 'full', sm: 'md' }}
    width="90%"
    margin="auto"
  >
    <Heading size="md" mb={4}>
      {debate.title}
    </Heading>
    <Text fontSize="sm" color="gray.500" mb={4}>
      {debate.channel} - {new Date(debate.datetime.seconds * 1000).toLocaleDateString()}
    </Text>
    <Text fontSize="md">{debate.description}</Text>
    <Center mt={4}>
      <Link href={debate.url} isExternal>
        <Button bg="#5966B3" color={'white'} size="sm">
          Assistir Debate
        </Button>
      </Link>
    </Center>
  </Box>
);

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

        {/* Banner Section */}
        <Flex align="center" justify="center">
          <Banner />
        </Flex>

        {/* Visão da sociedade Section */}
        <Flex
          flexDirection="column"
          alignItems="center"
        >
          <Heading
            size="md"
            color="white"
            bgColor="accent"
            p={2}
            w={'100vw'}
            textAlign="center"
          >
            Explora o teu alinhamento político através de um teste que compara as tuas
            opiniões com as ideias de partidos parlamentares.
          </Heading>
        </Flex>

        <Flex
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          w="100vw"
          mt="15px"
        >
        {/* Debates Section */}
        {debates.length > 0 && (
          <Box>
            <Heading>
              <Center>Debates em Destaque</Center>
            </Heading>
            {debates.slice(0, displayedDebateItems).map((debate, index) => (
              <Center>
              <Box key={index} borderWidth="1px" borderRadius="lg" p="4" my="4">
                <Heading size="md">{debate.title}</Heading>
                <Text>{debate.description}</Text>
                <Text>{debate.channel}</Text>
                <Text>{new Date(debate.datetime.seconds * 1000).toLocaleDateString()}</Text>
                <Link href={debate.url} isExternal>
                  <Button>Assistir Debate</Button>
                </Link>
              </Box>
              </Center>
            ))}
            {displayedDebateItems < debates.length && (
              <Center>
                <Button onClick={loadMoreDebateItems}>Mais Debates</Button>
              </Center>
            )}
            <Center><Text>{getNextDebateInfo()}</Text></Center>
          </Box>
          
        )}
        </Flex>

        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" w="100vw" mt="15px">
      {/* RSS Feed Section */}
      {feedData && (
        <Box>
          <Heading>
            <Center>Últimas Notícias</Center>
          </Heading>
          <Stack spacing={10} mt={10}>
            {feedData.items.slice(0, displayedNewsItems).map((item, index) => (
              <NewsCard key={index} item={item} onClick={() => (window.location.href = item.link)} />
            ))}
          </Stack>
          {displayedNewsItems < feedData.items.length && (
            <Center mt={4}>
              <Button onClick={loadMoreNewsItems}>Mais Notícias</Button>
            </Center>
          )}
        </Box>
      )}
    </Flex>

       <Box>
       <Flex direction="column" align="center">
        <Heading fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
        Verifica a compatibilidade entre ti e os diferentes partidos políticos com assento parlamentar, através a tua opinião sobre as ideias que estes defendem
          </Heading>

        
            <Link href="/votation">
            <Button
              rounded={'full'}
              bg={'#5966B3'}
              color={'white'}
              _hover={{
                bg: '#5966C6',
              }}>
              Começar Agora!
            </Button>
            </Link>
            </Flex>
          </Box>

          <Center>
  <Flex direction="column" align="center">
    <Image src="mobwiser_logo.jpg" alt="Logo voto consciente" h={'100px'} />
    <Text>Desenvolvido @ Mobwiser</Text>
  </Flex>
</Center>


        <Center bg="#F1A16E" color="white">
          <Image src="logo.png" alt="Logo voto consciente" h={'100px'} />
        </Center>
        
      </main>
    </div>
    
  );
};

export default Home;
