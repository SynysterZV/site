'use client'

import { useState } from "react"
import Image from "next/image"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import ms from '@naval-base/ms'
import ReactHowler from "react-howler"


import { SiSpotify } from "react-icons/si"
import { MdExplicit } from "react-icons/md"
import { HiExternalLink } from "react-icons/hi"
import { FaPlay, FaPause } from "react-icons/fa"

import { TrackFull } from "@/types/spotify"
import Modal from "@/components/Modal"
import Details from "@/components/Details"
import Circle from "@/components/Circle"

dayjs.extend(relativeTime)

export default function Track({ track }: { track: TrackFull }) {
    const [statsOpen, setStatsOpen] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [duration, setDuration] = useState(29.8)
    const [start, setStart] = useState(Date.now())

    const image = track.album.images[0].url
    const artists = track.artists.map(artist => artist.name).join(', ')

    const close = () => {
        setStatsOpen(false)
        setPlaying(false)
    }

    const open = () => {
        setStatsOpen(true)
    }

    const play = () => {
        if(!playing) {
            setStart(Date.now())
            setPlaying(true)
        } else {
            setDuration(duration-((Date.now()-start)/1e3))
            setPlaying(false)
        }
    }

    const album = track.album

    return (
        <button
            key={track.id}
            type="button"
            className="group flex flex-col space-y-2 text-left no-underline align-top focus:ring focus:ring-offset-4 dark:focus:ring-offset-gray-900 outline-none focus:outline-none"
            aria-roledescription='Opens a stats modal'
            onClick={open}
        >
            <Modal isOpen={statsOpen} setIsOpen={close} title={<SiSpotify size={24} />}>
                <div className="space-y-4">
                    <div className="relative aspect-[3/1]">
                        <Image
                            src={image}
                            layout="fill"
                            alt={`Album cover art of ${track.album.name} by ${artists}`}
                            className="object-cover rounded-md"
                        />
                    </div>

                    <span
                        className="group flex justify-between p-3 bg-gray-100 dark:bg-gray-900 rounded-md border dark:border-0"
                    >
                        <div>
                            <a href={track.external_urls.spotify} className="mt-3.5 flex text-2xl font-bold no-underline hover:underline items-center space-x-3">
                                {track.name}
                                <HiExternalLink size={20} />
                            </a>
                            <h3 className="text-sm italic text-gray-400">By {artists}</h3>
                        </div>

                        <div className="flex items-center p-3 space-x-4">
                            <p className="text-xs text-gray-400 rounded-full bg-gray-500/10 dark:bg-gray-700 -m-2 py-1 px-2">
                                Preview
                            </p>
                            <button
                                type="button"
                                onClick={play}
                            >
                                <ReactHowler
                                    format={["mp3"]} 
                                    src={track.preview_url}
                                    html5={true}
                                    playing={playing}
                                    onEnd={() => {
                                        setPlaying(false)
                                        setDuration(29.8)
                                    }}
                                />
                                <Circle playing={playing} duration={duration} />
                            </button>
                        </div>
                    </span>

                    <div>
                        <Details
                            details={[
                                {
                                    name: 'Released:',
                                    value: (
                                        <span>
                                            {dayjs(album.release_date).fromNow()} ({dayjs(album.release_date).format('DD MMM YYYY')})
                                        </span>
                                    )
                                },
                                {
                                    name: 'Album:',
                                    value: album.name,
                                },
                                {
                                    name: 'Duration:',
                                    value: ms(track.duration_ms, true)
                                }
                            ]}
                        />
                    </div>

                </div>
            </Modal>

            <div className="overflow-hidden w-full rounded-md image-span-block border dark:border-transparent border-black">
                <Image
                    src={image}
                    className="group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 grayscale-[50%]"
                    alt={`Album cover art for ${track.name} by ${artists}`}
                    width={400}
                    height={400}
                />
            </div>

            <h2 className="py-0.5 text-lg">
                <span className="font-bold">
                    {track.explicit && <MdExplicit className="inline -mt-1" />} {track.name}
                </span>{' '}
                <span className="text-neutral-700 dark:text-neutral-400">• {artists}</span>
            </h2>
        </button>
    )
}