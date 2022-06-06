<template>
  <div class="banxin article_page">
    <el-breadcrumb separator="/" style="padding: 20px 0">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list' }">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>文章内容预览</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title align_center">{{content.title}}</div>
    <div class="sub_title align_center">(副标题：{{content.subTitle}})</div>
    <section class="description">
      <span>作者：{{content.author}}</span>
      <span>日期：{{moment(content.date).format('YYYY-MM-DD HH:MM:SS')}}</span>
    </section>
    <div class="content" v-html="content.content"></div>
  </div>
</template>

<script>
import {ArticleIdApi} from '@/request/api'
import moment from 'moment'
export default {
  name: "article",
  data() {
    return {
      content: {},
      moment: moment
    };
  },
  async asyncData({query}) {
    console.log( query)
    let res = await ArticleIdApi({id: query.id});
    console.log(res)
    return {
      content: res.data || {}
    }
  }
}
</script>

<style scoped lang="less">
.article_page {
  .align_center {
    text-align: center;
  }
  .title {
    font-weight: bold;
    font-size: 30px;
    margin: 20px;
  }
  .description {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  /deep/ .content {
    p {
      text-indent: 2em;
    }
  }
}

</style>
