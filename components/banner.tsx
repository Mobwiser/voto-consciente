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
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text fontSize="3xl" textAlign="center" color="accent">
              Verifica o teu posicionamento de acordo com a visão que tens da sociedade.
            </Text>
          </Heading>
          <Text fontSize={{ base: 'lg', lg: 'lg' }} color={'gray.500'} fontWeight={'bold'} textAlign="center">
            Descobre com que partido fazes match.
          </Text>
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
      <Flex flex={1} overflow={'hidden'}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          maxH={{ base: '50vh', md: '100%' }} // Adjusted max height for responsiveness
          maxW={'100%'}
          src={
            'votacao_img.jpg'
          }
        />
      </Flex>
    </Stack>
  );
}
