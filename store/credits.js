export const state = () => ({
  loading: true,
  credits: null,
  freeLists: { total: null, remaining: null, availableAt: null },
  plus: false,
  pro: false,
  autoTopUp: {
    enabled: false,
    threshold: 0,
    credits: 0,
  },
})

export const mutations = {
  setCredits(state, credits) {
    state.credits = credits
  },
  setFreeLists(state, freeLists) {
    state.freeLists = freeLists
  },
  setPlus(state, plus) {
    state.plus = plus
  },
  setPro(state, pro) {
    state.pro = pro
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setAutoTopUp(state, autoTopUp) {
    state.autoTopUp = autoTopUp
  },
}

export const actions = {
  async get({ commit }) {
    try {
      commit('setLoading', true)

      const { credits, freeLists, plus, pro, autoTopUp } = (
        await this.$axios.get('credits')
      ).data

      commit('setCredits', credits)
      commit('setFreeLists', freeLists)
      commit('setPlus', plus)
      commit('setPro', pro)
      commit('setAutoTopUp', autoTopUp)
      commit('setLoading', false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)

      commit('setCredits', 0)
      commit('setFreeLists', { total: 0, remaining: 0, availableAt: null })
      commit('setPlus', false)
      commit('setPro', false)
      commit('setAutoTopUp', {
        enabled: false,
        threshold: 0,
        credits: 0,
      })
      commit('setLoading', false)
    }
  },
  reset({ commit }) {
    commit('setCredits', 0)
    commit('setFreeLists', { total: 0, remaining: 0, availableAt: null })
    commit('setPlus', false)
    commit('setPro', false)
    commit('setAutoTopUp', {
      enabled: false,
      threshold: 0,
      credits: 0,
    })
    commit('setLoading', false)
  },
}
