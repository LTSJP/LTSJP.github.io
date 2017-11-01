<template lang="html">
  <div class="sort">
    <header>
      <div class="back">
        <i class="yo-ico" @click="back">&#xe679;</i>
      </div>
      <router-link class="search" tag="div" to="/search">
        <i class="yo-ico">&#xe65c;</i>
        <span>搜索商品</span>
      </router-link>
    </header>
    <div class="sortlist">
      <ul class="sidetab">
        <li v-for="(item,index) in sidetablist" :key="index" :class="{select:selnum===index}" @click="getlist(item,index)">
          {{item}}
        </li>
      </ul>
      <div class="list">
        <router-link tag="dl" to='/searchList' v-for="(item,index) in listdata.second_cate" :key="index">
          <dt>
            <img v-lazy="item.pic">
          </dt>
          <dd>
            {{item.text}}
          </dd>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue/dist/vue'
  import axios from 'axios'
  import { Lazyload } from 'mint-ui'
  Vue.use(Lazyload)
  export default ({
    data(){
      return {
        selnum:0,
        sidetablist: [
          "为你推荐",
          "女装",
          "男装",
          "母婴",
          "鞋类",
          "箱包",
          "居家百货",
          "家电数码",
          "内衣配饰",
          "美妆",
          "运动户外",
          "美食",
          "车品文娱"
        ],
        alllist:[],
        listdata:{}
      }
    },
    methods: {
      getlist(item,index){
        this.selnum = index
        this.listdata = this.alllist[index]
      },
      back(){
      	this.$router.back(-1)
      }
    },
    mounted(){
      axios.get('/vip/sort.php')
        .then((res)=>{
          this.alllist = res.data.data.category
          this.listdata = this.alllist[0];
          console.log(res)
        })
    }
  })
</script>

<style media="screen" lang="scss">
  @import "../../styles/yo/usage/core/reset.scss";
  .sort{
    @include flexbox();
    @include flex-direction(column);
    width: 100%;
    height: 100%;
    
    header{
      @include flexbox();
      @include align-items(center);
      padding-left: .15rem;
      height: .5rem;
      @include border(0 0 1px 0, #bbbbbb);
      .back{
        i{
          font-size: .16rem;
        }
      }
      .search{
        width: 3.14rem;
        height: .28rem;
        margin-left: .15rem;
        @include border(1px,#bbbbbb,solid,5px);
        @include flexbox();
        @include align-items(center);
        padding-left:.1rem;
        i{
          font-size: .13rem;
          color: #8f8e94;
          margin-top: -4px;
        }
        span{
          font-size: .13rem;
          color: #333333;
          margin-left: .08rem;
        }
      }
    }
    .sortlist{
      @include flexbox();
      @include flex();
      width: 100%;
      .sidetab{
        li{
          width: .9rem;
          height: .46rem;
          line-height: .46rem;
          padding-left: .12rem;
          background: #f7f7f7;
          color: #333333;
          font-size: .13rem;
          @include border(0 0 1px 0,#ebebeb);
          &.select{
            @include border(0 0 0 8px,#eb5655);
            background: white;
            color: #eb5655;
          }
        }
      }
      .list{
        @include flex();
        @include flexbox();
        flex-wrap: wrap;
        overflow-y: scroll;
        dl{
          width: 33.33%;
          dt{
            width: 100%;
            img{
              width: 100%;
            }
          }
          dd{
            text-align: center;
          }
        }
      }
    }
  }
</style>
