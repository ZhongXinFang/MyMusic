import apiBase from '@/httpUnit/APIBase.ts'

export const songAPI = async (songId: string): Promise<null> => {
    await apiBase.get(`/song/url?id=${songId}`)
    return null
}
