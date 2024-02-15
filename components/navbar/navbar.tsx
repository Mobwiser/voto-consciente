import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Stack,
    useColorModeValue,
    useDisclosure,
    Link
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import {writeEvent} from "../../pages/api/analytics";
  
  const Links = [
      {name: "Home",
      path: "/"},
      {name: "Votação",
      path: "/votation"},
      {name: "Partidos",
      path: "/parties"}
      ];
  
      const NavLink = ({ children, path }: { children: ReactNode, path: string }) => {
        const { pathname } = useRouter();
        const isActive = path === pathname;
      
        return (
          <Link href={path} >
            <Button
              variant="link"
              borderBottom={isActive ? '2px solid black' : '2px solid transparent'}
              color={isActive ? 'black' : 'gray'}
              paddingBottom="2px"
              borderRadius={0}
              cursor="pointer"
              transition="color 0.3s ease, border-bottom 0.3s ease-in-out"
              _hover={{
                color: 'black',
              }}
            >
              {children}
            </Button>
          </Link>
        );
      };
  
  export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

      const onAdBannerClick = () => writeEvent('ad-nav-banner', {});
    return (
      <>
      <Box position={'fixed'}
           top={0}
           width={'100vw'}
           height={'3.5rem'}
           bgColor={'#2596be'}
           color={'#fff'}
           fontSize={'0.85rem'}
           zIndex={9999}
           p={2}>
          Prevê o futuro do teu crédito habitação com a {' '}
          <Link href={'http://myeuribor.pt'} target={'_blank'} textDecoration={'underline'} onClick={onAdBannerClick}>myEuribor.</Link>
      </Box>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} marginTop={'3.5rem'}>
          <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'lg'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Image src="/logo.png" alt="Logo" style={{ width: '80px', height: '80px'}} />
              <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                {Links.map(({name, path}) => (
                  <NavLink key={path} path={path}>
                      {name}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
  
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
              {Links.map(({name, path}) => (
                  <NavLink key={path} path={path}>
                      {name}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    )
  }