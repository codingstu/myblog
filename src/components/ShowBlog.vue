<template>
  <div class="showblog">
    <Header />
    <div class="list">
      <div class="time">{{ nowTime }}</div>
      
      <!-- <div class="item" v-for="item in blogArr" :key="item.title">
        
        <div class="top">
          <div class="title">标题:{{ item.title }}</div>
          <div class="time"></div>
        </div>

        <div class="center">内容:{{ item.content }}</div>
        <div class="bottom">
          <div class="classtify">分类：<span>{{item.classtify}}</span></div>
          <div class="author">
            作者：<span>{{ item.author }}</span>
          </div>
        </div>
      </div> -->

       <!-- <div class="item" :data="blogArr" >
         <el-button @click="del(item.title)">删除</el-button> 
      <el-table v-for="item in blogArr" :key="item.title"> 
      <el-table-column label="标题">{{item.title}}</el-table-column>
      <el-table-column label="姓名" >{{item.author}} </el-table-column>
      <el-table-column label="地址">{{item.content}}</el-table-column>
      </el-table > -->

<table class="item">
    <tr v-for="item in blogArr" :key="item.title" >
          <td >{{item.title}}</td>
          <td >{{item.author}}</td>
          <td >{{item.content}}</td>
          <el-button @click.prevent="del(item.title)">删除</el-button> 
          <!-- <td><a href="/api/blog/delBlog?title={$value.title}">del</a></td> -->
    </tr>
  </table>
      
      
    <!-- </div> -->
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
import Header from "./header";
console.log(common.myDate("1622184695908"));

export default {
  name: "ShowBlog",
  data() {
    return {
      blogArr:{
         title: "",
         author: "",
         content: "",
      },
      p: 1,
      nowTime: "",
    };
  },
  components: {
    Header,
  },
  mounted() {
    this.getBlog(), this.nowTimes();
  },
  beforeDestroy() {
    this.clear();
  },
  methods: {
    getBlog(page = 1) {
      this.$http
        .get("/api/blog/getBlog", {
          params: {
            num: 10,
            page,
          },
        })
        .then((res) => {
          this.blogArr = res.data;
          console.log(res.data);
        });
    },
    previousClick() {
      if (this.p <= 1) {
        alert("已经是第一页了");
        return;
      }
      this.p--;
      this.getBlog(this.p);
      this.goScrollTop();
    },
    nextClick() {
      this.p++;
      if (this.blogArr.length == 0) {
        alert("已经是最后一页了");
      }
      this.getBlog(this.p);
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
   async del(title) {
    //  let title = this.blogArr.title;
     const {num}= await this.$http.post("/api/blog/delBlog",{title:title} )
     this.getBlog()
   }
   }
};
</script>

<style scoped lang='less'>
.showblog {
  min-height: 500px;
  .list {
    padding: 40px;
    .item {
      margin-bottom: 40px;
      border: 1px solid rgb(146, 145, 145);
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