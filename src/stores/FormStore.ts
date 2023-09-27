import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'

export const useFormStore = defineStore
    ("FormStore", () => {

        // 当前显示的窗口集合
        const FormList = ref<Array<FormDataModel>>([])
        // 添加窗口
        const AddForm = (model: FormDataModel) => {
            const index = FormList.value.findIndex((item) => item.id === model.id)
            if (index < 0) {
                FormList.value.push(model)
            }
        }
        // 移除窗口
        const RemoveForm = (id: string) => {
            const index = FormList.value.findIndex((item) => item.id === id)
            if (index >= 0) {
                FormList.value.splice(index, 1)
            }
        }
        // 显示窗口
        const Show = (id: string) => {
            const item = FormList.value.find((item) => item.id === id)
            if (item) {
                item.isShow = true
            }
        }
        // 隐藏窗口
        const Hide = (id: string) => {
            const item = FormList.value.find((item) => item.id === id)
            if (item) {
                item.isShow = false
            }
        }
        // 切换窗口显示状态
        const Toggle = (id: string) => {
            const item = FormList.value.find((item) => item.id === id)
            if (item) {
                item.isShow = !item.isShow
            }
        }
        // 寻找是否有指定类型的窗口
        const FindFormByType = (type: string) => {
            const item = FormList.value.find((item) => item.type === type)
            return item ?? null
        }
        return {
            AddForm,
            RemoveForm,
            Show,
            Hide,
            Toggle,
            FindFormByType,
        }
    })  