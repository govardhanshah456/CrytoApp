import React, { useState, useEffect } from 'react'
import axios from "axios";
import { server } from "../main"
import { Container, HStack, RadioGroup, Radio, Button, Heading, Text, Image, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';
const Coins = () => {
    const [coin, setCoin] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState("inr")
    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    };
    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoin(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchExchanges();
    }, [currency, page]);
    const btns = new Array(132).fill(1)
    if (error)
        return <ErrorComponent />;
    return (
        <Container maxW={"container.xl"}>
            {loading ? <Loader /> : <><RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                    <Radio value={"inr"}>INR</Radio>
                    <Radio value={"usd"}>USD</Radio>
                    <Radio value={"eur"}>EUR</Radio>
                </HStack>
            </RadioGroup><HStack wrap={"wrap"}>{coin.map((i) => (
                <CoinCard name={i.name}
                    id={i.id}
                    price={i.current_price}
                    img={i.image}
                    symbol={i.symbol}
                    currencySymbol={currencySymbol} />
            ))}</HStack><HStack w={"full"} overflowX={"auto"} p={"8"}>
                    {btns.map((item, index) => (
                        <Button
                            key={index}
                            bgColor={"blackAlpha.900"}
                            color={"white"}
                            onClick={() => changePage(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </HStack></>}
        </Container>
    )
}
const CoinCard = ({ name, id, price, img, symbol, currencySymbol = "₹" }) => (
    <Link to={`/coin/${id}`}>
        <VStack w={52} shadow={'lg'} p={8} borderRadius={'lg'} transition={"all 0.3s"} m={4} css={{
            "&:hover": {
                transform: "scale(1.1)",
            },
        }}>
            <Image src={img} w={10} h={10} objectFit={"contain"} />
            <Heading>{symbol}</Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
        </VStack>
    </Link>
);
export default Coins