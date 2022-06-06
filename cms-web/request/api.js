import request from './request'

// 导航接口
export const NavApi = () => request.get('/nav')

// banner接口
export const BannerApi = () => request.get('/banner')

// 文章列表接口
export const ArticleListApi = () => request.get('/list')

// 根据id获取文章
export const ArticleIdApi = (params) => request.get('/article', {params})
