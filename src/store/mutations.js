import * as types from "./mutation-types"

const mutations = {
  [types.INDEX_IMG](state, imgIndex) {
    state.imgIndex = imgIndex
  }
}

export default mutations
