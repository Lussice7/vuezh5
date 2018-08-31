<template>
    <div class="container course_page">
        <my-header :title="title" :isBack="isBack" :isCart="isCart"></my-header>
        <div class="container clearfix">
            <div class="leftsidebar fl">
                <ul>
                    <li v-for="(item,index) in classlist" :key="item.centerId" :class="{active:selected==index}" @click="change(index)">
                        {{item.centerName}}
                    </li>
                </ul>
            </div>
            <div class="rightsidebar">
                <div v-for="(item,index) in classlist" :key="item.centerId" :class="{list_w:true,hide:selected!=index,show:selected==index}">
                    <div v-for="items in item.child" :key="items.cateId" class="c_list">
                        <div class="title clearfix" @click="showToggle(items)">
                            {{items.cateName}}
                            <div class="fr i_icon" v-show="!items.classname"><i class="icon iconfont">&#xe6c9;</i></div>
                            <div class="fr i_icon" v-show="items.classname"><i class="icon iconfont">&#xe623;</i></div>
                        </div>
                        <div class="t_content" v-if="items.child.length>0" v-show="items.classname">
                            <ul>
                                <li v-for="v in items.child" :key="v.cateId" @click="jump(item.centerId,v.cateId)">{{v.cateName}}</li>
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
    name:'classes',
    data(){
        return{
            title:'课程中心',
            isBack:false,
            isCart:false,
            selected: 0,
            classlist:[],
            activeIndex:-1
        }
    },
    components:{
        MyHeader
    },
    created(){
    },
    methods:{
        change(index){
            this.selected=index;
        },
        showToggle(item){
            item.classname =!item.classname
        },
        jump(parentCateId,subCateId){
            this.$router.push({
                path:'/classList',
                query:{
                    pageNo:1,
                    parentCateId: parentCateId,
                    subCateId: subCateId,
                    pageSize: 10
                }
            })
        }
    },
    activated () {
        var that=this;
        that.$http.get('api/CourseController/courseCateList').then(function(data){
            data.data.data.forEach(item=>{
                let cur = item.child;
                if (cur && cur.length) {
                    cur.forEach(item=>{
                        item.classname =false;
                    });
                }
            });
            that.classlist=data.data.data;
        }).catch(function(error){
            console.log(error)
        })
    }
    // mounted:{
        
    // }
}
</script>
<style>
.container{
    margin-top:.9rem;
    /* height:100%; */
}
.course_page .leftsidebar {
    height: 100%;
    width: 1.8rem;
    overflow: hidden;
    overflow-y: auto;
}

.course_page .leftsidebar li {
    font-size: .22rem;
    text-align: center;
    height: 0.7rem;
    line-height: 0.7rem;
}

.course_page .leftsidebar li.active {
    background: #fff;
}

.course_page .rightsidebar {
    height: 100%;
    margin-left: 1.8rem;
    background: #fff;
    overflow: hidden;
    overflow-y: auto;
}

.course_page .rightsidebar .item {
    display: none;
}

.course_page .rightsidebar .active {
    display: block;
}

.course_page .rightsidebar .c_list {
    border-bottom: .06rem solid #eee;
}

.course_page .rightsidebar .c_list .title {
    height: .8rem;
    line-height: .8rem;
    border-bottom: 0.01rem solid #eee;
    padding: 0rem .2rem;
    font-size: .22rem;
}

.course_page .rightsidebar .c_list .title .iconfont {
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

.course_page .rightsidebar .c_list .t_content {
    padding: .1rem .2rem .05rem .2rem;
}

.course_page .rightsidebar .c_list .t_content li {
    display: inline-block;
    padding: .15rem;
    font-size: .2rem;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 0.06rem;
    margin-right: .08rem;
}
</style>
