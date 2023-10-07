export class SearchSongListReqDto<T> {
    Count: number = 0
    CurrentPage: number = null!
    TotalPage: number = null!
    PageSize: number = null!
    Data: T[] = null!
}