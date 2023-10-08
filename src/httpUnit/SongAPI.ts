import apiBase, { base } from '@/httpUnit/APIBase.ts'
import { plainToClass } from "class-transformer";
import { ArtistReqDto } from '@/httpUnit/Models/ArtistReqDto.ts'
import { ArtistResDto } from '@/httpUnit/Models/ArtistResDto.ts'
import { AddSongReqDto } from '@/httpUnit/Models/AddSongReqDto.ts'
import { AddSongResDto } from '@/httpUnit/Models/AddSongResDto.ts'
import { SearchSongListReqDto } from '@/httpUnit/Models/SearchSongListReqDto.ts'
import { SongReqDto } from '@/httpUnit/Models/SongReqDto.ts'
import * as qs from 'qs';
import { SearchReqDto } from '@/httpUnit/Models/SearchReqDto.ts'
import { LyricModel } from '@/models/LyricModel.ts'


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
export const AddSong = async (data: AddSongReqDto): Promise<AddSongResDto | null> => {
    if(!data) return null
    const res: any = await apiBase.post('/Song', data)
    if (res?.status !== 200)
        return null
    return plainToClass(AddSongResDto, res.data)
}

// 搜索歌曲
export const SearchSong = async (data: SearchReqDto): Promise<SearchSongListReqDto<SongReqDto> | null> => {
    if(!data) return null
    const querStr: string = qs.stringify(data);
    const res: any = await apiBase.get('/Song?' + querStr)
    if (res?.status !== 200)
        return null
    const resObj = plainToClass(SearchSongListReqDto<SongReqDto>, res.data)
    resObj.Data = resObj.Data.map((item: any) => plainToClass(SongReqDto, item))
    console.log(resObj);
    return resObj
}

// 获取指定歌曲的信息
export const GetSong = async (id: string): Promise<SongReqDto | null> => {
    if(!id || id === '') return null
    const res: any = await apiBase.get('/Song/' + id)
    if (res?.status !== 200)
        return null
    return plainToClass(SongReqDto, res.data)
}

// 获取静态文件 (暂时弃用，对文件不使用 token 验证)
export const GetStaticFileRUrl = async (filename: string): Promise<string | null> => {
    const res = await apiBase.get(`/SongFile/${filename}`)
    if (res.status !== 200)
        return null
    const url = URL.createObjectURL(res.data)
    return url
}

// 获取歌词文件
export const GetLyricFileRUrl = async (filename: string): Promise<LyricModel[] | null> => {
    if(!filename || filename === '') return null
    const res = await apiBase(base + '/SongFile/' + filename,{
        responseType: 'arraybuffer'
    })
    const text = new TextDecoder("utf-8").decode(new Uint8Array(res.data));
    if (res.status !== 200)
        return null
    const data: Array<LyricModel> = text
        .split('\n')
        .filter((s: any) => s)
        .map((s: any) => {
            const parts = s.split(']')
            const timeParts = parts[0].replace('[', '').split(':')
            const obj = new LyricModel()
            obj.time = +timeParts[0] * 60 + +timeParts[1]
            obj.time *= 1000 // 转为毫秒
            obj.words = parts[1].replace('\r', '')
            return obj as LyricModel
        })
    return data
}

