import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function Banner() {
  return (
    <Stack maxH={'40vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text fontSize="3xl" textAlign="center" color="accent">
              Verifica o teu posicionamento de acordo com a visão que tens da
              sociedade.
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Descobre com que partido fazes match.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Link href="/votation">
            <Button
              rounded={'full'}
              bg={'#5966B3'}
              color={'white'}
              _hover={{
                bg: '#5966C6',
              }}>
              Testar Agora!
            </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}  overflow={'hidden'}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          maxH={'80%'} // Set maximum height
          maxW={'100%'} // Set maximum width
          src={
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
