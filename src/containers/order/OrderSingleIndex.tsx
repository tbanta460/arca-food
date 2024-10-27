import React, { Dispatch, SetStateAction } from "react";
import { Box, Card, Stack, Heading, CardFooter, CardBody, CardHeader, Button, Text, Image, Grid, Input, Flex, Progress } from "@chakra-ui/react";
import { InitialSearchState } from "@/app/order/page";
import SelectorCountry from "@/selectors/SelectorCountry";
import SelectorTag from "@/selectors/SelectorTag";
import * as Yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CardFood from "./CardFood";
import CarouselCategoryFood from "./CarouselCategoryFood";
const validationSchemaFilterSearch = Yup.object().shape({
    name: Yup.string(),
    country_id: Yup.string(),
    tag_id: Yup.string()
});

type formValuesFilterSearch = Yup.InferType<typeof validationSchemaFilterSearch>;

interface InitialPropsOrderSingleIndex {
    searchState: InitialSearchState;
    setSearchState: Dispatch<SetStateAction<InitialSearchState>>;
    dataFoods: Array<{ [key: string]: any }>;
    isLoading: boolean;
}
const OrderSingleIndex = ({ searchState, setSearchState, isLoading, dataFoods }: InitialPropsOrderSingleIndex) => {
    const { handleSubmit, register, setValue, control } = useForm<formValuesFilterSearch>({
        resolver: yupResolver(validationSchemaFilterSearch)
    });
    const isWatch = useWatch({ control })
    const onSubmit = (data: formValuesFilterSearch) => {
        setSearchState((prev) => ({
            ...prev,
            name: data?.name ?? "",
            country_id: data?.country_id ?? "",
            tag_id: data?.tag_id ?? ""
        }))
    }

    return (
        <>
            <Box width={"90%"} mx="auto" py="2rem">
                <Card
                    direction={{ lg: 'row', sm: 'column', md:"column" }}
                    overflow='hidden'
                    rounded="xl"
                    boxShadow={"unset"}
                    px="5rem"
                    py="1rem"
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src='./logo.png'
                        alt='Caffe Latte'
                    />

                    <Stack>
                        <CardBody>
                            <Heading fontSize={"30px"} color={"#E98B33"} mb="40px">Welcome to Arca Food!</Heading>

                            <Text py='2'>
                                We are delighted to have you here. As a special thank you for choosing us, you’ll receive a complimentary meal with your first purchase. We hope you enjoy our delicious offerings and look forward to serving you again soon!
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    rounded="xl"
                    boxShadow={"unset"}
                    px="5rem"
                    py="1rem"
                    mt="3rem"
                    display={"flex"}
                    flexDirection={"column"}
                >
                    <Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Flex gap="50px" alignItems={"center"} flexDirection={{lg:"row", sm:"column", md:"column"}}>
                                <Grid templateColumns={{lg:"1fr 1fr 1fr", md:"1fr", sm:"1fr"}} gap="10px">
                                    <Input type="text" placeholder="Search..." {...register("name")} />
                                    <Stack>
                                        <SelectorCountry values={isWatch?.country_id ?? ""} onChange={(e) => {
                                            setValue("country_id", e.value)
                                        }} isMulti={false} />
                                    </Stack>
                                    <Stack>
                                        <SelectorTag values={isWatch?.tag_id ?? ""} onChange={(e) => {
                                            setValue("tag_id", e.value)
                                        }} isMulti={false} />
                                    </Stack>
                                </Grid>
                                <Flex gap="5px">
                                    <Button bg="#e98b33" color="white" type="submit">Apply Filter</Button>
                                    <Button bg="red" color="white" type="button" onClick={() => {
                                        setSearchState({ name: "", country_id: "", tag_id: "", category_id: "" })
                                    }}>Reset Filter</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </Box>
                    {isLoading && <Progress size='xs' isIndeterminate mt="50px"/>}
                    {!isLoading && (
                        <Card boxShadow={"unset"} my="20px">
                            <Box >
                            <CarouselCategoryFood searchState={searchState} setSearchState={setSearchState}/>
                            </Box>
                            <Box>
                                <CardFood dataFoods={dataFoods ?? []}/>
                            </Box>
                        </Card>
                    )}
                </Card>
            </Box>
        </>
    )
}

export default OrderSingleIndex;