<template>
  <div class="banxin">
    <el-carousel height="600px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img style="width: 100%; height: auto" :src="'http://127.0.0.1:9000/images/web/' + item.imgSrc" />
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<script>
import {BannerApi} from '@/request/api'
export default {
  name: "home",
  data() {
    return {
      bannerList: []
    };
  },
  async asyncData() {
    let res = await BannerApi();
    return {
      bannerList: res.data || []
    }
  }
}
</script>

<style scoped>

</style>
