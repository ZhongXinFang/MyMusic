import { ref, onMounted, onUnmounted, getCurrentInstance, watch } from 'vue';
import { useFormStore } from '@/stores/FormStore.js'
import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
export function useForm() {
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

    return {
        showMaximize,
        showMinimize,
        showClose,
        allowResize,
        isShow,
        formEnumType
    };
}