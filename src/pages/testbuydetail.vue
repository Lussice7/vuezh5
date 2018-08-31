<template>
    <div class="container testpaper_page">
        <my-header :title="title" :isBack="isBack" :isCart="isCart"></my-header>
        <div class="testpaper_info">
            <div class="paper_img text-center">
                <img :src="test.quesLibImageUrl" alt="">
            </div>
            <div class="paper_name">
                {{test.quesLibName}}
            </div>
            <div class="pager_price">
                价格
                <span>{{price}}</span>
            </div>
            <div class="paper_type clear-fix">
                <div v-for="(item,index) in test.packages" :key="item.packageId" :class="[{active:selected==index},'mktu']" @click="tchoose(item.price,index)">{{item.packageName}}<img src="../assets/image/bac.png" alt=""></div>
                <div :class="[{active:selected==1},'mktu']" v-if="dujia" @click="tchoose(null,1)">独家解析题库<img src="../assets/image/bac.png" alt=""></div>
            </div>
            <div class="paper_type_show">
                <img :src="test.packageImage">
            </div>
        </div>
        <div class="paper_synopsis">
            <h3>题库简介</h3>
            <div class="synopsis_desc" v-html="test.quesLibDesc">
            </div>
        </div>
        <div class="ljg_btn">
            <button type="button">立即购买</button>
        </div>
    </div>    
</template>
<script>
import MyHeader from '@/components/header'
// import Toast from 'mint-ui'
export default {
    name:"testbuydetail",
    data(){
        return{
            title:"试卷购买详情",
            isBack:true,
            isCart:false,
            price:0,
            test:[],     //数据
            dujia:false,
            selected:0
        }
    },
    components:{
        MyHeader
    },
    methods:{
        tchoose(price,index){
            if(price==null){
               this.$toast({
                    message: '敬请期待',
                    position: 'middle',
                    duration: 3000
                });
            }else{
                this.price=price;
                this.selected=index;
            }
        }
    },
    activated(){
        this.$http({
            method:'GET',
            url:'api/quesLib/quesLibDetail',
            params:{
                quesLibId:this.$route.query.quesLibId
            }
        }).then(data=>{
            console.log(data.data);
            var data=data.data;
            if(data.code=="00000"){
                this.test=data.data;
                if(this.test.packages.length<2){
                    this.dujia=true;
                }
            }
        })
    }
}
</script>
<style>
.testpaper_page .testpaper_info{
    background:#fff;
    padding:0rem 0.2rem;
    margin-bottom:0.14rem;
}
.testpaper_page .testpaper_info .paper_img{
    padding-top:.14rem;
}
.testpaper_page .testpaper_info .paper_img img{
    width:3.2rem;
    vertical-align:middle;
}
.testpaper_page .testpaper_info .paper_name{
    margin-top:.2rem;
    font-size:.3rem;
}
.testpaper_page .testpaper_info .pager_price{
    margin-top:.2rem;
    padding:.14rem;
    background:#f5f5f5;
    border-radius:4px;
    font-size:.25rem;
    color:#666;
}
.testpaper_page .testpaper_info .pager_price span{
    margin-left:.2rem;
    border-radius:4px;
    font-size:.28rem;
    color:#fc3838;
}
.testpaper_page .testpaper_info .paper_type{
    margin-top:.2rem;
    padding:0 .2rem;
}
.testpaper_page .testpaper_info .paper_type div{
     width:2.3rem;
     height:0.65rem;
     line-height:.65rem;
     text-align: center;
     border:1px solid #666;
     border-radius:4px;
     margin-bottom:.14rem;
}
.testpaper_page .testpaper_info .paper_type div img{
	display:none;
}
.testpaper_page .testpaper_info .paper_type div:nth-child(odd){
	float:left;
}
.testpaper_page .testpaper_info .paper_type div:nth-child(even){
	float:right;
}
.testpaper_page .testpaper_info .paper_type div.active{
    border:1px solid #0D80EF;
    border-radius:0;
    position: relative;
    box-shadow:0px 1px 1px #ccc;
}
.testpaper_page .testpaper_info .paper_type div.active img{
	display:block;
    position:absolute;
    right:0;
    top:0;
    height:100%;
}
.testpaper_page .testpaper_info .paper_type_show{
    padding-bottom:.2rem;
}
.testpaper_page .testpaper_info .paper_type_show img{
    width:100%;
    vertical-align:middle;
}
.testpaper_page .paper_synopsis{
    background:#fff;
    padding:0rem .2rem .2rem;
    margin-bottom: 1rem;
}
.testpaper_page .paper_synopsis h3{
    padding:.2rem 0rem;
    margin-bottom:.2rem;
    border-bottom:1px solid #f5f5f5;
}
.ljg_btn{
    width:100%;
    position:fixed;
    bottom:0;
    left:0;
}
.ljg_btn button{
    width:100%;
    height:0.8rem;
    background:#f78912;
    color:#fff;
    font-size:.3rem;
}
</style>
