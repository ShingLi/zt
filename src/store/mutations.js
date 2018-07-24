import * as types from './mutations-types'

const mutations = {
	
	[types.SET_SINGER](state,singer) {
        state.singer = singer
	},

	[types.SET_PLAYING](state,flag) {
		state.playing = flag
	},

	[types.SET_FULLSCREEN](state,flag) {
		state.fullScreen = flag
	},

	[types.SET_PLAYLIST](state,list) {
		state.playList = payload
	},

	[types.SET_SEQUENCELIST](state,list) {
		state.sequenceList = payload
	},

	[types.SET_CURRENTINDEX](state,index) {
		state.currentIndex = num
	},

	[types.SET_MODE](state,mode) {
		state.mode = mode
	}

}

export default mutations