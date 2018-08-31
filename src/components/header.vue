<template>
    <div class='my-header'>
        <h3 class="clearfix">
            <a @click="back" class="iconfont fl back" v-show="isBack">&#xe622;</a>{{title}}
            <a href="javascript:;" class="iconfont fr gocart" v-show="isCart">&#xe61b;</a>
        </h3>
    </div>
</template>
<script>
export default {
    name:'myheader',
    props:{
        title: String,
        isBack: Boolean,
        isCart: Boolean
    },
    methods:{
        back:function(){
            this.$router.go(-1);
        }
    }
    
}
</script>
