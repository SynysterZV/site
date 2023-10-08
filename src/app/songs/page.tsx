import Track from '@/components/Track'
import { TrackFull } from '@/types/spotify'

export default async function About() {

    const result = await fetch('https://dev.synzv.com/api/spotify/tracks').then(res=>res.json())

    const tracks: TrackFull[] = result.error ? [] : result.tracks

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-8">
            {tracks.map(track => (
                <Track key={track.id} track={track}/>
            ))}
        </div>
    )
}