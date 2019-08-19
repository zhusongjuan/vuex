<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value='inputvalue' @change="handleInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStatusChanged(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  computed:{
    //映射state的数据
    ...mapState(['inputvalue','viewKey']),
    ...mapGetters(['unDoneLength','infoList'])
  },
  created() { 
    //异步
    this.$store.dispatch('getList')
  },
  methods:{
    // 监听文本框内容的变化
    handleInputChange(e){
      console.log(e.target.value);
      // 同步
      this.$store.commit('setInputValue',e.target.value)
    },
    //向列表中新增item项
    addItemToList(){
      if (this.inputvalue.trim().length <= 0) {
          return this.$message.warning('文本框内容不能为空')
      }
      this.$store.commit('additem')
    },
    //根据id删除对应的任务事项
    removeItemById(id){
      console.log(id);
      this.$store.commit('removeItem',id)
    },
    // 监听复选框状态变化事件
    cbStatusChanged(e,id){
      //e.target.checked 可以接受到最新的选中状态
        console.log(e.target.checked);
        console.log(id);
        const param = {
          id:id,
          status:e.target.checked
        }
        this.$store.commit('changeStatus',param)
    },
    clean(){
      this.$store.commit('cleanDone')
    },
    changeList(key){
      console.log(key);
      this.$store.commit('changeViewKey',key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
