import {
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';

import Head from 'next/head';
import { Party } from './api/parties';
import Navbar from '../components/navbar/navbar';

export default function Parties() {
  const [parties, setParties] = useState<Party[]>();

  useEffect(() => {
    fetch('/api/parties').then((response) => response.json()).then((data) => {
      setParties(data.sort((a,b) => a.name.localeCompare(b.name)));
    });
  }, []);

  if (!parties?.length) {
    return;
  }

  return (
    <div>
      <Head>
        <title>Partidos Políticos</title>
      </Head>

      <main>
        <Navbar />
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          w="100vw"
        >
          <Heading size="lg" color="white" bgColor="accent" p={2} w={'100vw'} textAlign="center">
            Partidos Políticos
          </Heading>
          <Stack spacing={8} mt={8} maxWidth={"90%"}>
  {parties.map(party => (
    <Card
      key={party.acronym}
      overflow='hidden'
      variant='filled'
      p="4"
    >
      <Flex alignItems="center">
        <Image src={`parties/${party.logo}`} alt={`${party.name} Logo`} boxSize="6rem" borderRadius={4} />
        <Stack ml={5}>
          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">{party.name}</Text> ({party.acronym})
          </Text>
          <Text>{party.slogan}</Text>
        </Stack>
      </Flex>
      <Stack flexGrow={1} spacing={4} mt={4}>
        <Stack spacing={4}>
          <Link target="_blank" href={party.site}>
            <Button flex="1" variant='solid' bgColor="primary" color="white" w="100%">
              Visitar Website
            </Button>
          </Link>
          <Link target="_blank" href={party.program}>
            <Button flex="1" variant='solid' bgColor="accent" colorScheme='blue' w="100%">
              Ler Programa
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Card>
  ))}
</Stack>
        </Flex>

      </main>
    </div>
  );
}
