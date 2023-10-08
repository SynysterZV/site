import { useCallback } from "react"
import TSParticles from "react-tsparticles"
import { loadHyperspacePreset } from "tsparticles-preset-hyperspace"
import type { ISourceOptions, Engine, Container } from "tsparticles-engine"
  
const options: ISourceOptions = {
    preset: "hyperspace",
    background: {
        opacity: 0
    }
}

export default function Particles() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadHyperspacePreset(engine)
    }, [])

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        console.log(container)
    }, [])

    return (
        <TSParticles className="invisible sm:visible" id="tsparticles" options={options} init={particlesInit} loaded={particlesLoaded}/>
    )
}