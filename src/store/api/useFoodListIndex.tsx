import { standardExtraQueryParam } from "@/helper/pagination";
import {
    UseQueryResult,
    UseQueryOptions,
    useQuery,
} from "react-query";
import { useAxios } from "../useApi";
import { InitialSearchState } from "@/app/order/page";


const useFoodListIndex = (
    params: InitialSearchState,
    options?: UseQueryOptions<any>
): UseQueryResult<any> => {
    const api = useAxios();

    return useQuery<any>(
        ["foodListIndex", params],
        () => {
            return api
                .get(`mainData.json`, {
                    params: {
                        ...params,
                    },
                })
                .then((res) => {
                    const data = res.data;
                    type initialDataFiltered = {
                        data: Array<{ [key: string]: any }>
                    }
                    let resData: initialDataFiltered = {
                        data: data?.data ?? []
                    }
                    if (params.name !== "") {
                        resData.data = data?.data?.filter((i: { name: string }) =>
                            i?.name?.toLowerCase()?.includes(params?.name?.toLowerCase())
                        )
                    }
                    if(params.country_id !== ""){
                        resData.data = resData.data?.filter((data) => data?.countryId?.toString() == params?.country_id?.toString())
                    }
                    if(params.tag_id !== ""){
                        resData.data = resData?.data?.filter((data) => data?.tags?.some((tag : {tagId:string}) => tag?.tagId?.toString() === params?.tag_id?.toString()))
                    }
                    if(params.category_id !== ""){
                        resData.data = resData?.data?.filter((data) => data?.categoryId?.toString() == params?.category_id?.toString())
                    }
                    return resData;

                });
        },
        {
            ...standardExtraQueryParam,
            retry: false,
            ...options,
        }
    );
};

export default useFoodListIndex;
