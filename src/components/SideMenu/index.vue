<template>
  <div class="menu-container">
    <div class="static">
      <ListItem :key="key"/>
      <div class="right-side" :class="{menuFold : this.$store.state.collapsed}">
        <NavBar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "./components/ListItem"
import NavBar from "./components/NavBar"
import { getCategory } from "@/api/productList"
export default {
  data(){
    return {
      key: new Date().getTime()
    }
  },
  watch:{
    $route(){
      this.key = new Date().getTime()
    }
  },
  components:{
    ListItem,NavBar
  },
  async created() {
    const res = await getCategory()
    this.$store.commit('changeCategory',res.data)
  }
}
</script>

<style lang="less" scoped>

.static{
  width: 100vw;
  display: flex;
}
.right-side {
  flex-grow: 1;
  height: 50px;
  width: 100%;

  //justify-content: space-between;
  transition: 0.2s;
  background-color: #fff;
}

.menuFold{
  margin-left: -150px;
}


</style>
