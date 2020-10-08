import * as types from "./mutation-types"

const mutations = {
  [types.INDEX_IMG](state, imgIndex) {
    state.imgIndex = imgIndex
  },
  [types.ROUTER_PATH](state, routerPath) {
    state.routerPath = routerPath
  },
  [types.IS_RESERVSTION_PAGE](state, isOPen) {
    state.isReservationPage = isOPen
  },
  [types.AD_USER_ID](state, adUserId) {
    state.adUserId = adUserId
  },
  [types.AD_REQ_PARAMS](state, params) {
    state.adReqParams = params
  }
}

export default mutations
