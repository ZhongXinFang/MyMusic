import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
export class FormDataModel {
    id: string
    type: AppFormEnum
    isShow: boolean
    // 是否显示最大化按钮
    showMaximize: boolean = true
    // 是否显示最小化按钮
    showMinimize: boolean = true
    // 是否显示关闭按钮
    showClose: boolean = true
    // 是否允许手动调整窗口大小
    allowResize: boolean = true
    // 显示层级
    zIndex: number = 0

    constructor(type: AppFormEnum,
        isShow: boolean,
        id: string) {
        this.isShow = isShow
        this.type = type
        this.id = id
    }
}