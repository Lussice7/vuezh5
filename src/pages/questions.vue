<template>
    <div class="tiku_page">
        <my-header :title="title" :isBack="isBack" :isCart="isCart"></my-header>
        <div class="container">
            <div class="tab_nav">
                <ul class="clear-fix">
                    <li v-for="(item,index) in questions" :key="item.centerId" :class="{active:selected==index}" @click="change(index)">{{item.centerName}}</li>
                </ul>
            </div>
            <div class="t_main">
                <div v-for="(item,index) in questions" :key="item.centerId" :class="{list_n:true,hide:selected!=index,show:selected==index}">
                    <div class="c_list" v-for="items in item.child" :key="items.cateId">
                        <div class="title clear-fix" @click="toggle(items,item.centerId,items.cateId,items.cateName)">
                            <i class="iconfont edit">&#xe62e;</i>
                            {{items.cateName}}
                            <div class="fr i_icon" v-show="!items.isShow">
                                <i class="icon iconfont">&#xe6c9;</i>
                            </div>
                            <div class="fr i_icon" v-show="items.isShow">
                                <i class="icon iconfont">&#xe623;</i>
                            </div>
                        </div>
                        <div class="t_content" v-show="items.isShow">
                            <ul class="clear-fix">
                                <li v-for="aitem in items.child" :key="aitem.cateId" @click="jump(item.centerId,aitem.cateId,aitem.cateName)">{{aitem.cateName}}</li>
                            </ul>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</template>
<script>
import MyHeader from '@/components/header'

export default {
    name:'questions',
    data(){
        return{
            title:"题库分类",
            isBack:false,          //头部是否含有返回箭头
            isCart:false,          //头部是否含有购物车icon
            selected:0,
            questions:[]
        }
    },
    components:{
        MyHeader
    },
    created(){
        this.getData();                   //题库分类列表数据方法
    },
    methods:{
        getData(){
            var that=this;
            that.$http.get("../../static/questions.json").then(function(data){
                // console.log(data.data.data);
                data.data.data.forEach(item => {
                    let cur=item.child;
                    if(cur && cur.length){
                        cur.forEach(item=>{
                            item.isShow=false;
                        })
                    }
                });
                that.questions=data.data.data;
                console.log(data.data.data)
            }).catch(function(error){
                 console.log(error)
            })
        },
        change(index){
            this.selected=index;
        },
        toggle(items,pCateId,subCateId,title){
            if(items.child && items.child.length){
                items.isShow=!items.isShow;
            }else{
                console.log(title)
                this.$router.push({
                    path:'/questionList',
                    query:{
                        currentPage:1,
                        pCateId:pCateId,
                        subCateId:subCateId,
                        pageSize:10,
                        title:title
                    }
                });
            }
        },
        jump(pCateId,subCateId,title){
            console.log(title)
            this.$router.push({
                path:'/questionList',
                query:{
                    currentPage:1,
                    pCateId:pCateId,
                    subCateId:subCateId,
                    pageSize:10,
                    title:title
                }
            });
        }
    }

}
</script>
<style>
.tiku_page .tab_nav li {
    font-size: .25rem;
    float: left;
    width: 33.33%;
    text-align: center;
    padding: .25rem 0;
    margin-bottom: .1rem;
    position: relative;
}

.tiku_page .tab_nav li:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: #389cd5;
    width: 100%;
    height: 2px;
    display: none;
}

.tiku_page .tab_nav li.active {
    color: #389cd5;
    font-size: .26rem;
}

.tiku_page .tab_nav li.active:after {
    content: "";
    display: block;
}

.tiku_page .t_main .c_list .title {
    margin: 0 .2rem;
    padding: .2rem .2rem;
    border-bottom: 0.08rem solid #ccc;
    background: #fff;
    font-size: .25rem;
}

.tiku_page .t_main .c_list .title .edit {
    margin-right: .2rem;
    color: #ccc;
}

.tiku_page .t_main .c_list .title .i_icon .iconfont {
    display: inline-block;
    width: .3rem;
    height: .3rem;
    line-height: .35rem;
    border-radius: 100%;
    color: #0075c2;
    background: rgba(0, 128, 255, 0.3);
    text-align: center;
    font-weight: bold;
}

.tiku_page .t_main .c_list .t_content {
    margin: .08rem .2rem 0rem;
    border-bottom: 0.08rem solid #ccc;
}

.tiku_page .t_main .c_list .t_content li {
    background: rgb(216, 218, 218);
    padding: 0.2rem 0;
    margin-bottom: .08rem;
    width: 49%;
    text-align: center;
    font-size: .22rem;
}

.tiku_page .t_main .c_list .t_content li:nth-child(odd) {
    float: left;
}

.tiku_page .t_main .c_list .t_content li:nth-child(even) {
    float: right;
}
</style>

