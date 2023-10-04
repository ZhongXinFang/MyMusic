import Dexie from 'dexie'
import { dbSongModel } from '@/db/dbModels/dbSongModel'

export class MyDatabase extends Dexie {
    Songs: Dexie.Table<dbSongModel, string>; 
    constructor() {
        super("MyDatabase");
        this.version(1).stores({
            Songs: "id,data"
        });
        this.Songs = this.table("Songs");
    }
}

export const dbService = new MyDatabase();