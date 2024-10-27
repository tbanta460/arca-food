import AsyncSelect, { AsyncProps } from "react-select/async";
import { useMemo, useCallback } from "react";
import { useAxios } from "@/store/useApi";
import useCountryListIndex from "@/store/api/useCountryListIndex";
const SelectorCountry = ({
  values,
  onChange,
  isMulti = true,
}: {
  isMulti?: boolean;
  values: Array<string | number> | string;
  onChange: (e: any) => void;
}) => {
  const api = useAxios();
  const loadOptions: AsyncProps<any, any, any>["loadOptions"] = useCallback(
    (search: string) => {
      return api
        .get(`countriesData.json`, { params: {} })
        .then((res) => {
          return res.data?.data?.filter((i: {name:string}) =>
            i?.name?.toLowerCase()?.includes(search?.toLowerCase())
          ).map((isData: {name:string, id:string}) => ({
            label: isData.name,
            value: isData.id,
          }));
        })
        .catch((error) => error);
    },
    [api]
  );
  const { data: dataPaginated, isLoading, error } = useCountryListIndex();
  const dataManagements = dataPaginated?.data ?? []
  const options = dataManagements?.map((data: any) => ({
    value: data.id,
    label: data.name,
  }));
  if (isLoading) {
    return;
  }
  return (
    <>
      <AsyncSelect
        isMulti={isMulti}
        onChange={onChange}
        defaultOptions={options}
        cacheOptions
        loadOptions={loadOptions}
        isLoading={isLoading}
        placeholder="Select Country..."
        defaultValue={(values === "" || values?.length == 0) ? "" :
          !Array.isArray(values)
            ? {
                value: dataManagements.find(
                  (data: { id: number }) =>
                    data.id == parseInt(values?.toString() as string)
                )?.id,
                label: dataManagements.find(
                  (data: { id: number }) =>
                    data.id == parseInt(values?.toString() as string)
                )?.name,
              }
            : values?.map((value) => {
                const isFiltered = dataManagements.find(
                  (user: { id: number }) =>
                    user.id === parseInt(value?.toString() as string)
                );

                return isFiltered
                  ? { value: isFiltered.id, label: isFiltered.name }
                  : { value: "", label: "" };
              })
        }
      />
    </>
  );
};

export default SelectorCountry;
