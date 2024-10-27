import AsyncSelect, { AsyncProps } from "react-select/async";
import { useAxios } from "@/store/useApi";
import useCategoryListIndex from "@/store/api/useCategoryListIndex";
const SelectorCategory = ({
    values,
    onChange,
    isMulti = false,
}: {
    isMulti?: boolean;
    values: Array<string | number> | string | undefined | null;
    onChange: (e: any) => void;
}) => {
    const api = useAxios();

    const {
        data: dataPaginated,
        isLoading,
        error,
    } = useCategoryListIndex();
    const dataManagements = dataPaginated?.meals ?? []
    const options = dataManagements?.map((data: any) => ({
        value: data.strCategory?.toLowerCase(),
        label: data.strCategory,
    }));

    if (isLoading) {
        return;
    }
    return (
        <>
            <AsyncSelect
                isSearchable={false}
                isMulti={isMulti}
                onChange={onChange}
                defaultOptions={options}
                cacheOptions
                isLoading={isLoading}
                value={(values && values.length === 0) || values === null || values === "" || values === undefined ? ""
                    : !Array.isArray(values)
                        ? {
                            value: dataManagements?.find(
                                (data: { strCategory: string }) =>
                                    data?.strCategory?.toLowerCase() == values
                            )?.strCategory?.toLowerCase(),
                            label: dataManagements.find(
                                (data: { strCategory: String }) =>
                                    data.strCategory?.toLowerCase() == values
                            )?.strCategory,
                        }
                        : values?.map((value) => {
                            const isFiltered = dataManagements.find(
                                (user: { strCategory: string }) =>
                                    user?.strCategory?.toLowerCase() === value
                            );

                            return isFiltered
                                ? { value: isFiltered.strCategory?.toLowerCase(), label: isFiltered.strCategory }
                                : { value: "", label: "" };
                        })
                }
                placeholder="Select Category..."
            />
        </>
    );
};

export default SelectorCategory;
