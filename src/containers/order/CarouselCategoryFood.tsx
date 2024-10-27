import { Card, Stack, Text } from "@chakra-ui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import useCategoryListIndex from "@/store/api/useCategoryListIndex";
import { InitialSearchState } from "@/app/order/page";
import Slider from "react-slick"
interface InitialPropsCarouselCategoryFood {
    searchState: InitialSearchState;
    setSearchState: Dispatch<SetStateAction<InitialSearchState>>
}
function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black", borderRadius: "100%", boxShadow: "1px 1px 2px rgb(0,0,0,0.2)" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black", borderRadius: "100%", boxShadow: "1px 1px 2px rgb(0,0,0,0.2)" }}
            onClick={onClick}
        />
    );
}
const CarouselCategoryFood = ({ setSearchState, searchState }: InitialPropsCarouselCategoryFood) => {
    const { data, isLoading, error } = useCategoryListIndex();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
    };
    if (isLoading) {
        return <Text>Loading..</Text>
    }
    return (
        <>
            <Slider {...settings}>
                
                {data?.data?.map((dataCar: { id: string; name: string }) => {
                    return (
                        <Fragment key={dataCar?.id}>
                            <Stack onClick={() => setSearchState((prev) => ({
                                ...prev,
                                category_id:dataCar?.id
                            }))} cursor={"pointer"} width={"max-content"} bg="salmon" w="100px" color={"white"} textAlign={"center"} borderRadius={"10px"}>
                                <Text>{dataCar?.name ?? ""}</Text>
                            </Stack>
                        </Fragment>
                    )
                })}
            </Slider>
        </>
    )
}

export default CarouselCategoryFood
