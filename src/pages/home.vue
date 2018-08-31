<template>
    <div class="wrap">
        <swiper v-if="swiperList.length>1" :options="swiperOption" ref="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in swiperList" :key="index">
                <img class="swiper-img" :src="item.imageUrl" @click="jump(item.jumpUrl)">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- 按钮 -->
        <div class="study_choose" v-show="res">
            <div class="btn_choose clear-fix">
                <div class="fl" @click="studychoose(1)">
                    <img src="../assets/image/kcbutton.png" alt="">
                </div>
                <div class="fr" @click="studychoose(2)">
                    <img src="../assets/image/tikubutton.png" alt="">
                </div>
            </div>
            <div class="warm_tip">如需购买课程、题库学习卡，请联系培训机构</div>
        </div>
        <!-- 课程分类 -->
        <div class="classify">
            <div class="cclassfy_title text-center">
                <img src="../assets/image/coursefl.png" alt=""> 课程分类
            </div>
            <div class="classify_detail">
                <ul>
                    <li @click="courseFenlei(0)"><img src="../assets/image/course_1.png" alt=""></li>
                    <li @click="courseFenlei(1)"><img src="../assets/image/course_2.png" alt=""></li>
                    <li @click="courseFenlei(2)"><img src="../assets/image/course_3.png" alt=""></li>
                    <li @click="courseFenlei(3)"><img src="../assets/image/course_4.png" alt=""></li>
                    <li @click="courseFenlei(4)"><img src="../assets/image/course_5.png" alt=""></li>
                    <li @click="courseFenlei(5)"><img src="../assets/image/course_6.png" alt=""></li>
                </ul>
            </div>
        </div>
         <!-- 精选课程 -->
        <div class="c_chosen">
            <div class="chosen_title text-center">
                <img src="../assets/image/selectc.png" alt=""> 精选课程
            </div>
            <div class="profession" v-for="item in courseList" :key="item.id">
                <div class="fgx"></div>
                <h3>{{item.cateName}}</h3>
                <classes-list :courselists="item.courses"></classes-list>
            </div>
        </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ClassesList from "@/components/classeslist";
export default {
  name: "home",
  components: {
    swiper,
    swiperSlide,
    ClassesList
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true,
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true
      },
      swiperList: [],
      courseList: [],
      courselists: [],
      res: true
    };
  },
  created() {
    this.postData(); //定义banner图方法
  },
  computed: {
       swiperA() {
            return this.$refs.swiperOption.swiper
        }
    // showSwiper() {
    //   return this.swiperList.length;
    // }
  },
  methods: {
    postData() {
      var _this = this;
      _this.$http
        .get("api/index/carousel/picture")
        .then(function(data) {
          // console.log(data);
          _this.swiperList = data.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      _this.$http
        .get("api/v1/CourseController/courseFirstCateList")
        .then(function(data) {
          _this.courseList = data.data.data;
          console.log(_this.courseList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    jump(url) {
      console.log(url);
    },
    courseFenlei(id) {
      //课程分类点击事件
      console.log(id);
    },
    courseDetail(id) {
      console.log(id); //精选课程点击事件
    }
  },
//   mounted() {
//     console.log("this is swiper A instance object", this.swiperA);
//   }
};
</script>
<style>
.wrap {
  padding-bottom: 1rem;
}
.swiper-container {
  height: 3rem;
}
.swiper-container img {
  width: 100%;
  height: 3rem;
}
.swiper-pagination-bullet {
  background: #fff;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #f00;
}
.study_choose .btn_choose {
  margin-top: 0.14rem;
}
.study_choose .btn_choose div {
  width: 48%;
}
.study_choose .btn_choose img {
  width: 100%;
}
.study_choose .warm_tip {
  margin-top: 0.14rem;
  padding-left: 0.2rem;
  text-align: left;
  color: #f00;
  font-size: 0.24rem;
}
/* 课程分类 */
.classify {
  background: #fff;
  padding: 0.28rem 0.2rem 0.26rem;
  margin-top: 0.14rem;
}

.classify .cclassfy_title,
.c_chosen .chosen_title {
  font-size: 0.26rem;
  color: #444;
}

.classify .cclassfy_title img,
.c_chosen .chosen_title img {
  width: 0.28rem;
  vertical-align: baseline;
}

.classify .classify_detail {
  display: flex;
  justify-content: space-between;
}

.classify .classify_detail li {
  display: inline-block;
  width: 32.3%;
  text-align: center;
}

.classify .classify_detail li img {
  width: 100%;
}
/* 精选课程 */
.c_chosen {
  background: #fff;
  padding: 0.28rem 0rem;
  margin-top: 0.14rem;
}

.profession .fgx {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #eee;
  margin: 0.26rem 0;
  position: relative;
}

.profession .fgx:before {
  position: absolute;
  top: -2px;
  left: -4px;
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: #eee;
}

.profession .fgx:after {
  position: absolute;
  top: -2px;
  right: -4px;
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: #eee;
}

.profession h3 {
  margin-left: 0.2rem;
  padding-left: 0.15rem;
  border-left: 0.05rem solid #0075c2;
  font-size: 0.28rem;
  color: #0075c2;
  font-weight: normal;
  text-align: left;
}

/* .profession ul{display:flex;justify-content:space-between;} */

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

