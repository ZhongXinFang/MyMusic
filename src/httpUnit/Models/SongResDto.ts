export class SongResDto {
	Id: any = null!
	/**
	 * 歌曲名称
	 */
	Title: string = null!
	/**
	 * 歌手
	 */
	ArtistId: any = null!
	/**
	 * 专辑
	 */
	Album: string = null!
	/**
	 * 发布日期
	 */
	Publicationdate: Date = null!
	/**
	 * 作曲家
	 */
	ComposerArtistId: any = null!
	/**
	 * 作词家
	 */
	LyricistArtistId: any = null!
	/**
	 * 歌曲封面【Json】
	 */
	Coverimgjson: string = null!
	/**
	 * 歌曲背景图【Json】（用于首页背景）
	 */
	Backgroundimgjson: string = null!
	/**
	 * 歌曲文件【Json】
	 */
	Audiofilesjson: string = null!
	/**
	 * 歌词文件【Json】
	 */
	Lyricfilesjson: string = null!
}
