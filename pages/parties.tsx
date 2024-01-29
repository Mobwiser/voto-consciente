import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import {useEffect, useState} from 'react';

import Head from 'next/head';
import {Party} from './api/parties';

export default function Parties() {
  const [parties, setParties] = useState<Party[]>();

  useEffect(() => {
    fetch('/api/parties').then((response) => response.json()).then((data) =>{
      setParties(data);
    });
  }, []);

  if(!parties?.length) {
    return; 
  }

  return (
    <div>
      <Head>
        <title>Partidos Políticos</title>
        <meta
          name="description"
          content="Listagem de partidos Políticos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          w="100vw"
          mt="15px"
        >
          <Heading
            size="lg"
            color="white"
            bgColor="accent"
            p={2}
            w={'100vw'}
            textAlign="center"
          >
            Partidos Políticos
          </Heading>
          <Stack spacing={10} mt={10}>
          {parties.map(party => (
            <Card 
              key={party.acronym} 
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='filled'
            >
              {party.image && (<Image
                objectFit='cover'
                width={100}
                height={100}
                src={party.image}
                alt={party.acronym}
              />)}

              <Stack>
                <CardBody>
                  <Heading size='md'>{party.acronym}</Heading>

                  <Text>
                    {party.name}
                  </Text>
                  <Text>
                    {party.slogan}
                  </Text>
                  <Text>
                    {party.site}
                  </Text>
                </CardBody>
              </Stack>
              <Stack justifyContent="space-around" padding={10}>
                <Link target="_blank" href={party.site}>
                  <Button variant='solid' bgColor="accent" color="white">
                      Visitar Website
                  </Button>
                </Link>
                <Link target="_blank" href={party.program}>
                  <Button variant='solid' colorScheme='blue'>
                      Ler Programa
                  </Button>
                </Link>
              </Stack>
            </Card>
            ))}
          </Stack>
        </Flex>
      </main>
    </div>
  );
}
