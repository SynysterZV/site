'use client'

import { useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiGitFork } from "react-icons/pi"
import { IoIosArrowForward } from "react-icons/io"
import { GoLinkExternal } from "react-icons/go"
import { PinnedRepo } from "@/types/github";

export default function Card({ repo: project }: { repo: PinnedRepo }) {
    const [isOpen, toggle] = useReducer(x => !x, false);

    return (
        <motion.div
            animate={{ height: isOpen ? 'auto' : '54px' }}
            className="flex overflow-hidden relative flex-col dark:text-gray-100 no-underline bg-gray-100 hover:bg-gray-100/50 dark:bg-white/5 rounded-md md:rounded-lg border dark:hover:bg-white/10 border-black/10 dark:border-white/10"
        >
            <button
                type="button"
                className="flex items-center py-4 px-5 space-x-2 text-lg font-bold border-b dark:border-white dark:border-opacity-10 cursor-pointer focus:outline-none select-none"
                onClick={toggle}
            >
                <div className="flex flex-1 items-center space-x-2 text-left">
                    <span>{project.repo}</span>
                    <span className="flex items-center space-x-3 text-xs">
                        <span className="space-x-1">
                            <span>⭐</span>
                            <span>{project.stars}</span>
                        </span>
                        <span className="space-x-1 flex">
                            <span><PiGitFork className="w-4 h-4"/></span>
                            <span>{project.forks}</span>
                        </span>
                    </span>
                </div>
                <div>
                    <motion.div
                        className="p1 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full"
                        animate={{ rotate: isOpen ? 90 : 0}}
                    >
                        <IoIosArrowForward className="w-5 h-5" />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full">
                        <div className="flex flex-col py-4 px-5 space-y-4">
                            <p className="flex-1">{project.description}</p>
                            <div>
                                <a
                                    href={`https://github.com/${project.owner}/${project.repo}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center py-2 px-6 space-x-2 text-white no-underline bg-blue-700 rounded-full transition-transform duration-500 hover:scale-95 select-none dark:bg-white/10"
                                >
                                    <span>View Project</span>
                                    <GoLinkExternal className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}