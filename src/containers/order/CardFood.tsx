import React, { Fragment, useState } from "react";
import { Grid, Card, CardBody, ButtonGroup, Button, Text, Image, CardFooter, Stack, Divider, Heading, useDisclosure } from "@chakra-ui/react";
import { formatCurrency } from "@/helper/formatCurrency";
import ModalDetailFood from "./modals/ModalDetailFood";
import useDecryptedDataFood from "./useDecryptedDataFood";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { secretCookie, secretKey } from "./modals/ModalDetailFood";
import { toast } from "react-toastify";
import useGenerateUniqueCartId from "./useGenerateUniqueCartId";
interface InitialPropsCardFood {
    dataFoods: Array<{ [key: string]: any }>;
}

type initialDataDetail = {
    [key: string]: any
}
const CardFood = ({ dataFoods }: InitialPropsCardFood) => {
    // const dataFoodDecrypted: { [key: string]: any } | null = useDecryptedDataFood();
    // console.log(dataFoodDecrypted)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dataDetailForFood, setDataDetailForFood] = useState<initialDataDetail | null>(null);
    const handleAddToCart = async (dataFood: { [key: string]: any }) => {
        const dataFoodDecrypted: { [key: string]: any } | null = await useDecryptedDataFood();
        const orderId = useGenerateUniqueCartId();
        dataFood.qty = 1;
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
            {dataDetailForFood && isOpen && <ModalDetailFood isOpen={isOpen} onClose={onClose} dataFood={dataDetailForFood} setDataDetailForFood={setDataDetailForFood} />}
            <Grid templateColumns={{lg:"1fr 1fr 1fr", sm:"1fr", md:"1fr"}} gap="20px">
                {
                    dataFoods?.map((data) => {
                        return (
                            <Fragment key={data?.id}>
                                <Card maxW='sm'>
                                    <CardBody cursor={"pointer"} onClick={() => {
                                        setDataDetailForFood(data);
                                        onOpen();
                                    }}>
                                        <Image
                                            src={data?.image ?? "#"}
                                            alt='Green double couch with wooden legs'
                                            borderRadius='lg'
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size='md'>{data?.name ?? "-"}</Heading>
                                            <Text>
                                                {data?.description ?? "-"}
                                            </Text>
                                            <Text color='blue.600' fontSize='2xl'>
                                                {formatCurrency(data?.price ?? 0)}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <ButtonGroup spacing='2'>
                                            <Button variant='solid' color={"white"} background={"#E98B33"} onClick={() => handleAddToCart(data)}>
                                                Add to cart
                                            </Button>

                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                            </Fragment>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export default CardFood