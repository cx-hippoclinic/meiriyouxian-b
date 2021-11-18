<template>
  <a-form-model ref="ruleForm"  v-bind="layout">
    <a-form-model-item label="商品售价" required>
      <a-input v-model="detailData.price" type="number" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="折扣价格" >
      <a-input v-model="detailData.price_off" type="number" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" required>
      <a-input v-model="detailData.inventory" type="number" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="计量单位"  required>
      <a-input v-model="detailData.unit"  autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="商品相册"  >
      <a-upload
          action="https://mallapi.duyiedu.com/upload/images?appkey=chenxv_1635222813343"
          method="post"
          :data="(file)=>({avatar:file})"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChangeImg"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-form-model-item>
  </a-form-model>
</template>
<script>

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  data() {
    return {
      resultForm: {
        images: [],

      },

      layout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 12 },
      },
      // 关于上传图片的
      previewVisible: false,
      previewImage: '',
      fileList: [
      ],
      uid:''
    };
  },
  watch:{
    detailData:function (newValue){
      this.resultForm.images = newValue.images
      this.fileList = newValue.images.map((it,index)=>{
        return {
          uid: -index,
          name: 'image.png',
          status: 'done',
          url: it,
        }
      })
    }
  },
  props:['detailData'],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handleChangeImg({ file,event,fileList }) {
      // if(this.uid === file.uid){
      //   return
      // }
      // this.uid = file.uid
      if(file.status === 'done'){
        this.resultForm.images.push(file.response.data.url)
        console.log(this.resultForm.images)
      }
      this.fileList = fileList
    },
  },
};
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
