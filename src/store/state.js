import { payMode } from 'common/js/config'

const state = {

    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    currentIndex: -1,
    mode:payMode.sequence //顺序播放，循环播放，随机播放
}

export default state