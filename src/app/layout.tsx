import { Metadata } from "next"
import { ReactNode } from "react"

import '@/styles/global.css'

import LayoutClient from "./layoutClient"

export const metadata: Metadata = {
    metadataBase: new URL("https://dev.synzv.com"),
    title: 'Jacob Fenton',
    description: 'Portfolio',
    openGraph: {
        title: "SynysterZV",
        images: {
            url: "https://github.com/SynysterZV.png"
        }
    }
} 

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutClient>
            {children}
        </LayoutClient>
    )
}