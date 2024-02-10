import {Box, Center, Flex, Heading, Image} from "@chakra-ui/react";
import React from "react";

export default function MobwiserBanner() {
    return (<Box mt={5} p={5} w="100vw">
        {/* mobwiser credits section */}
        <Center>
            <Flex direction="column" align="center">
                <Image src="mobwiser_logo.jpg" alt="mobiwser logo" h={'200px'} />
                <br></br>
                <Heading fontSize={{ base: 'md', lg: 'lg' }} color="primary" fontWeight={'bold'}>Desenvolvido @ Mobwiser</Heading>
            </Flex>
        </Center>
    </Box>)
}