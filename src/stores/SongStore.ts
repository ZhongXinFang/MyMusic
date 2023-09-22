import { defineStore } from 'pinia'
import { ref } from 'vue'
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
        const GetCurrentTimeNext = () => { return ChangeCurrentPercent.value }

        return {
            playing, ChangePlaying,
            duration, currentTime, percent,
            ChangeCurrentTime, ChangeCurrentPercent
        }
    })  