<template>
    <div class="course_page">
        <my-header :title="title" :isBack="isBack" :isCart="isCart"></my-header>
        <div class="container tmpl">
            <div class="c_chosen main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                    <div class="profession">
                        <classes-list :courselists="classlist"></classes-list>
                    </div>
                </mt-loadmore>
            </div>
        </div>
    </div> 
</template>
<script>
import MyHeader from '@/components/header'
import ClassesList from '@/components/classeslist'

export default {
    name:"classlist",
    data(){
        return{
            title:'企业三项岗位培训学院',
            isBack:true,
            isCart:false,
            classlist:[],          //数据列表
            allLoaded: false,       //可以进行上拉
            isAutoFill: false,      // 是否自动触发上拉函数
            wrapperHeight:0,
            pageNo:1
        }
    },
    components:{
        MyHeader,
        ClassesList
    },
    created(){
    },
    mounted() {
        // 父控件要加上高度，否则会出现上拉不动的情况
        this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
    },
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
                url:"api/CourseController/courseList",
                params:{
                    pageNo:1,
                    parentCateId: this.$route.query.parentCateId,
                    subCateId: this.$route.query.subCateId,
                    pageSize: 10
                }
            }).then(response => {
                // concat数组的追加
                this.classlist = response.data.data.courseList;
                this.pageNo=1;
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
                url:"api/CourseController/courseList",
                params:{
                    pageNo:this.pageNo+1,
                    parentCateId: this.$route.query.parentCateId,
                    subCateId: this.$route.query.subCateId,
                    pageSize: 10
                }
            }).then(response => {
                // concat数组的追加
                this.classlist = this.classlist.concat(response.data.data.courseList);
                if (this.pageNo > 2) {
                    this.allLoaded = true; // 若数据已全部获取完毕
                }
                this.pageNo++;
                this.$refs.loadmore.onBottomLoaded();
                })
                .catch(error => {
                    console.log(error);
                    alert("网络错误，不能访问");
                });
        },
        courseDetail(course_id){
            console.log(course_id);
        }
    },
    activated () {
        console.log(1);
        this.$http({
            method:'GET',
            url:'api/CourseController/courseList',
            params:{
                pageNo:1,
                parentCateId:this.$route.query.parentCateId,
                subCateId:this.$route.query.subCateId,
                pageSize: 10
            }
        }).then(response=>{
            console.log(response)
            var data=response.data;
            if(data.code=="00000"){
                this.classlist=data.data.courseList;
            }
        })
    }
}
</script>
<style>
.main-body {
  /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
  overflow: scroll;
}
.container,.tmpl,.main-body,.profession{
    height:auto;
    min-height:100vh;
}
.mint-loadmore,.mint-loadmore-content{
    /* overflow:scroll; */
    height:auto;
    min-height:100vh;
}
.course_page,.container{
    height:100%;
    margin-top:.8rem;
}
.c_chosen {
  background: #fff;
  padding: 0rem 0rem 0.28rem;
  margin-top: 0.14rem;
  height:100%;
}

.profession li {
  padding: 0rem 0.2rem;
  margin-top: 0.2rem;
  width: 45%;
  display: inline-block;
  vertical-align: top;
}

.profession li:nth-child(even) {
  padding-left: 0;
}

.profession li .course_pic {
  padding: 0.05rem;
  background: #fff;
  box-shadow: 0px 1px 1px #eee;
  border-radius: 4px;
}

.profession li img {
  width: 100%;
  height: 1.8rem;
  vertical-align: middle;
}

.profession li p {
  text-align: left;
  padding: 0rem 0.05rem;
  height: 0.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.24rem;
  color: #333;
  line-height: 0.3rem;
}

.profession li div {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.profession li div span {
  font-size: 0.17rem;
  color: #888;
}

.profession li div span.teacher {
  width: 1.4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
  line-height: 0.4rem;
}

.profession li div.xutea {
  padding: 0rem 0.05rem;
}
</style>
