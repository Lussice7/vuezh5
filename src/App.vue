<template>
  <div id="app">
    <div class="tabbar" v-if="$route.meta.showNav">
		<div class="tabbar_item">
			<router-link to="/home"><i class="icon iconfont icon-shouye1"></i>首页</router-link>
		</div>
		<div class="tabbar_item">
			<router-link to="/classes"><i class="icon iconfont icon-kecheng"></i>课程中心</router-link>
		</div>
		<div class="tabbar_item">
			<router-link to="/questions"><i class="icon iconfont icon-icon-bainji"></i>题库中心</router-link>
		</div>
		<div class="tabbar_item">
			<router-link to="/my"><i class="icon iconfont icon-yonghu1"></i>用户中心</router-link>
		</div>
	</div>
    <keep-alive>
		<router-view></router-view>
	</keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="">
html,body{
	height: 100%;
	overflow-x:hidden;
}
ul,li,p,h1,h2,h3,h4,h5{
	margin: 0;
}
#app{
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
	background-color: #efefef;
}
.tabbar{
	display: flex;
	position: fixed;
	bottom: 0;
	justify-content: space-around;
	width: 100%;
	/* line-height: 50; */
	height: 50px;
	border-top: 1px solid #eee;
	background-color: #3e3c3c;
	z-index:60;
}
.tabbar_item{
	display: inline-block;
	width: 100%;
	text-align:center;
}
.tabbar_item a{
    display: inline-block;
    height: 50px;
    font-size: 12px;
	color: #fff;
	width: 100%;
	text-align: center;
}
.tabbar_item a i{
    display: block;
    margin-top: 7px;
    margin-bottom: 5px;
		font-size: 18px;
		text-align: center;
}
.router-link-exact-active.router-link-active{
	color: #46a2da
}
</style>
