import { VerificationCodeTypeEnum } from "@/httpUnit/Models/VerificationCodeTypeEnum.ts"
export class GetVerificationCodeReqDto
{
    Email: string = null!
    CodeEnum: VerificationCodeTypeEnum = null!
}