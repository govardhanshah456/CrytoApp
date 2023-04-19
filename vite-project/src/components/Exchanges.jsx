import React, { useState, useEffect } from 'react'
import axios from "axios";
import { server } from "../main"
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
const Exchanges = () => {
    const [exchanges, setExchanges] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchExchanges();
    }, []);
    if (error)
        return <ErrorComponent />;
    return (
        <Container maxW={"container.xl"}>
            {loading ? <Loader /> : <><HStack wrap={"wrap"}>{exchanges.map((i) => (
                <ExchnageCard name={i.name} rank={i.trust_score_rank} img={i.image} url={i.url} />
            ))}</HStack></>}
        </Container>
    )
}
const ExchnageCard = ({ name, rank, img, url }) => (
    <a href={url} target={""}>
        <VStack w={52} shadow={'lg'} p={8} borderRadius={'lg'} transition={"all 0.3s"} m={4} css={{
            "&:hover": {
                transform: "scale(1.1)",
            },
        }}>
            <Image src={img} w={10} h={10} objectFit={"contain"} />
            <Heading>{rank}</Heading>
            <Text>{name}</Text>
        </VStack>
    </a>
);
export default Exchanges