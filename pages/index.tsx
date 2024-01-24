import {Button, Flex, Heading, Link, Text} from '@chakra-ui/react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
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
      </main>
    </div>
  );
}
