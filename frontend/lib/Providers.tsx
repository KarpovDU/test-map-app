'use client'

import { NextUIProvider, Spinner } from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Provider } from 'react-redux';
import store from './Store';
import { useEffect, useState } from 'react';


export default function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
      }, []);
    

    if (!mounted) {
        return <Spinner size="lg" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>;
    }

    return (
        <NextUIProvider>
            <NextThemesProvider>
                <Provider store={store}>
                    {children}
                </Provider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}