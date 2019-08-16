import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        // 只有mutations定义的函数，才能变更store数据
        // 不执行异步操作（用action）
        add(state) {
            state.count++
        },
        addN(state, step) {
            state.count += step
        },
        sub(state) {
            state.count--
        },
        subN(state, step) {
            state.count -= step
        }
    },
    actions: {
        // 执行异步操作
        addAsync(context) {
            setTimeout(() => {
                context.commit('add')
            }, 2000)
        },
        addNAsync(context, step) {
            setTimeout(() => {
                context.commit('addN', step)
            }, 2000)
        },
        subAsync(context) {
            setTimeout(() => {
                context.commit('sub')
            }, 2000)
        }
    },
    //getters对state进行包装不改变数值
    getters: {
        showNum(state) {
            return '当前最新的数量是【' + state.count + '】'
        }
    }
})