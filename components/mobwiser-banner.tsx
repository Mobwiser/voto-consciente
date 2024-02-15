import {Box, Center, Flex, Heading, Image, Link} from "@chakra-ui/react";
import React from "react";
import {writeEvent} from "../pages/api/analytics";

export default function MobwiserBanner() {
    const onLinkClick = () => {
        writeEvent('mobwiser-link-click');
    }
    return (<Box mt={5} p={5} w="100vw">
        {/* mobwiser credits section */}
        <Center>
            <Link href="https://mobwiser.com" target="_blank" onClick={onLinkClick}>
                <Flex direction="column" align="center">
                    <Image src="mobwiser_logo.jpg" alt="mobiwser logo" h={'200px'} />
                    <br></br>
                    <Heading fontSize={{ base: 'md', lg: 'lg' }} color="primary" fontWeight={'bold'}>Desenvolvido @ Mobwiser</Heading>
                </Flex>
            </Link>
        </Center>
    </Box>)
}