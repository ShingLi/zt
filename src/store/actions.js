import * as types from './mutations-types'

export const selectPlay = function ({commit,state},{list,index}) {

    commit(types.SET_PLAYLIST,list)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_CURRENTINDEX,index)
}
