"use client"
import { Text } from "@chakra-ui/react";
import React, {  useState } from "react";
import OrderSingleIndex from "@/containers/order/OrderSingleIndex";
import useFoodListIndex from "@/store/api/useFoodListIndex";

export interface InitialSearchState {
    name:string;
    country_id: string;
    tag_id:string;
    category_id:string;
}
const Order = () => {

    const [searchState, setSearchState] = useState<InitialSearchState>({
        name:"",
        country_id:"",
        tag_id:"",
        category_id:""
    });
    const {data, isLoading, error} = useFoodListIndex(searchState);
    if(error){
        return <Text> Something went wrong....</Text>
    }

    return (
        <OrderSingleIndex searchState={searchState} setSearchState={setSearchState} dataFoods={data?.data ?? []} isLoading={isLoading}/>
    )
}

export default Order;