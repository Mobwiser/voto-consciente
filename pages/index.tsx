import { Button, Center, Flex, Heading, Link, Text, Image, Box, Stack } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import Banner from '../components/banner';
import React, { useEffect, useState } from 'react';
import {Party} from "./api/parties";
import {Debate} from "./api/debates";

const Home = () => {
  const [feedData, setFeedData] = useState(null);
  const [debates, setDebates] = useState([]);
  const [parties, setParties] = useState([]);
  const [partiesMap, setPartiesMap] = useState({});
  const [displayedNewsItems, setDisplayedNewsItems] = useState(5);
  const [displayedDebateItems, setDisplayedDebateItems] = useState(3);

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/news')
        .then((response) => response.json())
        .then((data) => {
          setFeedData(data);
        })
        .catch((error) => {
          console.error('Error fetching news data:', error);
        });

      fetch('/api/debates')
        .then((debatesResponse) => debatesResponse.json())
        .then((debatesData) => {
          setDebates(debatesData);
        })
        .catch((error) => {
          console.error('Error fetching debates data:', error);
        });

      fetch('/api/parties')
          .then((partiesResponse) => partiesResponse.json())
          .then((partiesData) => {
            setParties(partiesData);
            setPartiesMap(partiesData.reduce((partiesLogoMap: Record<string,Party>, party: Party) => ({...partiesLogoMap, [party.acronym]: party}), {}));
          })
          .catch((error) => {
            console.error('Error fetching debates data:', error);
          });
    };

    fetchData();
  }, []);

  const loadMoreNewsItems = () => {
    setDisplayedNewsItems(prev => prev + 5);
  };

  const loadMoreDebateItems = () => {
    setDisplayedDebateItems(prev => prev + 3);
  };

  if(!partiesMap || !parties || !debates) {
    return;
  }

  const NewsCard = ({ item }) => (
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
            _hover={{ bg: '#5966C6' }}
            size="md"
            borderRadius="full"
          >
            Ler Mais →
          </Button>
        </Link>
      </Flex>
    </Box>
  );

  const DebateCard = ({ debate, party1, party2, isFirst }) => (
    <Box
      borderRadius="lg"
      overflow="hidden"
      p={{ base: 4, sm: 6 }}
      bgColor={isFirst ? "#fab182" : "#f2f2f2"}
      maxW={{ base: 'full', sm: 'md', lg: 'lg' }}
      width="90%"
      margin="auto"
      mt={5}
    >
      {isFirst && (
        <Heading fontSize="x-large" color={'black'} fontWeight={'bold'} mb={4} textAlign={'center'}>
          Próximo Debate:
        </Heading>
      )}
      <Flex alignItems="center" mb={4}>
        <Image src={`parties/${party1.logo}`} alt={`${party1.name} Logo`} boxSize="4rem" mr={2} />
        <Center>
          <Stack>
            <Heading size="sm" textAlign="center">
              {party1.president} ({party1.acronym}) X {party2.president} ({party2.acronym})
            </Heading>
            <Text fontSize="md" fontWeight="bold" color="gray.500" textAlign="center" mt={2} borderRadius={4} >
              Canal: {debate.channel}<br />
              {new Date(debate.datetime.seconds * 1000).toLocaleTimeString('pt-BR', { timeStyle: 'short' })}<br />
              {new Date(debate.datetime.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'short' })}
            </Text>
            <Center mt={2}>
              {debate.url ? (
                <Link href={debate.url} isExternal>
                  <Button
                    bg="#5966B3"
                    color={'white'}
                    size="md"
                    borderRadius="full"
                    _hover={{ bg: '#5966C6' }}
                  >
                    Assistir Debate
                  </Button>
                </Link>
              ) : null}
            </Center>
          </Stack>
        </Center>
        <Image src={`parties/${party2.logo}`} alt={`${party2.name} Logo`} boxSize="4rem" ml={2} borderRadius={4} />
      </Flex>
    </Box>
  );

  return (
    <div>
      <Head>
        <title>Voto consciente</title>
        <meta name="description" content="Verifica a tua identidade politica de acordo com a tua visão da sociedade" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Navbar />

        <Flex align="center" justify="center" w="100vw">
          <Banner />
        </Flex>

        <Flex flexDirection="column" alignItems="center" w="100vw">
          <Box mt={5} p={4} bgColor="primary" w="100%">
            <Heading size="md" color="white" p={2} textAlign="center">
              Explora o teu alinhamento político através de um teste que compara as tuas
              opiniões com as ideias dos diferentes partidos parlamentares.
            </Heading>
          </Box>
        </Flex>

        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" w="100vw" mt="15px">
          {/* Debates section */}
          {debates.length > 0 && (
            <Box mt={5}>
              <Heading>
                <Center>Debates em Destaque</Center>
              </Heading>
              <br />

              {/* Implementar lógica de ir atualizando as informações dos debates para não mostrar aqueles que já passsaram */}
              {debates
                .slice(0, displayedDebateItems)
                .sort((a, b) => {
                  const dateA = new Date(a.datetime.seconds * 1000);
                  const dateB = new Date(b.datetime.seconds * 1000);
                  return dateA.getTime() - dateB.getTime(); // confirmar se o sort está correto
                })
                .map((debate: Debate, index) => (
                  <Center key={index}>
                    <DebateCard
                      debate={debate}
                      party1={partiesMap[debate.party1]}
                      party2={partiesMap[debate.party2]}
                      isFirst={index === 0} // identifição do primeiro card
                    />
                  </Center>
                ))}
              {displayedDebateItems < debates.length && (
                <Center mt={4}>
                  <Button onClick={loadMoreDebateItems} borderRadius="full">
                    Mais Debates
                  </Button>
                </Center>
              )}
            </Box>
          )}
        </Flex>

        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" w="100vw" mt="15px">
          {/* News section */}
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
                  <Button onClick={loadMoreNewsItems} borderRadius="full">Mais Notícias</Button>
                </Center>
              )}
            </Box>
          )}
        </Flex>

        <Box mt={5} p={5} w="100vw">
          {/* CTA section */}
          <Flex direction="column" align="center">
            <Heading fontSize={{ base: 'md', lg: 'lg' }} color={'black'} textAlign={'center'}>
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

        <Box mt={5} p={5} bgColor="#2596be" w="100vw">
          {/* MyEuribor ad section */}
          <Heading textAlign="center" mb={5} color="white">
            Queres melhoras as condições do teu crédito habitação?
            Descarrega a myEuribor e prevê o futuro do teu crédito.
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

        <Box mt={5} p={5} w="100vw">
          {/* mobwiser credits section */}
          <Center>
            <Flex direction="column" align="center">
              <Image src="mobwiser_logo.jpg" alt="mobiwser logo" h={'200px'} />
              <br></br>
              <Heading fontSize={{ base: 'md', lg: 'lg' }} color="primary" fontWeight={'bold'}>Desenvolvido @ Mobwiser</Heading>
            </Flex>
          </Center>
        </Box>

        <Center bg="#F1A16E" color="white" w="100vw">
          {/* Footer */}
          <Image src="logo.png" alt="Logo voto consciente" h={'100px'} />
        </Center>
      </main>
    </div>
  );
};

export default Home;
