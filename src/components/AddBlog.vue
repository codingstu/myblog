<template>
  <div class="addBlog">
    <div class="addMain">
      <div class="row">
        <div class="text">博客标题：</div>
        <div class="iptBox">
          <input type="text" v-model="blogObj.title" />
        </div>
      </div>

      <div class="row rowAuthor">
        <div class="text">作者：</div>
        <div class="iptBox">
          <input type="text" v-model="blogObj.author"/>
        </div>
      </div>

      <!-- <div class="row">
        <div class="text">分类：</div>
        <div class="iptBox">
          <select v-model="blogObj.classify">
            <option v-for="item in classArr" :key='item.id'>{{item.classname}}</option>
          </select>
        </div>
      </div> -->

      <div class="row rowArea">
        <div class="text">博客内容：</div>
        <div class="iptBox">
          <textarea v-model="blogObj.content"></textarea>
        </div>
      </div>

      <div class="row">
        <div class="text"></div>
        <div class="iptBox">
          <button @click="onSubmit">发表博客</button>
        </div>
      </div>
    </div>
    <!-- <div class="blShowBox" v-show='blogObj.title'>
      <h1>博客预览</h1>
      <div class="row">标题：<b>{{blogObj.title}}</b></div>
      <div class="row">作者：<b>{{blogObj.author}}</b></div>
      <div class="row">时间：<b>{{meDate(new Date().getTime()/1000)}}</b></div>
      <div class="row">内容：<b>{{blogObj.content}}</b></div>
    </div> -->

  </div>
</template>

<script>
export default {
  data(){
    return{
      blogObj:{
        title:'',
        author:'',
        content:'',
      },
  }
},
  mounted(){
  },
  methods:{
    onSubmit() {
      const title = this.blogObj.title;
      const author = this.blogObj.author;
      const content = this.blogObj.content;
         this.$http.post(
          "/api/blog/addBlog",
          {
            title: title,
            author: author,
            content: content,
          },
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
           this.$message({
                title: "恭喜你",
                message: "添加成功",
                type: "success",
              });
              this.$router.push({ path: "/ShowBlog" });
            
          } else {
            alert(msg);
            console.log(msg);
          }
        });
            
            
     
    },
    // onSubmit(){
    //   axios({
    //     url:'https://ku.qingnian8.com/dataApi/blog/addBlog.php',
    //     params:this.blogObj
    //   }).then(res=>{
    //     if(res.data.code==400){
    //       alert('请填写内容')
    //       return
    //     }
    //     this.$router.push('/ShowBlog')
    //   })
    // },
    
    // getClassify(){
    //   axios({
    //     url:'https://ku.qingnian8.com/dataApi/blog/classBlog.php',
    //     timeout:5000
    //   }).then(res=>{
    //     console.log(res)
    //     this.classArr=res.data
    //   })
    // }
  }
};
</script>

<style lang="less" scoped>
input,
textarea,
select {
  outline: none;
}
.addBlog {
  padding: 50px 30px;
  min-height: 830px;
}
.addMain {
  padding: 0 80px;
  font-size: 18px;
  color: #333;
  .row {
    padding: 10px 0;
    display: flex;
    align-items: center;
    .text {
      width: 20%;
      text-align: right;
      padding-right: 10px;
    }
    .iptBox {
      width: 80%;
      input,
      textarea {
        width: 100%;
        padding: 10px;
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 3px;
        transition: 0.3s;
        font-size: 16px;
        color: #666;
        &:focus {
          border-color: #41b883;
          box-shadow: 0 0 10px rgba(65, 184, 131, 0.3);
        }
      }
      select {
        width: 50%;
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 16px;
        color: #333;
      }
      textarea {
        height: 150px;
      }
      button {
        width: 50%;
        height: 38px;
        background: #41b883;
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background: #2f6f52;
        }
      }
    }
  }
  .rowArea {
    align-items: flex-start;
  }
}

.blShowBox {
  font-size: 22px;
  color: #555;
  padding: 50px 0 30px;
  text-align: center;
  border-top: 1px solid #e4e4e4;
  margin-top: 30px;
}
.blShowBox h1{
  font-size: 30px;
  padding-bottom:30px;
}
.blShowBox .row{
  text-align: left;
  padding: 10;
}
</style>