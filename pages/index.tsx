import { Button, Center, Flex, Heading, Link, Text, Image, Box, Stack, } from '@chakra-ui/react';
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

  // logica nao funciona se adicionarmos logo todas as datas de debates - se for assim temos de ver
  // qual deles tem a data mais proxima a current.date mas sempre para a frente
  // ordenar debates para pegar o proximo - has to be the last added
  const getNextDebateInfo = () => {
    if (debates.length > 0) {
      // ordenando do mais recente para o mais antigo
      const sortedDebates = debates.sort((a, b) => b.datetime.seconds - a.datetime.seconds);

      // selecionar o primeiro do array sorted
      const nextDebate = sortedDebates[0];

      if (nextDebate) {
        const formattedDate = new Date(nextDebate.datetime.seconds * 1000).toLocaleDateString();
        return (
          <>
            <span>{nextDebate.title}</span>
            <br />
            <span style={{ fontWeight: 'bold' }}>{formattedDate}</span>
          </>
        );
      }
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
      maxW={{ base: 'full', sm: 'md', lg: 'lg' }}
      width="90%"
      margin="auto"
    >
      <Heading size="md" mb={4}>
        {item.title}
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="sm" color="gray.500">
          {new Date(item.pubDate).toLocaleDateString()}
        </Text>
        <Link href={item.link} isExternal>
          <Button
            bg="#5966B3"
            color="white"
            _hover={{
              bg: '#5966C6',
            }}
            size="md"
            borderRadius="full"
          >
            Ler Mais →
          </Button>
        </Link>
      </Flex>
      <Text fontSize="md">{item.description}</Text>
    </Box>
  );

  // construcao das cards dos debates - nao e necessario passar logos mas falta implementar logica correta
  const DebateCard = ({ debate, party1Logo, party2Logo }) => (
    <Box
      borderRadius="lg"
      overflow="hidden"
      p={{ base: 4, sm: 6 }}
      bgColor="#E8E8E8"
      maxW={{ base: 'full', sm: 'md', lg: 'lg' }}
      width="90%"
      margin="auto"
    >
      <Flex alignItems="center" mb={4}>
        <Image src={party1Logo} alt="Party 1 Logo" boxSize="100px" mr={2} />
        <Center>
          <Stack>
            <Heading size="md" textAlign="center">
              {debate.title}
            </Heading>
            <Text fontSize="sm" fontWeight="bold" color="gray.500" textAlign="center">
              {new Date(debate.datetime.seconds * 1000).toLocaleDateString()}
            </Text>
            <Center mt={4}>
              <Link href={debate.url} isExternal>
                <Button
                  bg="#5966B3"
                  color={'white'}
                  size="md" // Increased button size
                  borderRadius="full" // Added more roundness
                  _hover={{
                    bg: '#5966C6',
                  }}
                >
                  Assistir Debate
                </Button>
              </Link>
            </Center>
          </Stack>
        </Center>
        <Image src={party2Logo} alt="Party 2 Logo" boxSize="100px" ml={2} />
      </Flex>
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

        {/* explanation small header */}
        <Flex flexDirection="column" alignItems="center">
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
        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" w="100vw" mt="15px">
          {debates.length > 0 && (
            <Box mt={5}>
              <Heading>
                <Center>Debates em Destaque</Center>
              </Heading>
              <br></br>
              {/* proximo debate section */}
              <Text textAlign={'center'} color={'#5966B3'} fontWeight={'bold'}>Próximo Debate:</Text>
              <Text textAlign={'center'}>{getNextDebateInfo()}</Text>
              <br></br>
              {debates.slice(0, displayedDebateItems).map((debate, index) => (
                <Center key={index}>
                  <DebateCard
                    debate={debate}
                    party1Logo="logo.png"  // placeholder
                    party2Logo="logo.png"  // placeholder
                  />
                </Center>
              ))}
              {displayedDebateItems < debates.length && (
                <Center>
                  <Button onClick={loadMoreDebateItems}>Mais Debates</Button>
                </Center>
              )}
            </Box>
          )}
        </Flex>

        {/* News Section */}
        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" w="100vw" mt="15px">
          {feedData && (
            <Box mt={5}>
              <Heading>
                <Center>Últimas Notícias</Center>
              </Heading>
              <Stack spacing={5} mt={5}>
                {feedData.items
                  .slice(0, displayedNewsItems) // Limit the number of displayed items
                  .sort((a, b) => {
                    const dateA = new Date(a.pubDate);
                    const dateB = new Date(b.pubDate);
                    return dateB.getTime() - dateA.getTime(); // Sort by publication date (most recent first)
                  })
                  .map((item, index) => (
                    <NewsCard key={index} item={item} onClick={() => (window.location.href = item.link)} />
                  ))}

              </Stack>
              {displayedNewsItems < feedData.items.length && (
                <Center mt={4}>
                  <Button onClick={loadMoreNewsItems} borderRadius="full"
                  >Mais Notícias</Button>
                </Center>
              )}
            </Box>
          )}
        </Flex>

        {/* CTA bottom section */}
        <Box mt={5} p={5}>
          <Flex direction="column" align="center">
            <Heading fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'} textAlign={'center'}>
              Verifica a tua compatibilidade com os diferentes partidos políticos com assento parlamentar aqui.
            </Heading>
            <br></br>
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

        {/* mobwiser credits */}
        <Box mt={5} p={5}>
          <Center>
            <Flex direction="column" align="center">
              <Image src="mobwiser_logo.jpg" alt="Logo voto consciente" h={'200px'} />
              <br></br>
              <Heading fontSize={{ base: 'md', lg: 'lg' }} color="primary" fontWeight={'bold'}>Desenvolvido @ Mobwiser</Heading>
            </Flex>
          </Center>
        </Box>

        {/* MyEuribor ad section*/}
        <Box mt={5} p={5} bgColor="#2596be">
          <Heading textAlign="center" mb={5} color="white">
            Problemas com Crédito Habitação? Download MyEuribor e começa já a controlar o teu futuro!
          </Heading>
          <Flex justifyContent="center">
            <Box className="image-block-10" textAlign="center" mr={5}>
              <Link href="https://apps.apple.com/us/app/my-euribor/id6444867657" target="_self">
                <Image
                  src="https://bucket.mlcdn.com/a/1663/1663214/images/a5554db599f3e15d98a05b91e782ea5305ae445f.png"
                  alt=""
                  maxW="178px"
                  maxH="178px"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Link>
            </Box>
            <Box className="image-block-15" textAlign="center">
              <Link href="https://play.google.com/store/apps/details?id=pt.mobwiser.my_euribor" target="_self">
                <Image
                  src="https://bucket.mlcdn.com/a/1663/1663214/images/111b33d7a34a467e989ce23e27d6f2b2db41e07d.jpeg"
                  alt=""
                  maxW="169px"
                  maxH="169px"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Link>
            </Box>
          </Flex>
        </Box>


        {/* footer improvisado */}
        <Center bg="#F1A16E" color="white">
          <Image src="logo.png" alt="Logo voto consciente" h={'100px'} />
        </Center>

      </main>
    </div>

  );
};

export default Home;
