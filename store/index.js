/* eslint-disable */
import { getGPUTier } from 'detect-gpu'

if (process.browser) {
  // https://github.com/watsondg/sniffer
  var sniffer = require('sniffer')
}

export const state = () => ({
  isMobile: null,
  isTablet: null,
  reducedMotion: false,
})

export const mutations = {
  SET(state, obj) {
    state[obj.property] = obj.value
  },
  CHECK_MOBILE(state) {
    state.isMobile = sniffer && sniffer.isPhone ? true : false
  },
  CHECK_TABLET(state) {
    state.isTablet = sniffer && sniffer.isTablet ? true : false
  },
  CHECK_MOTION(state, result) {
    state.reducedMotion = result
  },
}

export const actions = {
  set({ commit }, obj) {
    commit('SET', obj)
  },
  checkMobile({ commit }) {
    commit('CHECK_MOBILE')
  },
  checkTablet({ commit }) {
    commit('CHECK_TABLET')
  },
  async checkMotion({ commit }) {
    let result = false
    const gpuTier = await getGPUTier()

    if (gpuTier.tier < 3) {
      result = true
    }
    commit('CHECK_MOTION', result)
  },
}

export const getters = {
  isMobile: (state) => {
    return state.isMobile
  },
  isTablet: (state) => {
    return state.isTablet
  },
  isTouch() {
    try {
      document.createEvent('TouchEvent')
      return true
    } catch (e) {
      return false
    }
  },
}
