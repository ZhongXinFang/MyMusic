export class AddSongResDto {
    Title:string = null!                // 歌曲名称
    ArtistId:string = null!             // 歌手ID
    Album:string = null!                // 专辑
    Publicationdate:string = null!      // 发行日期
    ComposerArtistId:string = null!     // 作曲家
    LyricistArtistId:string = null!     // 作词家
    Coverimgjson:string = null!         // 歌曲封面
    Backgroundimgjson:string = null!    // 歌曲背景图    
    Audiofilesjson:string = null!       // 歌曲文件
    Lyricfilesjson:string = null!       // 歌曲文件
}