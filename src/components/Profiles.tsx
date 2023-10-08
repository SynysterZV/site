'use client'

import {
    SiGithub,
    SiDiscord,
    SiLinkedin
} from "react-icons/si"

import {
    MdOutlineEmail
} from "react-icons/md"

import { useLanyard } from "use-lanyard"

export const DISCORD_ID = "372516983129767938"

const statusMap = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500'
}

export const profiles = [
    {
        name: "Github",
        user: "SynysterZV",
        link: "https://github.com/SynysterZV",
        icon: SiGithub,
        include: false,
    },
    {
        name: "Discord",
        user: "synysterzv#0",
        link: "/discord",
        icon: SiDiscord,
        include: false
    },
    {
        name: "LinkedIn",
        user: "Jacob Fenton",
        link: "https://www.linkedin.com/in/synzv/",
        icon: SiLinkedin,
        include: false
    },
    {
        name: "Email",
        user: "me@synzv.com",
        icon: MdOutlineEmail,
        link: "mailto:me@synzv.com",
        include: true
    }
]

export default function Profiles() {
    return (
        <>
        {profiles.map((obj, i) => {
            return (
                    <a key={i} href={obj.link} target="_blank" rel="noreferrer" aria-label={obj.name}>
                        <obj.icon className="w-7 h-7 icon-button"/>
                        <span className="sr-only">{obj.name}</span>
                    </a>
            )
        })}
        </>
    )
}

export function ProfilesList() {
    const { data: lanyard } = useLanyard(DISCORD_ID)

    return (
        <ul className="space-y-2 list-disc list-inside">
            <li key="discord" className="flex items-center space-x-2">
                <span key="discordI"><SiDiscord className="w-6 h-6" /></span>
                {lanyard ? (
                    <span className="flex items-center space-x-2">
                        <span key="discordU">{lanyard.discord_user.username}#0</span>
                        <span className={`${
                        statusMap[lanyard.discord_status as keyof typeof statusMap] 
                        } h-2 w-2 inline-block rounded-full`}/>
                    </span>
                ) : (
                    <span>synysterzv#0</span>
                )}
            </li>
            {profiles.filter(x => x.include).map((obj,i) => {
                return (
                    <li key={i} className="flex space-x-2">
                        <span><obj.icon key={i} className="w-6 h-6"/></span>
                        <span>{obj.user}</span>
                    </li>
                )
            })}
        </ul>
    )
}