import IORedis from "ioredis"
import SpotifyWebApi from "spotify-web-api-node"

import {
    REDIS_URL,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIS_KEYS
} from "@/util/constants"

export const revalidate = 3600

export async function GET() {
    const redis = new IORedis(REDIS_URL)

    const [token, refresh] = await redis.mget(SPOTIFY_REDIS_KEYS.AccessToken, SPOTIFY_REDIS_KEYS.RefreshToken)

    let api: SpotifyWebApi

    if(!token && refresh) {
        api = new SpotifyWebApi({
            clientId: SPOTIFY_CLIENT_ID,
            clientSecret: SPOTIFY_CLIENT_SECRET,
            refreshToken: refresh
        })

        const result = await api.refreshAccessToken()

        await redis.set(
            SPOTIFY_REDIS_KEYS.AccessToken,
            result.body.access_token,
            'EX',
            result.body.expires_in
        )

        if (result.body.refresh_token) {
            await redis.set(SPOTIFY_REDIS_KEYS.RefreshToken, result.body.refresh_token)
        }
    } else if (token) {
        api = new SpotifyWebApi({
            clientId: SPOTIFY_CLIENT_ID,
            clientSecret: SPOTIFY_CLIENT_SECRET,
            accessToken: token
        })
    } else {
        return Response.json({ error: "No tokens available" })
    }

    const tracks = await api.getMyTopTracks({
        time_range: 'medium_term'
    })

    await redis.quit()

    return Response.json({ tracks: tracks.body.items })
}