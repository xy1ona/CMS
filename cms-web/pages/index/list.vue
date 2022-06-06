<template>
  <div class="banxin">
    <el-breadcrumb separator="/" style="padding: 20px 0">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData">
      <el-table-column
        prop="author"
        label="作者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题">
        <template slot-scope="scope">
          <nuxt-link :to="`/article?id=${scope.row.id}`">{{scope.row.title}}</nuxt-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
        <template slot-scope="scope">
          {{moment(scope.row.date).startOf('day').fromNow()}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {ArticleListApi} from '@/request/api'
import moment from 'moment'
export default {
  name: "list",
  data() {
    return {
      tableData: [],
      moment: moment
    };
  },
  async asyncData() {
    let res = await ArticleListApi();
    return {
      tableData: res.data || []
    }
  }
}
</script>

<style scoped>

</style>
