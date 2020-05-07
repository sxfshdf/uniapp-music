import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: true
	},
	getters:{
		isLogin: state => state.isLogin
	},
	mutations: {
		setLogin(state, data) {
			state.isLogin = data
			console.log('set state isLogin')
		}
	},
	actions: {}
})

export default store