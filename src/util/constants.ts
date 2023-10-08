function env(k: string) {
    const v = process.env[k]
    console.log(v)
    if(!v) {
        throw new Error(`Missing env var: ${k}`)
    }

    return v
}

export const SPOTIFY_CLIENT_ID = env("SPOTIFY_CLIENT_ID")
export const SPOTIFY_CLIENT_SECRET = env("SPOTIFY_CLIENT_SECRET")
export const SPOTIFY_REDIRECT_URI = "https://dev.synzv.com/api/spotify/oauth"
export const REDIS_URL = env("REDIS_URL")
export const DISCORD_WEBHOOK = env("DISCORD_WEBHOOK")

export enum SPOTIFY_REDIS_KEYS {
    AccessToken = "spotify:access_token",
    RefreshToken = "spotify:refresh_token"
}