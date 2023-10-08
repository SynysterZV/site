const e = encodeURIComponent

export default function urlcat(url: string, params: Record<string,string>) {
    return url+"?"+Object.entries(params).map(([k,v])=> `${e(k)}=${e(v)}`).join("&")
}