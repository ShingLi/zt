import * as types from './mutations-types'

const mutations = {
	
	[types.SET_SINGER](state,singer) {
        state.singer = singer
    },
    [types.SET_PLAYING](state,flag) {
        state.playing = flag
    },
    [types.SET_PLAYLIST](state,list) {
        state.playList = list
    },
    [types.SET_SEQUENCELIST](state,list) {
        state.sequceList = list
    },
    [types.SET_FULLSCREEN](state,flag) {
        state.fullScreen = flag
    },
    [types.SET_CURRENTINDEX] (state,num) {
        state.currentIndex = num
    }
}

export default mutations