import { dbSongModel } from '@/db/dbModels/dbSongModel.ts'
import { MyDatabase } from '@/db/dbModels/DataBase.ts'

export class SongService {
    db: MyDatabase = null!
    constructor() {
        this.db = new MyDatabase()
    }
    addSong = async (data:dbSongModel) : Promise<boolean> => {
        const friendId = await this.db.Songs.add(data);
        return friendId ? true : false
    }
    GetSongById = async (id:string): Promise<dbSongModel | null> => {
        const data = await this.db.Songs.get(id)
        return data ?? null
    }
}