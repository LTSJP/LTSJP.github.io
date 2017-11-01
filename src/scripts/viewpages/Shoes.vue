<template lang="html">
  <div class="shoes">
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item  v-for="(item,index) in balist" :key="index">
          <img :src="item.pic" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ul class="sort">
      <li v-for="(item,index) in sortlist" :key="index">
        <img v-lazy="item.child[0].pic">
      </li>
    </ul>
    <div class="ad">
      <img :src="ad"/>
    </div>
    <ul class="activity">
      <router-link to="/mine" tag="li" v-for="(item,index) in activity" :key="index">
        <img :src="item.child[0].pic"/>
      </router-link>
    </ul>
    <div id="abc">
      <GoodsList :goodsList="goodslist" :update="adtime"></GoodsList>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue/dist/vue'
  import axios from 'axios'
  import 'mint-ui/lib/style.css'
  import GoodsList from '../components/GoodsList.vue'
  import { Swipe, SwipeItem,Lazyload } from 'mint-ui'
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.use(Lazyload)
  export default({
    data(){
      return{
        balist: [],
        sortlist: [],
        activity: [],
        adtime:'',
        goodslist: [],
        ad: ''
      }
    },
    components: {
      GoodsList
    },
    mounted(){
      axios.get('/vip/shoesba.php')
        .then((res)=>{
          this.balist = res.data.data.block[0].multi_block[0].data.child
          this.sortlist = res.data.data.block[0].multi_block[1].data.concat(res.data.data.block[0].multi_block[2].data)
          this.ad = res.data.data.block[0].multi_block[3].data[0].child[0].pic
          this.activity = res.data.data.block[0].multi_block[4].data.concat(res.data.data.block[0].multi_block[5].data)
          this.adtime = res.data.data.block[0].multi_block[6].data[0].child[0].pic
        }),
      axios.get('./vip/shoesgoods.php')
        .then((res)=>{
          this.goodslist = res.data.data.goods
        })
    }
  })
</script>

<style media="screen" lang="scss">
  @import "../../styles/yo/usage/core/reset.scss";
  .shoes{
    width: 100%;
    .banner{
      width: 100%;
      height: 1.46rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .sort{
      width: 100%;
      height: auto;
      @include flexbox();
      @include flex-direction(row);
      flex-wrap: wrap;
      li{
        float: left;
        width: 25%
      }
      img{
        width: 100%;
      }
    }
    .ad{
      width: 100%;
      height: 1.08rem;
      @include border(8px 0 0 0,#f4f4f8)
      img{
        width: 100%;
        height: 100%;
      }
    }
    .activity{
      @include border(20px 0 0 0,#f4f4f8);
      @include flexbox();
      flex-wrap: wrap;
      li{
        width: 50%;
        img{
          width: 100%;
        }
      }
      li:nth-child(1){
        @include border(0 1px 1px 0,#ebebeb);
      }
      li:nth-child(2){
        @include border(0 0 1px 0,#ebebeb);
      }
      li:nth-child(3){
        @include border(0 1px 0 0,#ebebeb);
      }
    }
  }
</style>
