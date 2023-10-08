'use client'

import { ReactNode, useState, useEffect, MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Squash as Hamburger } from 'hamburger-react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { Toaster } from 'react-hot-toast'
import { Inter, Roboto } from 'next/font/google'
import Script from 'next/script'


import Providers from '@/components/Providers'
import ThemeSwitch from '@/components/ThemeToggle'
import Routes from '@/components/Nav'
import Particles from '@/components/Particles'

const font = Inter({ subsets: ["latin"] })

export default function LayoutClient({ children }: { children: ReactNode }) {

    const [mobileMenuOpen, setMenuOpen] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(old => !old)
    }

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            return;
        }

        document.body.style.overflow = 'unset'
    }, [mobileMenuOpen])

    useEffect(() => {
        if (typeof window == 'undefined') {
            return;
        }

        const listener = () => {
            setHasScrolled(window.scrollY > 20)
        }

        document.addEventListener('scroll', listener)

        return () => {
            document.removeEventListener('scroll', listener)
        }
    }, [])

    const closeMenu = () => {
        setMenuOpen(false)
    }


    return (
        <html suppressHydrationWarning lang="en">
            <body className={font.className}>
                <Providers>
                    {/* <Particles /> */}
                    <Toaster />
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="sm:hidden fixed inset-0 z-10 py-24 px-8 space-y-2 bg-white dark:bg-gray-900"
                            >
                                <h1 className="text-4xl font-bold">Menu</h1>
                                <ul className="grid grid-cols-1 gap-2"><Routes closeMenu={closeMenu}/></ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="sm:hidden overflow-hidden sticky top-0 z-20 h-32 transition-all">
                            <div
                                className={`${
                                    hasScrolled || mobileMenuOpen ? 'mt-0 rounded-none' : 'mt-10 mx-5 rounded-lg'
                                } bg-gray-100 dark:bg-gray-900 relative transition-all`}
                            >
                                <div
                                    className={`pr-5 flex justify-between transition-colors space-x-2 ${
                                        mobileMenuOpen ? 'bg-gray-100 dark:bg-gray-800' : 'bg-transparent'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={toggleMenu}
                                        className="block relative z-50 px-2 text-gray-500 focus:ring transition-all"
                                    >
                                        <Hamburger toggled={mobileMenuOpen} size={20} color="currentColor" />
                                    </button>

                                    <div className="overflow-hidden py-2 px-1">
                                        <ThemeSwitch/>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className="py-10 px-5 mx-auto max-w-4xl">
                        <div className="hidden sm:flex items-center space-x-2">
                            <nav className="flex-1">
                                <ul className="flex space-x-4"><Routes closeMenu={closeMenu}/></ul>
                            </nav>

                            <div className="overflow-hidden py-2 px-1">
                                <ThemeSwitch/>
                            </div>
                        </div>

                        <main className="md:py-24 mx-auto space-y-12 max-w-3xl">
                            {children}

                            <ProgressBar
                                height="4px"
                                color="#6577E6"
                                options={{ showSpinner: false }}
                                shallowRouting
                            />
                        </main>

                        <footer className="p-4 py-10 mx-auto mt-20 max-w-3xl border-t-2 border-gray-900 dark:border-white border-opacity-10 opacity-50">
                            <h1 className="text-3xl font-bold">Jacob Fenton</h1>
                            <p>IT Specialist • {new Date().getFullYear()}</p>
                            Based on{' '}
                            <a href="https://fyko.net" target="_blank" rel="noreferrer">
                                Carter's
                            </a>{' '}
                            website{' '}
                            <a href="https://github.com/Fyko/site" target="_blank" rel="noreferrer">
                                [source]
                            </a>
                        </footer>
                    
                    </div>
                </Providers>
                <Script async src="https://science.synzv.com/script.js" data-website-id="ae8b307c-1e12-4d98-bd60-abe296daf1e0" />
                <Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "e2a195124ae14d60b83c252fad7baabe"}'></Script>
            </body>
        </html>
    )
}

