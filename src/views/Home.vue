<template>
  <div class="home-container">
    <div class="top-card">
      <a-card title="Card title" :bordered="false" style="margin-right: 20px;flex-grow: 1">
        <p>Card content</p>
      </a-card>
      <a-card title="Card title" :bordered="false" style="margin-right: 20px;flex-grow: 1">
        <p>Card content</p>
      </a-card>
      <a-card title="Card title" :bordered="false" style="flex-grow: 1">
        <p>Card content</p>
      </a-card>
    </div>
    <Echarts></Echarts>
  </div>
</template>

<script>
import Echarts from "@/components/Echarts"
export default {
  name: 'Home',
  components:{
    Echarts
  }
}
</script>

<style lang="less" scoped>
  .top-card{
    box-sizing: border-box;
    background-color: rgb(236, 236, 236);
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
</style>
