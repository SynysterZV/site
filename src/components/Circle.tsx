"use client"

import { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";

export default function Circle({ playing, duration }: { playing: boolean, duration: number }) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const animation = animate(scope.current, { opacity: 1, pathLength: 1, transitionEnd: { pathLength: 0 } }, { duration: duration })
    if(playing) {
      animation.play()
    } else {
      animation.pause()
    }
  }, [playing, animate, scope, duration])


    return (
      <>
      <svg className="w-[50px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <motion.path
          initial={{ pathLength: 0 }}
          ref={scope}
          className="stroke-black dark:stroke-white stroke-[3]"
          d="
          M 43.25.25
          a 43,43,0,1,1-43,43,43,43,0,0,1,43-43
          "
          fill="none"
        />
        {playing
          ? <FaPause size={50} x="20" y="20" />
          : <FaPlay size={50} x="24" y="20" />
        }
      </svg>
    </>
    )
}