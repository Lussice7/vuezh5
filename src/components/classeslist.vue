<template>
    <ul class="classes-list">
        <li v-for="course in courselists" @click="courseDetail(course.id)" :key="course.id">
            <div class="course_pic"><img :src="course.courseImagePath" alt=""></div>
            <p class="course_name">{{course.courseName}}</p>
            <div class="clearfix xutea">
                <span>{{course.courseHours}}学时</span>
                <span class="fr teacher">讲师:{{course.teacher}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    name:'classeslist',
    props:{
        courselists:Array
    },
    methods:{
        courseDetail(course_id){
            this.$router.push({
                path:'/classdetail',
                query:{
                    courseId:course_id
                }
            })
        }
    }
    
}
</script>
