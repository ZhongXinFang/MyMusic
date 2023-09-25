import { ref, onMounted, onUnmounted, getCurrentInstance, watch } from 'vue';
import { useFormStore } from '@/stores/FormStore.js'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
export function useForm() {

    const formStore = useFormStore()

    // 窗口标识
    const formEnumType = ref<AppFormEnum>(AppFormEnum.PlayingListForm)
    // 当前实例
    const instance = ref<any | null>(null)

    // 窗口属性
    // 是否显示最大化按钮
    const showMaximize = ref(true)
    // 是否显示最小化按钮
    const showMinimize = ref(true)
    // 是否显示关闭按钮
    const showClose = ref(true)
    // 是否允许手动调整窗口大小
    const allowResize = ref(false)

    // 当前是否显示
    const isShow = ref(true)
    watch(isShow, (newValue) => {
        console.log('isShow',newValue);
        if (newValue === true) {
            Show()
        }
        else {
            Hide()
        }
    })
    // 显示窗口
    const Show = () => {
        instance.value.proxy.$el.classList.remove('hidden')
        // isShow.value = true
    }
    // 隐藏窗口
    const Hide = () => {
        instance.value.proxy.$el.classList.add('hidden')
        // isShow.value = false
    }

    onMounted(() => {
        // 当前组件挂载时，将它添加到集合中
        if (instance.value === null) {
            instance.value = getCurrentInstance();
        }
        if (instance.value)
            formStore.AddForm(instance.value,formEnumType)
    });

    onUnmounted(() => {
        // 当前组件卸载时，将它从集合中移除
        if (instance.value === null)
            return
        formStore.RemoveForm(instance.value,formEnumType)
    });

    return {
        showMaximize,
        showMinimize,
        showClose,
        allowResize,
        isShow,
        formEnumType
    };
}