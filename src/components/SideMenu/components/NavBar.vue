<template>
  <div class="bar-container">
    <a-button type="primary" style="margin: 18px"
              @click="toggleCollapsed">
      <a-icon :type="this.$store.state.collapsed ? 'menu-unfold' : 'menu-fold'"/>
    </a-button>

    <a-breadcrumb>
      <a-breadcrumb-item v-for="it in barData" :key="it">{{ it }}</a-breadcrumb-item>

    </a-breadcrumb>


    <ul class="account">
      <li>
        {{ $store.state.user.username }}
        <a-icon type="down"/>
      </li>
      <li @click="loginOutUser">
        退出登录
      </li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    toggleCollapsed() {
      this.$store.commit('changeCollapsed')
    },
    loginOutUser() {
      this.$store.dispatch('userLoginOut').then(() => {
        this.$message.success('退出成功')
        this.$router.push({name: 'login'})
      })
    }
  },
  computed: {
    barData() {
      const currentRouter = this.$route.name
      const data = this.$store.state.routes
      const nameDataArr = []
      const resolveData = (data,father) => {
        return data.map(it => {
          // if (!it.mate.hidden) {
            if(it.children){
              resolveData(it.children,it.mate.name)
            }
            let title = father ? [father, it.mate.name]:[it.mate.name]
            nameDataArr.push({
              name:it.name,
              title
            })
          // }
        })
      }
      resolveData(data)
      const res = nameDataArr.filter(it=>it.name === currentRouter)
      return res[0].title
    }
  },

}
</script>

<style lang="less" scoped>
.bar-container {
  height: 53px;
  display: flex;
  align-items: center;
}

.account {
  position: relative;
  margin-left: auto;
  padding-right: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    li:last-of-type {
      display: block;
    }
  }

  li {
    padding: 5px 10px;

  }

  li:last-of-type {
    transition: 0.3s;
    position: absolute;
    top: 33px;
    display: none;

    &:hover {
      color: rgba(0, 0, 0, 0.4);
      display: block;
      background-color: #eee;
      font-weight: 700;
    }
  }


}

</style>
