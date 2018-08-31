<template>
    <div class="container courseDetail_page">
        <my-header :title="title" :isBack="isBack" :isCart="isCart"></my-header>
        <div class="course_desc clear-fix">
            <div class="fl desc_pic">
                <img :src="courseDesc.courseImagePath" alt="" />
            </div>
            <div class="course_descdetail">
                <h3>{{courseDesc.courseName}}</h3>
                <div>
                    <p>总学时：{{courseDesc.courseHours}}学时</p>
                    <p>课程讲师：{{courseDesc.teachers}}</p>'
                    <p>{{courseDesc.devidePrice}}</p>'
                </div>
            </div>
        </div>
        <div class="course_nav">
            <ul class="clear-fix">
                <li :class="{active:selected==0}" @click="change(0)">
                    目录
                    <span></span>
                </li>
                <li :class="{active:selected==1}" @click="change(1)">
                    课程概述
                    <span></span>
                </li>
                <li :class="{active:selected==2}" @click="change(2)">
                    模考题库
                    <span></span>
                </li>
            </ul>
            <div class="coursenav_datail">
                <div class="lesson" v-show="lindex==0">
                    <div class="lesson_list" v-for="(item,index) in childlist" :key="index">
                        <h4>本课程{{item.courseHours}}学时</h4>
                        <dl>
                            <dt>
                                <h5>{{item.courseName}}</h5>
                                <div class="lesson_guide clear-fix" @click="toggle(item)">
                                    <input type="button" value="加入购物车" class="add_cart" />
                                    <i class="iconfont icon-shang fr" v-show="!item.isShow"></i>
                                    <i class="iconfont icon-shang1 fr" v-show="item.isShow"></i>
                                </div>
                            </dt>
                            <dd v-for="(items,index) in item.chapterlist" :key="index" v-show="item.isShow">
                                <h6 class="clear-fix" @click="toggle(items)">
                                    <em>{{items.chapterName}}</em>
                                    <i class="iconfont icon-shang fr" v-show="!items.isShow"></i>
                                    <i class="iconfont icon-shang1 fr" v-show="items.isShow"></i>
                                </h6>
                                <div class="chapter" v-show="items.isShow">
                                    <div v-for="(aitem,index) in items.sectionList" :key="index">{{aitem.selectionName}}</div>
                                </div>
                            </dd>  
                            
                        </dl>
                    </div>
                    <div class="go_buy">
                        <button class="join_cart">加入购物车</button>
                        <button class="lj_buy">立即购买</button>
                    </div>
                </div>
                <!--课程概述-->
                <div class="lesson" v-show="lindex==1">
                    <div class="lesson_title">
                        <i class="iconfont">&#xe62a;</i>课程简介
                    </div>
                    <div class="lesson_desc" v-html="courseDesc.courseDesc">
                       
                    </div>
                </div>
                <!--模考题库-->
                <div class="lesson" v-show="lindex==2">
                    <div class="tiku"></div>
                </div>
            </div>
        </div>    
    </div>
</template>
<script>
import MyHeader from '@/components/header'
export default {
    name:"classdetail",
    data(){
        return{
            title:"课程详情",
            isBack:true,
            isCart:false,
            courseDesc:[],
            childlist:[],
            selected:0,
            lindex:0
        }
    },
    components:{
        MyHeader
    },
    methods:{
        toggle(item){
            item.isShow=!item.isShow
        },
        change(index){
            this.selected=index;
            this.lindex=index
        }
    },
    activated () {
        this.$http({
            method:'GET',
            url:'api/CourseController/courseDesc',
            params:{
                courseId:this.$route.query.courseId
            }
        }).then(data =>{
            var data=data.data;
            if(data.code=="00000"){
               console.log(data.data.childList)
                data.data.courseDesc.childList.forEach(item => {
                    item.isShow=false;
                    if(item.chapterlist&& item.chapterlist.length){
                        item.chapterlist.forEach(item =>{
                            item.isShow=false;
                        })
                    }
                });
                console.log(data.data.courseDesc);
                this.courseDesc=data.data.courseDesc;
                this.childlist=data.data.courseDesc.childList;
            }
            
        }).catch(error=>{
            alert("数据请求失败");
        })
    }
}
</script>
<style>
.courseDetail_page {
    padding-bottom: 1.2rem;
}

.course_desc {
    margin: .14rem 0;
    padding: .2rem .2rem .3rem .2rem;
    background: #fff;
}

.course_desc .desc_pic {
    width: 3rem;
}

.course_desc .desc_pic img {
    width: 100%;
    height: 2.2rem;
}

.course_desc .course_descdetail {
    margin-left: 3.2rem;
}

.course_descdetail div {
    margin-top: .1rem;
}

.course_descdetail h3 {
    display: -webkit-box;
    font-size: .28rem;
    height: .75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.course_descdetail p {
    display: -webkit-box;
    margin-bottom: .04rem;
    color: #999;
    font-size: .22rem;
    word-break: break-all;
    width: 2.2rem;
    letter-spacing: 0.01rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.course_nav ul {
    background: #fff;
}

.course_nav ul li {
    float: left;
    width: 33.33%;
    text-align: center;
    font-size: .22rem;
    color: #000;
    padding: .25rem 0;
    position: relative;
}

.course_nav ul li.active {
    color: #389cd5;
    font-weight: bold;
}

.course_nav ul li.active span {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #389cd5;
    width: 100%;
    height: 2px;
}

.coursenav_datail .lesson_list h4 {
    font-size: .28rem;
    color: #57b0e4;
    background: #fff;
    padding: .14rem;
}

.coursenav_datail .lesson_list dl {
    padding: .2rem 0 0;
}

.coursenav_datail .lesson_list dl dt {
    padding: 0 .2rem;
    border-bottom: 1px solid #999;
}

.coursenav_datail .lesson_list dl dt h5 {
    font-size: .26rem;
    letter-spacing: 2px;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.coursenav_datail .lesson_list .lesson_guide {
    margin: .3rem 0;
}

.coursenav_datail .lesson_list .lesson_guide .iconfont {
    margin-top: .08rem;
    width: .3rem;
}

.coursenav_datail .lesson_list .lesson_guide .add_cart {
    border: none;
    padding: .08rem;
    border-radius: 4px;
    background: #f8a30e;
    box-shadow: 0px 2px 5px #888;
    color: #fff;
    font-size: .24rem;
}

.coursenav_datail .lesson_list dd h6 {
    padding: .2rem .2rem .15rem;
    font-size: .32rem;
    color: #71706e;
    /* border-bottom: 1px solid #888; */
}

.coursenav_datail .lesson_list dd h6 em {
    display: inline-block;
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .26rem;
}

.coursenav_datail .lesson_list dd {
    border-bottom: 1px solid #888;
}

.coursenav_datail .lesson_list dd .iconfont {
    margin-top: .03rem;
}

.coursenav_datail .lesson_list dd .chapter {
    border-top: 1px solid #999;
}

.coursenav_datail .lesson_list dd .chapter div {
    margin: .1rem 0rem .12rem;
    background: #fff;
    font-size: .24rem;
    padding: .12rem .2rem;
}

.coursenav_datail .lesson .lesson_title {
    margin: .25rem;
    font-size: .26rem;
}

.coursenav_datail .lesson .lesson_desc {
    padding: 0 .2rem;
}

.coursenav_datail .go_buy {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #eee;
    border-top: .2rem solid #fff;
    height: 1rem;
    line-height: 1rem;
    text-align: right;
}

.coursenav_datail .go_buy button {
    width: 1.5rem;
}

.coursenav_datail .go_buy .join_cart {
    border: none;
    padding: .08rem;
    border-radius: 4px;
    background: #f8a30e;
    box-shadow: 0px 2px 5px #888;
    color: #fff;
    font-size: .24rem;
}

.coursenav_datail .go_buy .lj_buy {
    border: none;
    padding: .08rem;
    border-radius: 4px;
    background: #fc3838;
    box-shadow: 0px 2px 5px #888;
    color: #fff;
    margin: 0rem .2rem 0rem .25rem;
    font-size: .24rem;
}

</style>