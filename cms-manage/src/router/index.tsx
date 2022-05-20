import React, { lazy, Suspense } from 'react'
import App from "App"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loading from 'components/Loading'

// 定义数组每一项接口
interface IRouter {
    path: string;
    // component: React.FC;
    component: any;
    children?: IRouter[]
}

// @ts-ignore
const router_arr: IRouter[] = [
    { path: '/', component: App, children: [
            { path: '/list', component: lazy(()=> import('pages/List')) },
            { path: '/edit', component: lazy(()=> import('pages/Edit')) },
            { path: '/edit/:id', component: lazy(()=> import('pages/Edit')) },
            { path: '/means', component: lazy(()=> import('pages/Means')) },
            { path: '/namelist', component: lazy(()=> import('pages/nameList')) },
        ]
    },
    { path: '/login', component: lazy(()=> import('Login')) },
    { path: '/register', component: lazy(()=> import('Register')) },
]

const BaseRouter = () => (
    <BrowserRouter>
        <Suspense fallback={<div><Loading/></div>}>
            <Routes>
                {
                    router_arr.map((item,index)=> {
                        return (
                              item.children ?
                                  // 有子路由
                                  <Route key={index} path={item.path} element={<item.component/>}>
                                      {
                                          item.children.map((e,i)=> <Route key={i} path={e.path} element={<e.component/>}></Route>)
                                      }
                                  </Route>
                                  :
                                  // 没有子路由
                                  <Route key={index} path={item.path} element={<item.component/>}></Route>
                        )
                    })
                }
            </Routes>
        </Suspense>
    </BrowserRouter>
)

export default BaseRouter