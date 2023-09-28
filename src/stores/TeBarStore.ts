import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useTeBarStore = defineStore
    ("TeBarStore", () => {
        // 状态条是否处于长显示状态
        const isShow = ref(false)

        // 状态条在整个页面中的位置和大小
        const position = ref({ x: 0, y: 0 , width: 0, height: 0})

        return {
            isShow, 
            position,
        }
    })  