import apiBase from '@/httpUnit/APIBase.ts'
import { AccountVerificationResDto } from '@/httpUnit/Models/AccountVerificationResDto.ts'
import { AccountVerificationReqDto } from '@/httpUnit/Models/AccountVerificationReqDto.ts'
import { LoginFromEmailReqDto } from '@/httpUnit/Models/LoginFromEmailReqDto.ts'
import { LoginReqDto } from '@/httpUnit/Models/LoginReqDto.ts'
import { LoginResDto } from '@/httpUnit/Models/LoginResDto.ts'
import { RegistserReqDto } from '@/httpUnit/Models/RegistserReqDto.ts'
import { GetVerificationCodeReqDto } from '@/httpUnit/Models/GetVerificationCodeReqDto.ts'

// 验证账号是否存在，并且获取RSA加密公钥
export const AccountVerification = async (reqObj: AccountVerificationReqDto): Promise<AccountVerificationResDto | null> => {
    const res = await apiBase.post(`/Login/AccountVerification`, reqObj)
    return res?.data as AccountVerificationResDto ?? null
}

// 通过账号和密码登录
export const Login = async (reqObj: LoginReqDto): Promise<LoginResDto | null> => {
    const res = await apiBase.post(`/Login/Login`, reqObj)
    if (res?.status === 204)
        return {} as LoginResDto
    return null
}

// 通过账号和验证码登录
export const LoginByCode = async (reqObj: LoginFromEmailReqDto): Promise<LoginResDto | string> => {
    const res = await apiBase.post(`/Login/LoginFromEmail`, reqObj)
    if (res?.status === 204)
        return {} as LoginResDto
    return res.data as string
}

// 注册
export const Register = async (reqObj: RegistserReqDto): Promise<string| null> => {
    const res = await apiBase.post(`/Login/Register`, reqObj).catch((err) => err)
    if (res?.status === 200)
        return null
    return res?.data as string ?? null
}

// 验证Token是否有效
export const Authorize = async (): Promise<boolean> => {
    const res = await apiBase.post(`/Login/Authorize`)
    if (res?.status === 204)
        return true
    return false
}

// 获取验证码
export const GetVerifyCode = async (reqObj: GetVerificationCodeReqDto): Promise<string | null> => {
    const res = await apiBase.post(`/Login/GetVerificationCode`, reqObj).catch((err) => err)
    if (res?.status !== 204)
        return null
    return ''
}
