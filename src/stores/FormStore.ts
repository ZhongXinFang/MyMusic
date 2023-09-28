import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'

export const useFormStore = defineStore
    ("FormStore", () => {

        // 当前顶级窗口的层级
        let zIndexMax = ref<number>(1)

        // 当前显示的窗口集合
        const FormList = ref<Array<FormDataModel>>([])
        const FormList1 = Array<Ref<FormDataModel>>()

        const AddForm1 = (model: FormDataModel): Ref<FormDataModel> => {
            const index = FormList1.find((item) => item.value.id === model.id) ?? null
            if (index !== null)
                return index
            const item = ref<FormDataModel>(model)
            FormList1.push(item)
            return item
        }

        // 添加窗口
        const AddForm = (model: FormDataModel)=> {
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
                item.zIndex = ++zIndexMax.value
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
                item.zIndex = ++zIndexMax.value
            }
        }
        // 寻找是否有指定类型的窗口
        const FindFormByType = (type: string) => {
            const item = FormList.value.find((item) => item.type === type)
            return item ?? null
        }
        // 将指向窗口切换到顶层显示
        const BringToTop = (id: string) => {
            const item = FormList.value.find((item) => item.id === id) ?? null
            console.log('BringToTop', id, item);
            if (item && item.zIndex !== zIndexMax.value) {
                item.zIndex = ++zIndexMax.value
            }
        }

        const BringToTop1 = (id: string) => {
            const item = FormList1.find((item) => item.value.id === id)?.value ?? null
            console.log('BringToTop1', id, item);
            if (item && item.zIndex !== zIndexMax.value) {
                item.zIndex = ++zIndexMax.value
            }
        }

        return {
            AddForm,
            AddForm1,
            RemoveForm,
            Show,
            Hide,
            Toggle,
            FindFormByType,
            BringToTop,
            BringToTop1,
        }
    })  