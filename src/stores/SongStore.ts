import { ref } from 'vue'
import { defineStore } from 'pinia'
import { PlayModeEnum } from '@/models/PlayModeEnum.ts'
import { SongReqDto } from '@/httpUnit/Models/SongReqDto.ts'
export const useSongStore = defineStore
    ("SongState", () => {
        // 播放状态
        const playing = ref(false)
        const ChangePlaying = (value: boolean) => {
            playing.value = value
        }

        // 当前歌曲文件的总时长 (毫秒)
        const duration = ref(0)
        // 播放长度相关(一般情况下，currentTime 和 percent 会同时更新，所以只需要监听其中一个值即可)
        // 当前歌曲已经播放的时长 (毫秒)
        const currentTime = ref(0)
        // 当前歌曲文件的播放百分比 (0-1)
        const percent = ref(0)

        // 手动更改播放进度百分比 0-1 (只是存储了需要更改的值，真正的更改是在播放组件中进行的，在更改完成后，需要将此值更新为 null)
        const ChangeCurrentPercent = ref<number | null>(null)
        const ChangeCurrentTime = (value: number | null) => {
            ChangeCurrentPercent.value = value
        }

        // 播放模式
        const playMode = ref<PlayModeEnum>(PlayModeEnum.loop)
        // 更改播放模式
        const ChangePlayMode = (value: PlayModeEnum): void => {
            playMode.value = value
        }

        // 播放音量
        const volume = ref(0.5)

        // 真实的播放列表
        const playList = ref<Array<SongReqDto>>([])
        // 用户页面的播放列表
        const userPlayList = ref<Array<SongReqDto>>([])
        // 当前正在播放的歌曲
        const currentSong = ref<SongReqDto | null>(null)
        // 当前正在播放的歌曲的索引(真实列表)
        const currentSongIndex = ref<number>(-1)
        // 当前正在播放的歌曲的索引(用户列表)
        const currentUserSongIndex = ref<number>(-1)

        // 下一首
        const next = () => {
            const index = (currentSongIndex.value + 1) % playList.value.length
            console.log(index, playList.value.length);

            const obj = playList.value[index]
            // 获取用户列表中的索引
            const userIndex = userPlayList.value.findIndex((item) => item.Id === obj.Id)

            currentSongIndex.value = index
            currentUserSongIndex.value = userIndex
            currentSong.value = playList.value[index]
        }
        // 上一首
        const prev = () => {
            const index = (currentSongIndex.value - 1) % playList.value.length
            const obj = playList.value[index]
            const userIndex = userPlayList.value.findIndex((item) => item.Id === obj.Id)

            currentSongIndex.value = index
            currentUserSongIndex.value = userIndex
            currentSong.value = playList.value[index]
        }

        // 播放指定Id的歌曲
        const play = (id: string) => {
            const index = playList.value.findIndex((item) => item.Id === id)
            const userIndex = userPlayList.value.findIndex((item) => item.Id === id)

            currentSongIndex.value = index
            currentUserSongIndex.value = userIndex
            currentSong.value = playList.value[index]
        }

        // 是否存在指定歌曲
        const hasSong = (id: string) => {
            const index = playList.value.findIndex((item) => item.Id === id)
            return index >= 0
        }

        // 添加歌曲到播放列表
        const AddSong = (song: SongReqDto) => {
            playList.value.push(song)
            userPlayList.value.push(song)
        }

        return {
            playing, ChangePlaying,
            duration, currentTime, percent,
            ChangeCurrentTime, ChangeCurrentPercent,
            playMode, ChangePlayMode,
            playList, userPlayList,
            currentSong,
            next, prev,
            volume,
            AddSong,
            currentSongIndex,
            currentUserSongIndex,
            play,
            hasSong,
        }
    })  