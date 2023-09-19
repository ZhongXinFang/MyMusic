import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSongStore = defineStore
    ("SongState", () =>
    {
        // 播放状态
        const playing = ref(false)
        const ChangePlaying = (value:boolean) =>
        {
            playing.value = value
        }
        return { playing, ChangePlaying }
    })  