<template>
    <div>
        <h3>当前最新的count值为：{{count}}</h3>
        <button @click="btnHandler1">+1</button>
        <button @click="btnHandler2">+n</button>
        <button @click="btnHandler3">+1 Async</button>
        <button @click="btnHandler4">+5 Async</button>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {}
    },
    computed:{
        ...mapState(['count'])
    },
    methods:{
        btnHandler1(){
            // 触发mutations的第一种方式
            this.$store.commit('add')
        },
        btnHandler2(){
            this.$store.commit('addN',3)
        },
        btnHandler3(){
            // 异步的让count 自增+1
            this.$store.dispatch('addAsync')
        },
        btnHandler4(){
            this.$store.dispatch('addNAsync',5)
        }
    }
}
</script>
