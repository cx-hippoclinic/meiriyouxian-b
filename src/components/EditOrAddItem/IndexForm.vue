<template>
  <a-form-model ref="ruleForm" :model="detailData" :rules="rules"  v-bind="layout">
    <a-form-model-item label="标题" prop="title" >
      <a-input v-model="detailData.title" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" >
      <a-input v-model="detailData.desc"  autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" prop="category" required>
      <a-select :value="handleCategory" @change="handleCategoryChange" >
        <a-select-option :value="it" v-for="it in getAllCategory" :key="it.id">
          {{ it }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags"  >
      <a-select
          mode="multiple"
          :default-value="detailData.tags"
          :key="myKey"
          style="width: 100%"
          @change="handleChangeTag"
          placeholder="Please select">
<!--      >-->
          <a-select-option v-for="i in detailData.tags" :key="(i + 9).toString(36) + i">
            {{ i }}
          </a-select-option>

      </a-select>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        title:'',
        desc:'',
        category:'',
        tags:[],
        price:0,
        price_off:0,
        inventory:0,
        unit:'',
        images:[]
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        category: [{ required: true, message: '请输入分类内容', trigger: 'blur' }],
        tags: [{ required: true, message: '请选择商品标签', trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 12 },
      },
      myKey:'123'
    };
  },

  props:['detailData'],
  watch:{
    detailData:function (newValue, oldValue){
        this.ruleForm.tags = newValue.tags
        this.myKey = '456'

    }
  },
  mounted() {

      this.$bus.$on('submit1',this.changeTrueTags)
  },
  destroyed() {
      this.$bus.$off('submit1',this.changeTrueTags)
  },
  computed:{
    getAllCategory(){
      return this.$store.state.category.map(it=>it.name)
    },
    handleCategory(){
      return this.getAllCategory[this.detailData.category-1]
    },
  },

  methods: {

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      this.ruleForm.category = value
    },
    handleChangeTag(value) {
      this.ruleForm.tags = value
    },
    handleCategoryChange(e){
      this.detailData.category =  this.getAllCategory.indexOf(e) + 1
    },
    changeTrueTags(){
      this.detailData.tags = this.ruleForm.tags
    }
  },

};
</script>
