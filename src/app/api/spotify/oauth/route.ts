import IORedis from 'ioredis'
import { z } from "zod";
import { NextRequest } from "next/server";
import SpotifyWebApi from "spotify-web-api-node"

import urlcat from "@/util/urlcat";
import { 
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET, 
    SPOTIFY_REDIRECT_URI,
    REDIS_URL,
    SPOTIFY_REDIS_KEYS
} from "@/util/constants";

const scopes = ['user-top-read', 'user-read-private', 'user-read-email'] as const;
const scope = scopes.join(' ')

const redirectUrl = urlcat("https://accounts.spotify.com/authorize", {
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: SPOTIFY_REDIRECT_URI
})

const schema = z.object({
    code: z.string().optional()
})

export async function GET(req: NextRequest) {
    const { code } = schema.parse(Object.fromEntries(req.nextUrl.searchParams))

    if (!code) {
        return Response.redirect(redirectUrl)
    }

    const api = new SpotifyWebApi({
        clientId: SPOTIFY_CLIENT_ID,
        clientSecret: SPOTIFY_CLIENT_SECRET,
        redirectUri: SPOTIFY_REDIRECT_URI
    })

    const auth = await api.authorizationCodeGrant(code).then(res => res.body).catch((e)=> e)

    if(!auth.access_token) return Response.json({ error: auth.body.error_description })

    const userAPI = new SpotifyWebApi({
        accessToken: auth.access_token,
        refreshToken: auth.refresh_token
    })

    const { body: user } = await userAPI.getMe()

    if (user.id !== 'greendayfanj') {
        return Response.json({ error: "You are not authorized to update Oauth keys"}, { status: 401 })
    }

    const redis = new IORedis(REDIS_URL)

    await redis.set(SPOTIFY_REDIS_KEYS.AccessToken, auth.access_token, "EX", auth.expires_in)
    await redis.set(SPOTIFY_REDIS_KEYS.RefreshToken, auth.refresh_token)
    
    await redis.quit()

    return Response.json(user);


}