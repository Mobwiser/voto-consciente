import { Button, Center, Flex, Heading, Link, Text, Image, Box } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [feedData, setFeedData] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setFeedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const loadMoreItems = () => {
    setDisplayedItems(prev => prev + 5);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Voto consciente</title>
      </Head>

      <main className={styles.main}>
        <Navbar />
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          w="100vw"
          h="100vh"
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
          <Text fontSize="3xl" textAlign="center" color="accent">
            Verifica o teu posicionamento de acordo com a visão que tens da
            sociedade.
          </Text>
          <Text fontSize="xl" textAlign="center">
            Verifica a compatibilidade entre ti e os diferentes partidos
            políticos com assento parlamentar, através a tua opinião sobre as
            ideias que estes defendem.
          </Text>
          <Link href="/votation">
            <Button colorScheme="teal" variant="outline">
              Começa já!
            </Button>
          </Link>
        </Flex>
        {/* Display RSS Feed items */}
        {feedData && (
          <Box>
            <Heading><Center>Últimas Notícias</Center></Heading>
            {feedData.items.slice(0, displayedItems).map((item, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" p="4" my="4">
                <Heading size="md">{item.title}</Heading>
                <Text>{new Date(item.pubDate).toLocaleDateString()}</Text>
                <Text>{item.description}</Text>
                <Button onClick={() => window.location.href = item.link}>→</Button>
              </Box>
            ))}
            {displayedItems < feedData.items.length && (
              <Center><Button onClick={loadMoreItems}>Load More</Button></Center>
            )}
          </Box>
        )}

        <Center bg='tomato' color='white'>
          <Image src='logo.png' alt='Logo voto consciente' h={'100px'} />
        </Center>
      </main>
    </div>
  );
};

export default Home;
