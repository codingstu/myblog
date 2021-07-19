<template>
  <div class="showblog">
    <div class="list">
      <div class="time">{{ nowTime }}</div>
      <div class="item" v-for="item in newsArr" :key="item.data">
        <div class="top">
          <h3 class="title">标题:{{ item.title }}</h3>
          <div class="title">标题:{{ item.title2 }}</div>
         
        </div>

        <div class="center">内容:{{ item.href }}</div>
        <div class="bottom">
          <!-- <div class="classtify">分类：<span>{{item.classtify}}</span></div> -->
          <div class="author">
            作者：<span>{{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <div @click="previousClick">上一页</div>
      <p>第{{ p }}页</p>
      <div @click="nextClick">下一页</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import common from "../assets/js/common";

console.log(common.myDate("1622184695908"));

export default {
  name: "ShowBlog",
  data() {
    return {
      title: "",
      title2: "",
      time: "",
      href: "",
      newsArr: [],
      p: 1,
      nowTime: "",
    };
  },
  mounted() {
    this.getNews(), 
    this.nowTimes();
  },
  beforeDestroy() {
    this.clear();
  },
  methods: {
      getHref(val){
	    return 'http://baidu.com?goodsId='+val
	},

    getNews(page = 1) {
      this.$http
        .get("/api/news/getNews", {
          params: {
            num: 10,
            page,
          },
        })
        .then((res) => {
          this.newsArr = res.data;
          console.log(res.data);
        });
    },
    previousClick() {
      if (this.p <= 1) {
        alert("已经是第一页了");
        return;
      }
      this.p--;
      this.getNews(this.p);
      this.goScrollTop();
    },
    nextClick() {
      this.p++;
      if (this.newsArr.length == 0) {
        alert("已经是最后一页了");
      }
      this.getNews(this.p);
      this.goScrollTop();
    },
    goScrollTop() {
      if (document.body.scrollTop) {
        document.body.scrollTop = 0;
      } else {
        document.documentElement.scrollTop = 0;
      }
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        year +
        "." +
        month +
        "." +
        date +
        "  " +
        "星期" +
        "日一二三四五六".charAt(new Date().getDay()) +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
  },
};
</script>

<style scoped lang='less'>
.showblog {
  min-height: 500px;
  .list {
    padding: 40px;
    .item {
      margin-bottom: 40px;
      .top {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 25px;
          color: #333;
        }
        .time {
          font-size: 18px;
          color: #666;
        }
      }
      .center {
        margin: 15px 0 30px;
        background-color: #efefef;
        padding: 20px;
        border-radius: 3px;
      }
      .bottom {
        font-size: 14px;
        color: #999;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 16px;
          color: #666;
        }
      }
    }
  }

  .page {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    align-items: center;
    div {
      padding: 10px 30px;
      border: #41b883 1px solid;
      margin: 0 10px;
      color: #41b883;
      font-size: 14px;
      cursor: pointer;
      transition: 0.8s;
      &:hover {
        background-color: #41b883;
        color: #fff;
      }
    }
  }
}
</style>