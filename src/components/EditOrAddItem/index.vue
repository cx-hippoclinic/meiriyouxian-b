<template>
  <div>
    <a-steps :current="current" style="width: 70%; text-align: center">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">

      <IndexForm :detail-data="detailData" v-show="current === 0"></IndexForm>
      <IndexFormNext :detail-data="detailData" v-show="current === 1"></IndexFormNext>

      <div class="steps-action" style="text-align: center">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
          下一步
        </a-button>

        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          上一步
        </a-button>
        <a-button
            v-if="current === steps.length - 1"
            type="primary"
            @click="submitChange"
        >
          提交
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import IndexForm from "./IndexForm"
import IndexFormNext from "./IndexFormNext"
import {getProductDetail,editProductDetail,addProduct} from "@/api/productList"

export default {
  created() {
    if(this.mode === 'edit'){
      getProductDetail(this.getCurrentId).then(res=>{
        this.detailData = res
      })
    }
  },
  props:['mode'],
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
          content: '1',
        },
        {
          title: '填写商品销售信息',
          content: '2',
        },
      ],
      detailData:{
        title:'',
        desc:'',
        category:'',
        tags:['包邮最晚次日达'],
        price:0,
        price_off:0,
        inventory:0,
        unit:'',
        images:[]
      }
    };
  },
  computed:{
    getCurrentId(){
      return this.$route.params.id
    }
  },
  methods: {
    next() {
      console.log(this.detailData)
      this.current++;
    },
    prev() {
      this.current--;
    },
    submitChange(){
      this.$bus.$emit('submit1')
      if(this.detailData.title && this.detailData.category && this.detailData.price
          && this.detailData.price_off && this.detailData.inventory){
        if(this.mode === 'edit'){
          editProductDetail(this.detailData).then(res=>{
            if(res.data.ok){
              this.$message.success('修改成功')
              this.$router.push({name:'productList'})
            }
          })
        }else {
          this.detailData.appkey = this.$store.state.user.appkey
          this.detailData.status = 1
          addProduct(this.detailData).then(res=>{
            if(res.data){
              this.$message.success('新增成功')
              this.$router.push({name:'productList'})
            }
          })
        }

      }else {
        this.$message.error('请填写完整')
      }

    }
  },
  components:{
    IndexForm,IndexFormNext
  }
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  //text-align: center;
  padding-top: 80px;
  padding-bottom: 30px;
}

.steps-action {
  margin-top: 24px;
}
</style>
