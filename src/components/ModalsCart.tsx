import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { Image, Modal, ModalBody, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, Button, Text, Heading, Box, Stack, Flex, Divider } from "@chakra-ui/react";
import { formatCurrency } from "@/helper/formatCurrency";
import CryptoJS from "crypto-js";
import useDecryptedDataFood from "@/containers/order/useDecryptedDataFood";
import { toast } from "react-toastify";
// Key penting saya sengaja tidak taruh di .env karena untuk menghemat waktu;
import { secretCookie, secretKey } from "@/containers/order/modals/ModalDetailFood";
interface InitialPropsModalCart {
    isOpen: boolean;
    onClose: () => void;
}
const ModalCart = ({ isOpen, onClose }: InitialPropsModalCart) => {
    const dataFoodDecrypted: { [key: string]: any } | null = useDecryptedDataFood();
    const dataFoods: Array<{ [key: string]: any }> = dataFoodDecrypted?.data ?? [];
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        isClient && setIsClient(false)
    }, [setIsClient, isClient])
    const handleRemoveCart = (dataFood: {[key:string]: any}) => {
        const hasFilteredData = dataFoods?.filter((data) => data?.orderId?.toString() !== dataFood?.orderId?.toString())
       
        const dataToCookies = {
            data: hasFilteredData
        }
        const encryptedTimer = CryptoJS.AES.encrypt(JSON.stringify(dataToCookies), secretKey).toString();
        localStorage.setItem(secretCookie, encryptedTimer);
        toast.success("Successfully remove", {
            theme: "colored",
            position: "top-center",
            style: { height: "100px" }
        });
        setIsClient(true)
    }   

    return (
        <>
            <Modal size={"xl"} isOpen={isOpen} onClose={() => {
                onClose()
            }}>
                <ModalOverlay />
                <ModalContent maxW={"950px"}>
                    <ModalHeader>Cart</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} gap="20px" flexDirection={"column"} justifyContent={"center"} >
                        {
                            dataFoodDecrypted && dataFoods.map((dataFood) => (
                                <Fragment key={dataFood?.orderId}>
                                    <Flex gap="10px">
                                        <Image src={dataFood?.image ?? "#"} alt={dataFood?.name} width="130px" textAlign={"center"} />
                                        <Box>
                                            <Heading fontSize={"20px"} mb="20px">{dataFood?.name ?? "-"}</Heading>

                                            <Stack my="6px" display={"flex"} gap="5px" flexDirection="row">
                                                <Text >Qty: </Text>
                                                <Text color="#E98B33" fontWeight={"bold"}>{dataFood?.qty ?? "1"}</Text>
                                            </Stack>
                                            <Stack my="6px" display={"flex"} gap="5px" flexDirection="row">
                                                <Text >Price: </Text>
                                                <Text color="#E98B33" fontWeight={"bold"}>{formatCurrency((dataFood?.price ?? 0) * dataFood?.qty)}</Text>
                                            </Stack>
                                            <Text color="red" fontWeight={"bold"} cursor={"pointer"} onClick={() => handleRemoveCart(dataFood)}>Remove</Text>
                                        </Box>
                                    </Flex>
                                </Fragment>
                            ))
                        }
                        <Divider />
                        <Box display={"flex"} gap="20px">
                            <Heading fontSize={"xl"}>Total:</Heading>
                            <Heading fontSize={"xl"} color="#E98B33">{dataFoodDecrypted ? formatCurrency(dataFoods?.reduce((acc,cur) => acc + (cur?.price * cur?.qty), 0)) : "RP 0"}</Heading>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='solid' color={"white"} background={"#E98B33"} onClick={() => {
                            toast.success("Successfully order", {
                                theme: "colored",
                                position: "top-center",
                                style: { height: "100px" }
                            });
                            localStorage.removeItem(secretCookie);
                            onClose();
                        }}>
                            Order
                        </Button>
                        <Button variant="ghost" colorScheme='red' mr={3} onClick={() => {
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

export default ModalCart;