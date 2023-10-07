import { SongResDto } from '@/httpUnit/Models/SongResDto'
export class SongListResDto {
	Count: number = null!
	CurrentPage: number = null!
	TotalPage: number = null!
	PageSize: number = null!
	Data: SongResDto[] = null!
}