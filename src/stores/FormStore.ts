import { ref, shallowReactive } from 'vue'
import { defineStore } from 'pinia'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { ComponentClass } from '@/models/ComponentClass.ts'
import { UnitEnum } from '@/models/UnitEnum.ts'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'

export const useFormStore = defineStore
    ("FormStore", () => {
        // 当前顶级窗口的层级
        let zIndexMax = ref<number>(1)

        // 当前显示的窗口集合
        const FormList = ref<Array<FormDataModel>>([])
        // 当前显示的窗口关联的组件示例集合
        const componentList = shallowReactive<ComponentClass[]>([])

        /// 窗口控制
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

        /// 组件控制
        // 关闭窗口(卸载组件)
        const CloneForm = (id: string) => {
            const index = componentList.findIndex(x => x.id === id)
            if (index < 0)
                return
            RemoveForm(id)
            componentList.splice(index, 1)
        }
        // 添加组件
        const AddCom = (obj: ComponentClass): void => {
            if (!obj)
                return
            componentList.push(obj)
        }
        // 创建组件
        const CreateCom = (type: AppFormEnum): void => {
            const com = UnitEnum[(type.toString() + 'Unit') as keyof typeof UnitEnum]
            componentList.push(new ComponentClass('111',com))
        }

        // 寻找是否有指定类型的窗口
        const FindFormByType = (type: string): (FormDataModel | null) => {
            console.log(FormList.value)
            const item = FormList.value.find((item) => item.type === type)
            return item ?? null
        }
        // 将指向窗口切换到顶层显示
        const BringToTop = (id: string) => {
            const item = FormList.value.find((item) => item.id === id) ?? null
            if (item && item.zIndex !== zIndexMax.value) {
                item.zIndex = ++zIndexMax.value
            }
        }

        return {
            AddForm,
            RemoveForm,
            Show,
            Hide,
            Toggle,
            FindFormByType,
            BringToTop,
            AddCom,
            CloneForm,
            CreateCom,
            componentList,
        }
    })  