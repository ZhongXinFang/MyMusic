import apiBase from '@/httpUnit/APIBase.ts'
import { plainToClass } from "class-transformer";
import { ArtistReqDto } from '@/httpUnit/Models/ArtistReqDto.ts'
import { ArtistResDto } from '@/httpUnit/Models/ArtistResDto.ts'
import { AddSongReqDto } from '@/httpUnit/Models/AddSongReqDto.ts'
import { AddSongResDto } from '@/httpUnit/Models/AddSongResDto.ts'

// 获取艺术家列表
export const AllArtist = async (): Promise<ArtistReqDto[] | null> => {
    const res: any = await apiBase.get('/Artist')
    if (res?.status !== 200)
        return null
    const resarr = res.data.map((item: any) => plainToClass(ArtistReqDto, item))
    return resarr
}

// 添加一个艺术家
export const AddArtist = async (data: ArtistResDto): Promise<ArtistReqDto | null> => {
    if (!data)
        new Error("data is null")
    const res: any = await apiBase.post('/Artist', data)
    if (res?.status !== 200 || !res?.data)
        return null
    return plainToClass(ArtistReqDto, res.data)
}

// 添加一首歌曲
export const AddSong = async (data: AddSongReqDto): Promise<AddSongResDto | null>  => {
    const res: any = await apiBase.post('/Song', data)
    if (res?.status !== 200)
        return null
    return plainToClass(AddSongResDto, res.data)
}
