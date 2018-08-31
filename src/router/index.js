import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Classes from '@/pages/classes'
import Questions from '@/pages/questions'
import My from '@/pages/mycenter'
import QuestionList from '@/pages/questionList'
import ClassList from '@/pages/classList'
import ClassDetail from '@/pages/classdetail'
import TestBuyDetail from '@/pages/testbuydetail'


Vue.use(Router)

export default new Router({
  mode: 'history',           //切换路径模式，变成history模式，不然路径为/#/home
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:'/home',
      meta: {
        showNav: true
      }
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        showNav: true
      }
    },
    {
      path: '/classes',
      name:'classes',
      component:Classes,
      meta:{
        showNav:true
      }
    },{
      path: '/questions',
      name: 'questions',
      component: Questions,
      meta: {
        showNav: true
      }
    },
    {
      path:'/questionList',
      name:'questionList',
      component: QuestionList,
      meta:{
        showNav:false
      }
    },
    {
      path:'/classList',
      name:'classList',
      component:ClassList,
      meta:{
        showNav:false
      }
    },
    {
      path:'/classdetail',
      name:'classdetail',
      component:ClassDetail,
      meta:{
        showNav:false
      }
    },
    {
      path:'/testbuydetail',
      name:'testbuydetail',
      component:TestBuyDetail,
      meta:{
        showNav:false
      }
    }
  ]
})
