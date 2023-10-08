import { ref,defineAsyncComponent, markRaw } from 'vue'
import { defineStore } from 'pinia'
import { FormDataModel } from '@/components/FormBase/FormDataModel.ts'
import { ComponentClass } from '@/models/ComponentClass.ts'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { generateGuid } from '@/tools/tool.ts'

export const useFormStore = defineStore
    ("FormStore", () => {
        // 当前顶级窗口的层级
        let zIndexMax = ref<number>(1)

        // 当前显示的窗口集合
        const FormList = ref<FormDataModel[]>([])
        // 当前显示的窗口关联的组件示例集合
        const componentList = ref<ComponentClass[]>([])

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
                console.log('show111',id);
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
            const index = componentList.value.findIndex(x => x.id === id)
            if (index < 0)
                return
            RemoveForm(id)
            componentList.value.splice(index, 1)
        }
        // 加载所有的组件
        const modules = import.meta.glob('/src/components/*.vue'); 
        // 添加组件
        const AddCom = (obj: ComponentClass): void => {
            if (!obj)
                return
            componentList.value.push(obj)
        }
        // 创建组件
        const CreateCom = (type: AppFormEnum): void => {
            const component = new ComponentClass(generateGuid(), type.toString());
            const path = `/src/components/${type.toString()}.vue`;
            component.comobj = defineAsyncComponent(modules[path] as any);
            componentList.value.push(markRaw(component))
            console.log('CreateCom',componentList.value)
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