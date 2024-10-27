"use client"
import { ReactQueryProvider } from "@/store/queryProvider";
import { ToastContainer } from "react-toastify";
import { Box, ChakraProvider, Container, Image } from "@chakra-ui/react";
import { theme } from "@/theme";
import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
// import { UserDataProvider } from "@/store/provider/UserData";
// import AccessControl, { AuthRestrict } from "@/components/AccessControl";
// const NoSSR = ({ children }: Readonly<{ children: React.ReactNode }>) => <Fragment>{children}</Fragment>;

// dynamic(() => Promise.resolve(NoSSR), {
//     ssr: false
// });
import ModalCart from "@/components/ModalsCart";
export default function Main({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    useEffect(() => {
        if (typeof(Storage) === "undefined") {
            alert("Browser anda tidak mendukung localStorage, beberapa fungsi tidak bekerja dengan maksimal")
        }
    },[])
    return (
        <ChakraProvider theme={theme} resetCSS>
            <ReactQueryProvider>
                <ToastContainer
                    autoClose={3000}
                    position="top-center"
                    theme="light"
                    progressStyle={{ backgroundColor: "black" }}
                />
                <Container maxWidth={"100%"} m="0" p="0" background={"#f3f3f3"}>
                    {isOpen && <ModalCart isOpen={isOpen} onClose={onClose}/>}
                    {children}
                    <Box position={"fixed"} right="20px" bottom="30px" cursor={"pointer"} onClick={onOpen}>
                        <Image src="./basket.png" width={"100px"} alt="cart icn"/>
                    </Box>
                </Container>


            </ReactQueryProvider>
        </ChakraProvider>
    );
}