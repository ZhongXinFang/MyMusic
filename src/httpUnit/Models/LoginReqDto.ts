export class LoginReqDto {
	/**
	 * 邮箱
	 */
	Email: string = null!
	/**
	 * 密码 (RSA or HACH)
	 */
	Password: string = null!
}
