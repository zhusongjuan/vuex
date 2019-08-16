<template>
    <div>
        <!-- <h3>当前最新的count值为：{{$store.state.count}}</h3> -->
        <!-- <h3>{{$store.getters.showNum}}</h3> -->
        <h3>{{showNum}}</h3>
        <button @click="btnHandler1">-1</button>
        <button @click="subN(4)">-4</button>
        <button @click="subAsync">-1 Async</button>
    </div>
</template>
<script>
import {mapMutations, mapState,mapActions,mapGetters} from 'vuex'
export default {
    data(){
        return {}
    },
    computed:{
        ...mapState(['count']),
        ...mapGetters(['showNum'])
    },
    methods:{
        ...mapMutations(['sub','subN']),
        ...mapActions(['subAsync']),
        btnHandler1(){
            this.sub()
        }
    }
}
</script>
