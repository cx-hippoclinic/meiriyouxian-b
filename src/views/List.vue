<template>
  <div>
    <SearchBar @searchClick="handleSearch"/>
    <a-table :columns="columns" :data-source="data" rowKey="id">
      <div slot="option" slot-scope="text">
        <a-button @click="editList(text)">编辑</a-button>
        <a-button @click="delList(text)">删除</a-button>
      </div>
      <div slot="grounding" slot-scope="status">
        <span>{{ status===1?'上架':'' }}</span>
      </div>
      <div slot="category" slot-scope="category">
        <span>{{ calCategory(category) || '' }}</span>
      </div>
    </a-table>
  </div>
</template>

<script>
import {getProductList,delProduct} from "@/api/productList"
import SearchBar from "@/components/SearchBar"
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'name',
    align:'center',
    width:'80px'
    // scopedSlots: { customRender: 'name' },
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'age',
    align:'center'
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'address1',
    ellipsis: true,
    align:'center'
  },
  {
    title: '类目',
    dataIndex: 'category',
    key: 'address2',
    ellipsis: true,
    align:'center',
    scopedSlots: { customRender: 'category' },
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'address3',
    ellipsis: true,
    align:'center'
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'address4',
    ellipsis: true,
    align:'center'
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'address5',
    ellipsis: true,
    align:'center'
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'address6',
    ellipsis: true,
    align:'center'
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    align:'center',
    scopedSlots: { customRender: 'grounding' },
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'address',
    scopedSlots: { customRender: 'option' },
    align:'center',
    width: '190px'
  },
];

export default {
  name: 'List',
  components:{
    SearchBar
  },
  data() {
    return {
      data:[],
      columns,
    };
  },
  created() {
    this.initProductData()
  },
  methods:{
    initProductData(data){

      getProductList(data).then(res=>{
        this.data = res.data
      })
    },
    calCategory(id){
      const res = this.$store.state.category.find((it)=>it.id === id)
      return res.name
    },
    delList(id){
      delProduct(id).then((res)=>{
        this.initProductData()
      })

    },
    editList(id){
      this.$router.push({name:'productEdit',params:{id}})
    },
    handleSearch(data){
      this.initProductData(data)
    }
  }
}
</script>

<style scoped>

</style>
