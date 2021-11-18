<template>
  <div class="hasWidth">
    <a-menu
        style="height: 100vh; "
        :default-selected-keys="selectKey"
        :default-open-keys="openKey"
        mode="inline"
        theme="dark"
        :inline-collapsed="this.$store.state.collapsed"
    >
      <a-sub-menu v-for="it in hasChildList" :key="it.name">
          <span slot="title">
            <a-icon :type="it.mate.icon"/>
            <span>{{ it.mate.name }}</span>
          </span>
        <a-menu-item v-for="it2 in it.children" v-if="!it2.mate.hidden" :key="it2.name" @click="handleRouter(it2.name)">
          <a-icon :type="it2.mate.icon"/>
          <span>{{ it2.mate.name }}</span>
        </a-menu-item>
      </a-sub-menu>

    </a-menu>
  </div>

</template>

<script>
export default {
  name: 'ListItem',
  data(){
    return {
      openKey:[],
      setSelectKey:[]
    }
  },
  methods: {
    handleRouter(name) {
      this.$router.push({name: name})
    },
  },
  created() {
    this.selectKey = [this.$route.name]
    console.log(this.selectKey)
    const data = this.$route.path.split('/')[1]
    this.openKey = [data]
  },
  computed: {
    sideListData() {
      return this.$store.state.routes.filter(it => !it.mate.hidden)
    },
    hasChildList() {
      return this.sideListData.filter(it => it.children)
    },
  },
}
</script>

<style scoped>
.hasWidth {
  width: 250px;
}
</style>
