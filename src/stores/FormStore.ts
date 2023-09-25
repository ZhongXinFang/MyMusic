import { defineStore } from 'pinia'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
import { ref } from 'vue'

interface FormItem {
    obj: any,
    type: AppFormEnum
}

export const useFormStore = defineStore
    ("FormStore", () => {

        // 当前显示的窗口集合
        const FormList = ref<Array<FormItem>>([])
        // 添加窗口
        const AddForm = (value: any, type: AppFormEnum) => {
            FormList.value.push({ obj: value, type: type })
            console.log('AddForm', value, value.proxy.$el);
        }
        // 移除窗口
        const RemoveForm = (value: any, type: AppFormEnum) => {
            FormList.value.splice(FormList.value.indexOf({ obj: value, type: type }), 1)
            console.log('RemoveForm', FormList);
        }

        // 显示窗口
        const Show = (value: AppFormEnum) => {
            const item = FormList.value.find(x => x.type === value)
            if (item)
                item.obj.proxy.$el.classList.remove('hidden')
        }

        return {
            AddForm,
            RemoveForm,
            Show,
        }
    })  