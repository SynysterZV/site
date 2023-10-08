'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Routes(props: { closeMenu: () => void }) {
    const [showHidden, setShowHidden] = useState(true)

    const routes = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Songs",
            link: "/songs"
        },
        {
            name: "Contact",
            link: "/contact"
        },
        {
            name: "Pink",
            link: "/pink",
            hidden: showHidden
        }
    ]

    useEffect(() => {

        const handler = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'h' && e.ctrlKey) setShowHidden(!showHidden)
        }

        window.addEventListener('keydown', handler)

        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [showHidden, setShowHidden])

    return (
        <>
            {routes.map(obj => {
                return (
                    <li key={obj.name} className={obj.hidden ? "hidden" : ""} >
                        <Link href={obj.link} onClick={props.closeMenu} >
                            <span
                                className="block sm:inline-block py-3 sm:px-5 font-mono text-lg sm:text-sm sm:font-normal dark:hover:text-white no-underline sm:underline rounded-md sm:rounded-full dark:sm:hover:bg-white/10 sm:bg-white/0 sm:hover:bg-gray-900/5"
                            >
                                {obj.name}
                            </span>
                        </Link>
                    </li>
                )
            })}
        </>
    )
}