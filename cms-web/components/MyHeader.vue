<template>
<header>
  <div class="content banxin">
    <h1 class="header_title">CMS管理系统</h1>
    <el-menu
      :default-active="active"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item v-for="item in navList" :index="item.link" :key="item.id" :disabled="item.disabled === 1">{{ item.title }}</el-menu-item>
    </el-menu>
  </div>
</header>
</template>

<script>
import {NavApi} from "@/request/api"
export default {
  name: "MyHeader",
  data() {
    return {
      navList: []
    };
  },
  computed: {
    active() {
      return this.$route.path
    }
  },
  created() {
    NavApi().then(res=> {
      this.navList = res.data || []
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="less">
header {
  background: #545c64;
  .content {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header_title {
      color: #fff;
    }
  }
}

</style>
