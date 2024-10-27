'use client'
import { Text } from '@chakra-ui/react'; 
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from "react";

export type RedirectPropTypes = {
  to: string;
};
export const Redirect = ({ to }: RedirectPropTypes) => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push(to);
  }, [router, to]);

  return <Text>Redirecting...</Text>;
};