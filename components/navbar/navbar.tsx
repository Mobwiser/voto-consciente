import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
  } from '@chakra-ui/react'
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
  import Link from 'next/link';
  import { ReactNode } from 'react';
  
  interface Props {
    children: React.ReactNode
  }
  
  const Links = [
      {name: "Home",
      path: "/"},
      {name: "Votation",
      path: "/"},
      {name: "Partidos",
      path: "/"}
      ];
  
  const NavLink = ({ children, path }: {children: ReactNode, path:string }) => {
      return (
      <Link
        href={path}>
        {children}
      </Link>
      );
  };
  
  export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <img src="/logo.png" alt="Logo" style={{ width: '80px', height: '80px'}} />
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