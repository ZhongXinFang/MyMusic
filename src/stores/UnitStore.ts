import { ref,markRaw,shallowRef } from 'vue'
import { defineStore } from 'pinia'
import PlayingListForm from '@/components/PlayingListForm.vue'
import SearchSongForm from '@/components/SearchSongForm.vue'
export const useUnitStore = defineStore
    ("UnitStore", () => {

        const allUnits = markRaw({
            PlayingListForm,
            SearchSongForm,
        })

        // 当前已经渲染的控件
        const componentList = ref<any[]>([])

        return {
            allUnits,
            componentList
        }
    })  