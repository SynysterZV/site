'use client'

import { useState, useEffect, Fragment } from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@headlessui/react'
import { FaSun } from "react-icons/fa"
import { FaMoon } from "react-icons/fa6"

export default function ThemeSwitch() {
    const { systemTheme, theme, setTheme } = useTheme()
    const currentTheme = theme == "system" ? systemTheme : theme
    const [checked, setChecked] = useState(currentTheme == "light")
    const [mounted, setMounted] = useState(false)

    function set() {
        setTheme(currentTheme == "dark" ? "light" : "dark")
        setChecked(!checked)
    }

    useEffect(() => {

        setMounted(true)

        const handler = (e: KeyboardEvent) => {
            if((e.key.toLowerCase() === "t") && e.ctrlKey) set()
        }

        window.addEventListener("keydown", handler)

        return () => {
            window.removeEventListener("keydown", handler)
        }
    }, [checked, setChecked, set])

    if(!mounted) return

    return (
        <Switch 
            onChange={set}
            as={Fragment}
            checked={checked}
        >

                <button
                    className={`${
                        checked ? 'from-yellow-500 to-red-500' : 'from-indigo-500 via-purple-500 to-pink-500'
                    } bg-gradient-to-r relative mt-1.5 inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span
                    className={`flex items-center inline-block h-4 w-4 bg-white rounded-full transform transition ease-in-out duration-200
                        ${checked ? "translate-x-6" : "translate-x-1"}
                    `}
                    >
                        {checked
                            ? <FaSun className="text-red-500 text-sm pl-0.5"/>
                            : <FaMoon className="text-purple-500/90 text-sm"/>
                        }
                    </span>
                </button>
        </Switch>
    )
}