import Profiles from "@/components/Profiles"
import Card from "@/components/Card"
import Name from "@/components/Name"
import { Song } from "@/components/Song"
import { PinnedRepo } from "@/types/github"

const age = (Date.now() - new Date('03 December 2003').getTime()) / 3.154e10

async function getData() {
    return await fetch('https://gh-pinned.nxl.sh/api/user/synysterzv').then(
        async (response) => response.json() as Promise<PinnedRepo[]>
    )
}

export default async function Page() {


    const projects = await getData()

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Profiles/>
                    <div className="overflow-hidden py-2 px-1">
                        <Song/>
                    </div>
                </div>

                <Name />

                <p className="opacity-80">I'm a {Math.floor(age)} year old full-stack developer and IT Specialist</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 auto-cols-max gap-1 sm:gap-3">
                    {projects.map((project, i) => (
                        <Card key={i} repo={project} />
                    ))}
                </div>
            </div>
            
        </>
    )
}