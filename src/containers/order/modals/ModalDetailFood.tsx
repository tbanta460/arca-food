import React, { Dispatch, SetStateAction, useState } from "react"
import { Image, Modal, ModalBody, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, Button, Text, Heading, Box, Stack, Flex } from "@chakra-ui/react";
import { formatCurrency } from "@/helper/formatCurrency";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import useDecryptedDataFood from "../useDecryptedDataFood";
import { toast } from "react-toastify";
import useGenerateUniqueCartId from "../useGenerateUniqueCartId";
// Key penting saya sengaja tidak taruh di .env karena untuk menghemat waktu;
export const secretKey: string = "SSPhSLnmn295SSfx25LJKwopzn55617d"
export const secretCookie: string = "AQlfkSwAAf3014rdkZXC"
interface InitialPropsModalDetailFood {
    isOpen: boolean;
    onClose: () => void;
    dataFood: { [key: string]: any };
    setDataDetailForFood: Dispatch<SetStateAction<{ [key: string]: any } | null>>
}
const ModalDetailFood = ({ isOpen, onClose, dataFood, setDataDetailForFood }: InitialPropsModalDetailFood) => {
    const [count, setCount] = useState<number>(1);
    // const dataFoodDecrypted: { [key: string]: any } | null = useDecryptedDataFood();
    const handleAddToCart = () => {
        const dataFoodDecrypted: { [key: string]: any } | null = useDecryptedDataFood();
        dataFood.qty = count
        const orderId = useGenerateUniqueCartId();
        dataFood.orderId = orderId
        const dataToCookies = {
            data: dataFoodDecrypted === null ? [dataFood] : [...dataFoodDecrypted?.data, dataFood]
        }
        const encryptedTimer = CryptoJS.AES.encrypt(JSON.stringify(dataToCookies), secretKey).toString();
        localStorage.setItem(secretCookie, encryptedTimer);
        toast.success("Successfully add to cart!", {
            theme: "colored",
            position: "top-center",
            style: { height: "100px" }
        });
        onClose()
        setDataDetailForFood(null)
    }
    
    return (
        <>
            <Modal size={"xl"} isOpen={isOpen} onClose={() => {
                onClose()
                setDataDetailForFood(null)
            }}>
                <ModalOverlay />
                <ModalContent maxW={"950px"}>
                    <ModalHeader>Detail Food</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} gap="20px" flexDirection={{lg:"row", md:"column", sm:"column"}} justifyContent={"center"} >
                        <Image src={dataFood?.image ?? "#"} alt={dataFood?.name} width="400px" textAlign={"center"} />
                        <Box>
                            <Heading fontSize={"30px"} mb="20px">{dataFood?.name ?? "-"}</Heading>
                            <Text mb="10px">{dataFood?.description ?? "-"}</Text>
                            <Stack my="6px" display={"flex"} gap="5px" flexDirection="row">
                                <Text >Category: </Text>
                                <Text color="#E98B33" fontWeight={"bold"}>{dataFood?.category ?? "-"}</Text>
                            </Stack>
                            <Stack my="6px" display={"flex"} gap="5px" flexDirection="row">
                                <Text>Ingredients: </Text>
                                <Text color="#E98B33" fontWeight={"bold"}>{dataFood?.ingredients?.map((ing: { ingredient: string }) => ing?.ingredient)?.join(", ") ?? "-"}</Text>
                            </Stack>
                            <Stack my="6px" display={"flex"} gap="5px" flexDirection="row">
                                <Text >Tags:</Text>
                                <Text color="#E98B33" fontWeight={"bold"}>{dataFood?.tags?.map((ing: { tag: string }) => ing?.tag)?.join(", ") ?? "-"}</Text>
                            </Stack>
                            <Stack my="6px" display={"flex"} gap="5px" flexDirection="row">
                                <Text >Rating: </Text>
                                <Text color="#E98B33" fontWeight={"bold"}>{dataFood?.rating ?? "-"}</Text>
                            </Stack>
                            <Stack>
                                <Heading fontSize={"25px"}>{formatCurrency(((dataFood?.price ?? 0) * count))}</Heading>
                            </Stack>
                            <Stack>
                                <Flex alignItems={"center"} gap="20px" mt="20px">
                                    <Button onClick={() => {
                                        setCount((prev) => prev <= 1 ? 1 : prev - 1)
                                    }}>-</Button>
                                    <Box>{count}</Box>
                                    <Button onClick={() => {
                                        setCount((prev) => prev + 1)
                                    }}>+</Button>
                                </Flex>
                            </Stack>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='solid' color={"white"} background={"#E98B33"} onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                        <Button variant="ghost" colorScheme='red' mr={3} onClick={() => {
                            setDataDetailForFood(null);
                            onClose()
                        }}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalDetailFood;