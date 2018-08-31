<template>
    <div class="container tiku_page">
        <my-header :title="title" :isBack="isBack" :isCart="isCart"></my-header>
        <div class="tmpl">
            <div class="main-body tiku_main" ref="wrapper">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                    <div class="scroll-main">
                        <div class="classify_list" v-for="(item,index) in filmList" :key="index" @click="jump(item.id)"> 
                            <div class="test_paper clear-fix"> 
                                <div class="paper_pic fl"> 
                                    <img :src="item.imagePath"/> 
                                </div>
                                <div class="paper_desc fl"> 
                                    <div class="paper_name"> 
                                        {{item.quesLibName}}
                                    </div> 
                                    <div class="pager_price"> 
                                        <span v-if="item.oPrice==0" style="color:green;">免费</span>
                                        <span v-else>{{item.oPrice}}</span>
                                    </div> 
                                </div> 
                                <div class="pager_time fr"> 
                                    <div>{{item.updateTime | date}}</div> 
                                    <div>点击进入</div>
                                </div> 
                            </div> 
                        </div>
                    </div>    
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
import MyHeader from '@/components/header'
// import Scroller from '@/components/refresh'
export default {
    name:'questionList',
    data(){
        return{
            currentPage:1,
            title:this.$route.query.title,
            pCateId:this.$route.query.pCateId,
            subCateId:this.$route.query.subCateId,
            pageSize:10,
            isBack:true,          //头部是否含有返回箭头
            isCart:false,          //头部是否含有购物车icon
            filmList:[],            //数据
            allLoaded: false,       //可以进行上拉
            isAutoFill: false,      // 是否自动触发上拉函数
            // wrapperHeight: 0,
            courrentPage: 1
        }
    },
    components:{
        MyHeader
    },
    created(){
        // this.getData();
        // this.loadFrist();
    },
    // mounted: {
    //     // 父控件要加上高度，否则会出现上拉不动的情况
    //     this.wrapperHeight =
    //     document.documentElement.clientHeight -
    //     this.$refs.wrapper.getBoundingClientRect().top;
    // },
    methods:{
        loadTop() {
            this.loadFrist();
        },
    // 上拉加载
        loadBottom() {
            this.loadMore();
        },
    // 下拉刷新加载
        loadFrist() {
            // window.location.reload();
            this.$http({
                method:'GET',
                url:"api/quesLib/quesLibPage",
                params:{
                    currentPage:1,
                    pCateId:this.$route.query.pCateId,
                    subCateId:this.$route.query.subCateId,
                    pageSize:10
                }
            }).then(response => {
                // concat数组的追加
                this.filmList = response.data.data.quesLibs;
                this.currentPage=1;
                this.$refs.loadmore.onTopLoaded();
            })
            .catch(error => {
                console.log(error);
                alert("网络错误，不能访问");
            });
        },
        // 加载更多
        loadMore() {
            console.log(this.currentPage)
            this.$http({
                method:'GET',
                url:"api/quesLib/quesLibPage",
                params:{
                    currentPage:this.currentPage+1,
                    pCateId:this.$route.query.pCateId,
                    subCateId:this.$route.query.subCateId,
                    pageSize:10
                }
            }).then(response => {
                // concat数组的追加
                this.filmList = this.filmList.concat(response.data.data.quesLibs);
                if (this.courrentPage > 2) {
                    this.allLoaded = true; // 若数据已全部获取完毕
                }
                this.currentPage++;
                this.$refs.loadmore.onBottomLoaded();
                })
                .catch(error => {
                    console.log(error);
                    alert("网络错误，不能访问");
                });
        },
        jump(quesLibId){
            this.$router.push({
                path:'/testbuydetail',
                query:{
                    quesLibId:quesLibId
                }
            })
        }
    },
    activated(){
        // getData(){
            var that=this;
            that.$http({
                method:'GET',
                url:"api/quesLib/quesLibPage",
                params:{
                    currentPage:1,
                    pCateId:this.$route.query.pCateId,
                    subCateId:this.$route.query.subCateId,
                    pageSize:10
                }
            }).then(function(data){
                var data=data.data;
                if(data.code=="00000"){
                    that.filmList=data.data.quesLibs;
                }else{
                    console.log(data.errMsg);
                }
            })
            that.title=this.$route.query.title,
            that.currentPage=1;
        // }
    },
    filters:{
        date:function(value){
            if(value!=""){
                value=value.substr(0,10);
                return value;
            }
        }
    }
}
</script>
<style>
.main-body {
  /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
  overflow: scroll;
}
.container,.tmpl,.main-body,.scroll-main{
    height:auto;
    min-height:100vh;
}
.mint-loadmore,.mint-loadmore-content{
    height:auto;
    min-height:100vh;
    /* position:relative; */
}

.tiku_page .classify_list {
    margin: .2rem 0;
    padding: .24rem .2rem;
    border-top: 1px solid #d3d2d2;
    border-bottom: 1px solid #d3d2d2;
    background: #fff;
}

.tiku_page .classify_list .paper_pic {
    width: 1.5rem;
}

.tiku_page .classify_list .paper_pic img {
    width: 100%;
}

.tiku_page .classify_list .paper_desc {
    margin-left: .2rem;
    width: 2.6rem;
    border-right: 1px solid #d3d2d2;
}

.tiku_page .classify_list .paper_desc .paper_name {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-right: .1rem;
    height: .6rem;
    margin-bottom:.16rem;
    font-size: .28rem;
    line-height:.32rem;
    color: #000;
}

.tiku_page .classify_list .paper_desc .pager_price {
    font-size: .26rem;
    color: #f00;
}

.tiku_page .pager_time {
    padding-top: .1rem;
    line-height: .45rem;
    text-align: right;
    font-size: .25rem;
    color: #999;
}
</style>
