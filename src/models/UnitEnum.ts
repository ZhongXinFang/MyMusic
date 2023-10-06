import PlayingListForm  from '@/components/PlayingListForm.vue'
import SearchSongForm from '@/components/SearchSongForm.vue'
import AddSongForm from '@/components/AddSongForm.vue'

// 注意，这样有性能问题
export enum UnitEnum {
    'PlayingListFormUnit' = PlayingListForm,
    'SearchSongFormUnit' = SearchSongForm,
    'AddSongFormUnit' = AddSongForm,
}
