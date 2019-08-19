import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        inputvalue: 'qqq',
        nextId: '5',
        viewKey: 'all'
    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        // 给state里的inputvalue赋值
        setInputValue(state, val) {
            state.inputvalue = val
        },
        // 添加列表项
        additem(state) {
            const obj = {
                id: state.nextId,
                info: state.inputvalue.trim(),
                done: false
            }
            state.list.push(obj)
            state.nextId++
                state.inputvalue = ''
        },
        // 根据id删除对应的任务事项
        removeItem(state, id) {
            // 找到这项的索引，判断索引项的id和传过来的id
            const i = state.list.findIndex(x => x.id === id)
            if (i !== -1) {
                state.list.splice(i, 1)
            }
        },
        // 修改列表项的选中状态
        changeStatus(state, param) {
            const i = state.list.findIndex(x => x.id === param.id)
            if (i !== -1) {
                state.list[i].done = param.status
            }
        },
        // 清除已完成的任务
        cleanDone(state) {
            state.list = state.list.filter(x => x.done === false)
        },
        // 修改视图的关键字
        changeViewKey(state, key) {
            state.viewKey = key
        }

    },
    actions: {
        // 发送请求拿到json里的文件是异步操作
        getList(context) {
            axios.get('/list.json').then(({ data }) => {
                console.log(data);
                context.commit('initList', data)
            })
        }
    },
    // /getter用于对stroe中的数据进行加工处理形成新的数据
    // 只包装store中保存数据，并不会修改stroe中保存的数据，当stroe中的数据发生变化时，gette生成的内容也会随之变化
    getters: {
        unDoneLength(state) {
            // 过滤出list数组中done状态为false的数据的长度
            return state.list.filter(x => x.done === false).length
        },
        infoList(state) {
            if (state.viewKey === "all") {
                return state.list
            }
            if (state.viewKey === "undone") {
                return state.list.filter(x => !x.done)
            }
            if (state.viewKey === "done") {
                return state.list.filter(x => x.done)
            }
        }
    }
})