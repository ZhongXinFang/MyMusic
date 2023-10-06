<template>
    <div ref="html" class="login">
        <div class="conten">
            <p class="title">你需要登录账号之后才能使用</p>
            <div class="login-dialog">
                <div class="login-dialog-left">
                    <svg t="1669346820305" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3082">
                        <path
                            d="M983.38 306.44l-442.628 81.458a17.454 17.454 0 0 0-14.302 17.162v375.822c-31.38-18.59-72.608-24.724-113.914-13.666-74.146 19.85-120.418 87.528-103.352 151.164s91.006 99.13 165.152 79.28c65.884-17.638 109.718-73.042 106.704-129.814h0.188V469.482l367.992-67.74v289.742c-31.38-18.59-72.61-24.724-113.914-13.666-74.146 19.85-120.418 87.528-103.352 151.164 17.066 63.636 91.006 99.13 165.152 79.28 64.794-17.348 108.296-71.218 106.852-126.998H1004l0.008-457.66c0.002-10.906-9.896-19.14-20.628-17.164z"
                            fill="#707AFA" p-id="3083"></path>
                        <path
                            d="M474.336 977.676c-74.146 19.85-148.086-15.644-165.152-79.28a103.588 103.588 0 0 1-3.038-16.91c-1.166 12.202-0.254 24.62 3.038 36.894 17.066 63.636 91.006 99.13 165.152 79.28 65.884-17.638 109.718-73.042 106.704-129.814h0.188v-19.984h-0.188c3.014 56.774-40.82 112.176-106.704 129.814zM1004 761.28h-0.042c1.444 55.78-42.058 109.652-106.852 126.998-74.146 19.85-148.086-15.644-165.152-79.28a103.588 103.588 0 0 1-3.038-16.91c-1.166 12.202-0.254 24.62 3.038 36.894 17.066 63.636 91.006 99.13 165.152 79.28 64.794-17.348 108.296-71.218 106.852-126.998H1004l0.008-457.66v-0.006L1004 761.28z"
                            fill="#6770E6" p-id="3084"></path>
                        <path
                            d="M487.55 167.318c-30.86-99.616-129.14-131.888-191.96-142.34-15.806-2.62-31.02-3.864-41.386-4.454a12.668 12.668 0 0 0-13.394 12.65v378.478c-31.38-18.59-72.61-24.726-113.916-13.668-74.146 19.85-120.418 87.528-103.352 151.164 17.066 63.636 91.006 99.13 165.152 79.28 65.884-17.638 109.716-73.042 106.704-129.814h0.192V150.392c35.96 2.658 84.72 19.644 130.94 79.312 67.62 87.246 154.7 51.036 154.7 51.036-39.7 0.002-75.24-53.872-93.68-113.422z"
                            fill="#FF8354" p-id="3085"></path>
                        <path
                            d="M188.692 607.944c-74.146 19.85-148.086-15.644-165.152-79.28a103.55 103.55 0 0 1-3.008-16.66c-1.204 12.282-0.306 24.79 3.008 37.146 17.066 63.636 91.006 99.13 165.152 79.28 65.884-17.638 109.716-73.042 106.704-129.814h0.192v-20.486h-0.192c3.014 56.774-40.82 112.176-106.704 129.814z"
                            fill="#E0734A" p-id="3086"></path>
                        <path
                            d="M126.894 437.954c41.306-11.058 82.536-4.924 113.916 13.668v-39.966c-31.38-18.59-72.61-24.726-113.916-13.668-71.43 19.122-116.964 82.634-104.95 144.156 9.03-47.094 49.064-89.228 104.95-104.19z"
                            fill="#FFAC8C" p-id="3087"></path>
                        <path
                            d="M540.752 427.864l442.628-81.456c10.728-1.974 20.62 6.252 20.628 17.148v-39.952c0-10.904-9.896-19.138-20.628-17.162l-442.628 81.456a17.456 17.456 0 0 0-14.302 17.162v39.966a17.454 17.454 0 0 1 14.302-17.162zM835.308 717.784c41.306-11.058 82.534-4.924 113.914 13.666v-39.966c-31.38-18.59-72.61-24.724-113.914-13.666-71.43 19.124-116.964 82.634-104.95 144.156 9.03-47.094 49.064-89.228 104.95-104.19zM412.536 807.182c41.304-11.058 82.532-4.924 113.914 13.666v-39.966c-31.38-18.59-72.608-24.724-113.914-13.666-71.43 19.124-116.964 82.634-104.948 144.156 9.03-47.092 49.064-89.228 104.948-104.19z"
                            fill="#8F95E6" p-id="3088"></path>
                        <path
                            d="M244.204 54.496c10.366 0.59 25.582 1.834 41.386 4.454 62.82 10.452 161.1 42.724 191.96 142.34 10.292 33.238 25.916 64.698 44.612 86.018 33.838 3.914 59.066-6.566 59.066-6.566-39.7 0-75.24-53.874-93.68-113.424-30.86-99.616-129.14-131.888-191.96-142.34-15.806-2.618-31.02-3.864-41.386-4.454a12.668 12.668 0 0 0-13.394 12.65v21.598a12.806 12.806 0 0 1 3.396-0.276z"
                            fill="#FFAC8C" p-id="3089"></path>
                        <path
                            d="M865.658 118.83c-9.74 0-17.636-7.89-17.636-17.62 0-9.378-7.082-17.566-16.448-18.172-10.264-0.664-18.796 7.456-18.796 17.568v0.604c0 9.732-7.896 17.62-17.636 17.62-9.386 0-17.58 7.076-18.186 16.434-0.664 10.254 7.462 18.78 17.582 18.78h0.604c9.74 0 17.636 7.89 17.636 17.62 0 9.378 7.082 17.566 16.448 18.172 10.264 0.664 18.796-7.456 18.796-17.568v-0.604c0-9.732 7.896-17.62 17.636-17.62h0.604c10.12 0 18.248-8.524 17.584-18.78-0.608-9.358-8.804-16.434-18.188-16.434zM188.01 811.662c-13.588 0-24.602-11.006-24.602-24.582 0-13.082-9.88-24.504-22.946-25.35-14.318-0.926-26.22 10.402-26.22 24.508v0.842c0 13.576-11.014 24.582-24.602 24.582-13.092 0-24.524 9.872-25.37 22.926-0.928 14.306 10.41 26.198 24.528 26.198h0.844c13.588 0 24.602 11.006 24.602 24.582 0 13.082 9.88 24.504 22.946 25.35 14.318 0.926 26.22-10.402 26.22-24.508v-0.842c0-13.576 11.014-24.582 24.602-24.582h0.844c14.118 0 25.456-11.892 24.53-26.198-0.85-13.054-12.282-22.926-25.376-22.926z"
                            fill="#69EBFC" p-id="3090"></path>
                    </svg>
                </div>
                <div class="login-dialog-mid">
                    <div class="login-dialog-mid-box"></div>
                </div>
                <div class="login-dialog-right">
                    <div class="login-dialog-right-conent-radio">
                        <el-radio-group v-model="LoginModel" size="small">
                            <el-radio-button :label="0">登录</el-radio-button>
                            <el-radio-button :label="1">注册</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="login-dialog-right-conent">
                        <template v-if="LoginModel === 0">
                            <template v-if="LoginType === 0">
                                <el-form label-position="top" label-width="100px" :model="LoginByPasswordObj">
                                    <el-form-item label="邮箱">
                                        <el-input v-model="LoginByPasswordObj.Email" @blur="LoginEmailInputBlurEvent" />
                                    </el-form-item>
                                    <el-form-item label="密码">
                                        <el-input v-model="LoginByPasswordObj.Password" type="password" />
                                    </el-form-item>
                                </el-form>
                                <div class="login-dialog-right-conent-btn">
                                    <el-button :loading="loading" class="login-button" @click="LoginByPassword">
                                        登录</el-button>
                                </div>
                                <p class="info" @click="LoginType = 0"><a>忘记密码？暂时不会忘记密码</a></p>
                            </template>
                            <template v-if="LoginType === 1">
                                <el-form label-position="top" label-width="100px" :model="LoginByVerificationCodeObj">
                                    <el-form-item label="邮箱">
                                        <el-input v-model="LoginByVerificationCodeObj.Email" />
                                    </el-form-item>
                                    <el-form-item label="验证码">
                                        <el-input v-model="LoginByVerificationCodeObj.VerificationCode">
                                            <template #append>
                                                <el-button :disabled="LoginByVerificationCodeObj.VerificationCodeTimeMod"
                                                    @click="StartVerificationCodeTime(LoginByVerificationCodeObj)">{{
                                                        LoginByVerificationCodeObj.buttonTitle }}</el-button>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <div class="login-dialog-right-conent-btn">
                                    <el-button :loading="loading" class="login-button" @click="LoginByVerificationCode">
                                        登录</el-button>
                                </div>
                                <p class="info" @click="LoginType = 0"> <a>使用密码登录</a></p>
                            </template>
                        </template>
                        <template v-if="LoginModel === 1">
                            <el-form label-position="top" label-width="100px" :model="RegisterObj">
                                <el-form-item label="邮箱">
                                    <el-input v-model="RegisterObj.Email" />
                                </el-form-item>
                                <el-form-item label="验证码">
                                    <el-input v-model="RegisterObj.VerificationCode">
                                        <template #append>
                                            <el-button :disabled="RegisterObj.VerificationCodeTimeMod"
                                                @click="StartVerificationCodeTime(RegisterObj)">{{ RegisterObj.buttonTitle
                                                }}</el-button>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="RegisterObj.Password" type="password" />
                                </el-form-item>
                            </el-form>
                            <div class="login-dialog-right-conent-btn">
                                <el-button :loading="loading" class="login-button" @click="Register">
                                    暂时不开放注册</el-button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
// 这些 class 后面开放注册后需要提取到单独文件中去
class LoginByPasswordClass {
    Email: string = '演示账号@MyMusic.com'
    Password: string = 'string'
}

class LoginByVerificationCodeClass {
    Email: string = ''
    VerificationCode: string = ''
    // 正在倒计时
    VerificationCodeTimeMod: boolean = false
    VerificationCodeTime: number = 59
    buttonTitle: string = '获取验证码'
}

class RegisterClass {
    Email: string = ''
    VerificationCode: string = ''
    Password: string = ''
    // 正在倒计时
    VerificationCodeTimeMod: boolean = false
    VerificationCodeTime: number = 59
    buttonTitle: string = '获取验证码'
}

import { JSEncrypt } from 'jsencrypt'
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { AccountVerification, Login } from '@/httpUnit/UserAPI.ts'
import { AccountVerificationResDto } from '@/httpUnit/Models/AccountVerificationResDto.ts'
import { AccountVerificationReqDto } from '@/httpUnit/Models/AccountVerificationReqDto.ts'
import { LoginReqDto } from '@/httpUnit/Models/LoginReqDto.ts'
import { LoginResDto } from '@/httpUnit/Models/LoginResDto.ts'

// 页面显示模式 0 登录 1 注册
const LoginModel = ref(0)
// 登录模式 0 密码登录，1 验证码登录
const LoginType = ref(0)
const loading = ref(false)
const LoginByPasswordObj = ref(new LoginByPasswordClass())
const LoginByVerificationCodeObj = ref(new LoginByVerificationCodeClass())
const RegisterObj = ref(new RegisterClass())

// RSA 公钥信息
const RSAPublicKey = ref('')
const crypt = new JSEncrypt()

// 倒计时定时器
let timer: any = null

// 开始倒计时
const StartVerificationCodeTime = (obj: LoginByVerificationCodeClass | RegisterClass) => {
    obj.VerificationCodeTimeMod = true
    obj.VerificationCodeTime = 59
}

const LoginEmailInputBlurEvent = async () => {
    const req = new AccountVerificationReqDto()
    req.Email = LoginByPasswordObj.value.Email
    const res: AccountVerificationResDto | null = await AccountVerification(req)
    
    if (res === null) {
        ElMessage.error('账号并不存在!')
        return
    }
    else {
        RSAPublicKey.value = res.RSAPublicString
    }
}

const LoginByPassword = async () => {
    crypt.setPublicKey(RSAPublicKey.value)
    const password = crypt.encrypt(LoginByPasswordObj.value.Password)
    const req = new LoginReqDto()
    req.Email = LoginByPasswordObj.value.Email
    req.Password = password === false ? '' : password

    const res: LoginResDto | null = await Login(req)
    if (res === null) {
        ElMessage.error('账号或密码错误!')
        return
    }
}

const LoginByVerificationCode = () => {

}
const Register = () => {

}

onMounted(() => {
    timer = setInterval(() => {
        if (LoginByVerificationCodeObj.value.VerificationCodeTimeMod && LoginByVerificationCodeObj.value.VerificationCodeTime > 0) {
            --LoginByVerificationCodeObj.value.VerificationCodeTime
            LoginByVerificationCodeObj.value.buttonTitle = `${LoginByVerificationCodeObj.value.VerificationCodeTime}`
        }
        if (RegisterObj.value.VerificationCodeTimeMod && RegisterObj.value.VerificationCodeTime > 0) {
            --RegisterObj.value.VerificationCodeTime
            RegisterObj.value.buttonTitle = `${RegisterObj.value.VerificationCodeTime}`
        }

    }, 1000)
    LoginEmailInputBlurEvent()
})

onUnmounted(() => {
    clearInterval(timer)
})

</script>
  
<style scoped>
.login-dialog-right-conent-radio {
    display: flex;
    flex-direction: row-reverse;
    margin-right: 70px;
}

.info {
    font-size: 12px;
    color: #3b67ec;
    cursor: pointer;
    margin-top: 5px;
    text-align: right;
}

.title {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px;
}

.login-dialog {
    width: 98%;
    margin-inline: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.login-dialog-left {
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-dialog-left svg {
    width: 160px;
}

.login-dialog-mid {
    width: 5px;
    height: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-dialog-mid-box {
    width: 1px;
    border-right: 1px solid #aaa;
    height: 90%;
}

.login-dialog-right {
    width: 400px;
    min-height: 330px;
}

.login-dialog-right-conent {
    width: 250px;
    /* padding-top: 10px; */
    margin-inline: auto;
    margin-top: 10px;
}

.login-dialog-right-conent-btn {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-button {
    width: 250px;
    height: 40px;
    /* padding-block: 10px; */
}

.conten {
    width: 700px;
    min-height: 410px;
    padding-block: 50px;
    padding: 20px;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.login {
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    z-index: 999999;
}
</style>