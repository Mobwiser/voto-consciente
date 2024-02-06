import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';

export default function Banner() {
  return (
    <Stack mt={5} direction={{ base: 'column', md: 'row' }} spacing={4} maxH={{ base: 'unset', md: '40vh' }}>
      <Flex flex={1} overflow={'hidden'}>
        <Image
            alt={'votação'}
            objectFit={'cover'}
            maxW={'100%'}
            w={'100vw'}
            src={'banner.webp'}
        />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            <Text fontSize="2xl" textAlign="center" color="accent">
             Colocámos a inteligência a artificial a analisar os programas políticos e criámos um quiz para perceberes com que partido te identificas mais.
            </Text>
          </Heading>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justifyContent={'center'} align={'center'}>
            <Link href="/votation">
              <Button
                rounded={'full'}
                bg={'#5966B3'}
                color={'white'}
                size="lg"
                _hover={{
                  bg: '#5966C6',
                }}>
                Testar Agora!
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>

    </Stack>
  );
}
