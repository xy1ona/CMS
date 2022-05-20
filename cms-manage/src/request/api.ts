import request from './request'

interface IRegisterParams {
    username: string | number;
    password: string | number;
}

// 注册
export const RegisterApi = (params: IRegisterParams) => request.post('/register', params)

// 登录
export const LoginApi = (params: IRegisterParams) => request.post('/login', params)

// 获取用户信息
export const UserInfoApi = () => request.get('/info')

interface IRegisterParams1 {
    username?: string | number;
    password?: string | number;
}
// 修改用户信息
export const ChangeUserInfoApi = (params: IRegisterParams1) => request.post('/info', params)

// 获取文章列表
export const GetArticleListApi = () => request.get('/article/list')

// 根据id获取文章
export const GetArticleDyIdApi = (id: number) => request.get(`/article/info/${id}`)

// 文章编辑
interface IEditArticleParams {
    id: number;
    title: string;
    subTitle?: string;
    content: string;
}
export const EditArticleApi = (params: IEditArticleParams) => request.post('/article/edit', params)

// 文章删除
export const DeleteArticleApi = (params: { id: number }) => request.post('/article/delete', params)

