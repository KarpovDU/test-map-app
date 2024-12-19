'use client'

import { NextUIProvider } from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Provider } from 'react-redux';
import store from './Store';

export default function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <Provider store={store}>
                    {children}
                </Provider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}