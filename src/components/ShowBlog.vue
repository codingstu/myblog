<template>
  <div class="showblog">
       <div class="list">
           <div class="item" v-for="item in blogArr" :key='item.data'>
               <div class="top">
                   <div class="title">标题:{{item.title}}</div>
                   <div class="time">{{meDate(item.posttime)}}</div>
               </div>
               <div class="center">
                   内容:{{item.content}}
               </div>
               <div class="bottom">
                   <!-- <div class="classtify">分类：<span>{{item.classtify}}</span></div> -->
                   <div class="author">作者：<span>{{item.author}}</span></div>
               </div>
           </div>
       </div>
       <div class="page">
          
           <div @click="previousClick">上一页</div>
            <p>第{{p}}页</p>
           <div @click="nextClick">下一页</div>
       </div>
  </div>
</template>

<script>
import axios from 'axios'
import common from '../assets/js/common'

console.log(common.myDate('1622184695908'))

export default {
    name:'ShowBlog',
    data(){
        return{
            title:'',
            author:'',
            content:'',
            blogArr:[],
            p:1
        }
    },
    mounted(){
       this.getBlog()
    },
        methods:{
          meDate(val){
              return common.myDate(val,5)
          },
            getBlog(page=1){
             this.$http.get(
          "/api/blog/getBlog",
          {
             params:{
                num:10,
                page
            }
          },
        ).then(res=>{
            this.blogArr=res.data
            console.log(res.data)
        })
            },
        previousClick(){
            if(this.p<=1){
                alert('已经是第一页了');
                return
            }
            this.p--;
            this.getBlog(this.p)
            this.goScrollTop()
        },
        nextClick(){
            this.p++
            if(this.blogArr.length==0){
                alert('已经是最后一页了')
            }
            this.getBlog(this.p)
            this.goScrollTop()
        },
        goScrollTop(){
            if(document.body.scrollTop){
                document.body.scrollTop=0
            }else{
                document.documentElement.scrollTop=0
            }
        }
        }
    }

</script>

<style scoped lang='less'>
.showblog{
    min-height: 500px;
    .list{
        padding:40px;
        .item{
            margin-bottom: 40px;
            .top{
                display: flex;
                justify-content: space-between;
                .title{
                    font-size: 25px;
                    color: #333;
                }
                .time{
                    font-size: 18px;
                    color: #666;
                }
            }
            .center{
                margin:15px 0 30px;
                background-color: #efefef;
                padding: 20px;
                border-radius: 3px;
            }
            .bottom{
                font-size: 14px;
                color:#999;
                justify-content:space-between;
                align-items: center;
                span{
                    font-size: 16px;
                    color:#666;
                }
            }
        }
    }

    .page{
        display: flex;
        justify-content: center;
        padding:10px 0;
        align-items: center;
        div{
            padding:10px 30px;
            border:#41B883 1px solid;
            margin:0 10px;
            color:#41B883;
            font-size: 14px;
            cursor: pointer;
            transition: 0.8s;
            &:hover{
            background-color: #41B883;
            color: #fff;
        }
        }
        
    }
}

</style>