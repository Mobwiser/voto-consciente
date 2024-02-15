import {Box, Flex, Heading, Image, Link} from "@chakra-ui/react";
import React from "react";
import {writeEvent} from "../pages/api/analytics";

export default function MyEuriborAd () {
    const onAdClick = (device: string) => {
        writeEvent('my-euribor-ad', {device});
    }
    return (
        <Box mt={5} p={5} bgColor="#2596be" w="100vw">
            {/* MyEuribor ad section */}
            <Heading textAlign="center" mb={5} color="white">
                Queres melhorar as condições do teu crédito habitação?
                Descarrega a <Link href={"https://myeuribor.pt"} target={'_blank'} onClick={() => onAdClick('landing')} textDecoration={'underline'}>myEuribor</Link> e prevê o futuro do teu crédito.
            </Heading>
            <Flex justifyContent="center">
                <Box className="image-block-10" textAlign="center" mr={5}>
                    <Link href="https://apps.apple.com/us/app/my-euribor/id6444867657" target="_self" onClick={() => onAdClick('ios')}>
                        <Image
                            src="https://bucket.mlcdn.com/a/1663/1663214/images/a5554db599f3e15d98a05b91e782ea5305ae445f.png"
                            alt=""
                            maxW="178px"
                            maxH="178px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                    </Link>
                </Box>
                <Box className="image-block-15" textAlign="center">
                    <Link href="https://play.google.com/store/apps/details?id=pt.mobwiser.my_euribor" target="_self" onClick={() => onAdClick('android')}>
                        <Image
                            src="https://bucket.mlcdn.com/a/1663/1663214/images/111b33d7a34a467e989ce23e27d6f2b2db41e07d.jpeg"
                            alt=""
                            maxW="169px"
                            maxH="169px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                    </Link>
                </Box>
            </Flex>
        </Box>
    )
}