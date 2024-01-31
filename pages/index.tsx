import { Button, Center, Flex, Heading, Link, Text, Image, Box, Stack } from '@chakra-ui/react';
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

        {/* RSS Feed Section */}
        {feedData && (
          <Box>
            <Heading>
              <Center>Últimas Notícias</Center>
            </Heading>
            {feedData.items.slice(0, displayedNewsItems).map((item, index) => (
              <Center>
              <Box key={index} borderWidth="1px" borderRadius="lg" p="4" my="4">
                <Heading size="md">{item.title}</Heading>
                <Text>{new Date(item.pubDate).toLocaleDateString()}</Text>
                <Text>{item.description}</Text>
                <Button onClick={() => (window.location.href = item.link)}>→</Button>
              </Box>
              </Center>
            ))}
            {displayedNewsItems < feedData.items.length && (
              <Center>
                <Button onClick={loadMoreNewsItems}>Mais Notícias</Button>
              </Center>
            )}
          </Box>
        )}

       
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
