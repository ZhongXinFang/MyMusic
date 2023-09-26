import { AppFormEnum } from '@/components/FormBase/AppFormEnum.ts'
export interface IFormItem {
    obj: any,
    type: AppFormEnum,
    isShow: boolean,
    id: string,
}

export class FormItem implements IFormItem {
    obj: any
    type: AppFormEnum
    isShow: boolean
    id: string

    constructor(type: AppFormEnum,
        isShow: boolean,
        obj: any,
        id: string)
    {
        this.isShow = isShow
        this.obj = obj
        this.type = type
        this.id = id
    }
}