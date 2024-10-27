import { standardExtraQueryParam } from "@/helper/pagination";
import {
    UseQueryResult,
    UseQueryOptions,
    useQuery,
} from "react-query";
import { useAxios } from "../useApi";

const useCountryListIndex = (
    params?: any,
    options?: UseQueryOptions<any>
): UseQueryResult<any> => {
    const api = useAxios();

    return useQuery<any>(
        ["countryListIndex", params],
        () => {
            return api
                .get(`countriesData.json`, {
                    params: {
                        ...params,
                    },
                })
                .then((res) => {
                    const data = res.data
                    return data;

                });
        },
        {
            ...standardExtraQueryParam,
            retry: false,
            ...options,
        }
    );
};

export default useCountryListIndex;
