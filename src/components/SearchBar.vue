<template>
  <div id="layout">
    <a-form layout="inline">
      <a-form-item
          label="检索关键字:"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-model="form.searchWord" placeholder="请输入关键字"/>
      </a-form-item>
      <a-form-item
          label="商品类目:"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
      >

        <a-select  style="width: 180px" v-model="form.category" allow-clear placeholder="请选择商品类目">
          <a-select-option :value="it.name" v-for="it in categoryList" :key="it.id">
            {{ it.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSearch">
          搜索
        </a-button>
      </a-form-item>
        <a-button class="add-btn">
          <router-link :to="{name:'productAdd'}">
            添加商品
          </router-link>
        </a-button>
    </a-form>
  </div>

</template>

<script>
import {getCategory} from "@/api/productList"

export default {
  data() {
    return {
      categoryList:[],
      form:{
        searchWord:'',
        category:undefined
      }
    }
  },
  async created() {
    const res = await getCategory()
    this.$store.commit('changeCategory',res.data)
    this.categoryList = this.$store.state.category

  },
  computed: {
    formItemLayout() {
      return {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
      }
    },
    buttonItemLayout() {
          return  {
            wrapperCol: {span: 14, offset: 9},
          }
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value
    },
    handleSearch(){
      console.log(this.categoryList)
      const categoryId = this.categoryList.find(it=>it.name === this.form.category).id
      const obj = {
        ...this.form,
        category: categoryId
      }
      this.$emit('searchClick',obj)
    }
  },
}
</script>
<style scoped>
#layout {
  margin: 5px 10px;
  position: relative;
}
.add-btn{
  position: absolute;
  right: 40px;
  top: 7px;
}
</style>
