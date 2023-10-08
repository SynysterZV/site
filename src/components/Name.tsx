'use client'

import { useState } from "react";

export default function Name() {
    const [text, setText] = useState("Jacob")

    return (
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                    Sup, I'm <span 
                        onMouseEnter={() => setText("SynysterZV")} 
                        onMouseLeave={() => setText("Jacob")}
                        className="grad"
                    >{text}</span>
                </h1>
    )
}