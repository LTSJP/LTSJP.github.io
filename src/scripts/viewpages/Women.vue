<template lang="html">
	<div >
  <div class="women" v-if="!isShowLoading">
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
    <div class="activity">
      <div class="activityleft">
        <img v-lazy="activityleft" />
      </div>
      <div class="activityright">
        <div v-for="(item,index) in activityright" :key="index">
          <img v-lazy="item.pic"   />
        </div>
      </div>
    </div>
    <div id="abc">
      <GoodsList :goodsList="goodslist" :update="ad" ></GoodsList>
    </div>
  </div>
  <div class="yo-loading yo-loading-a" v-if="isShowLoading">
    <i class="yo-ico"></i>
    <div class="text">加载中...</div>
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
        activityleft: '',
        activityright: [],
        ad:'',
        goodslist: [],
        isShowLoading:true
      }
    },
    components: {
      GoodsList
    },
    mounted(){
      axios.get('/vip/wowenba.php')
        .then((res)=>{
          this.balist = res.data.data.block[0].multi_block[0].data.child
          this.sortlist = res.data.data.block[0].multi_block[1].data.concat(res.data.data.block[0].multi_block[2].data)
          this.activityleft = res.data.data.block[0].multi_block[3].data[0].child[0].pic
          this.activityright = res.data.data.block[0].multi_block[3].data[1].child
          this.ad = res.data.data.block[0].multi_block[4].data[0].child[0].pic
          this.isShowLoading = false
          //        console.log(this.ad);
          // console.log(res.data.data.block[0].multi_block[4].data[0].child[0].pic);
        }),
      axios.get('./vip/womengoods.php')
        .then((res)=>{
          this.goodslist = res.data.data.goods
          // console.log(res.data.data.goods)
        });
        
    }
  })
</script>

<style media="screen" lang="scss">
  @import "../../styles/yo/usage/core/reset.scss";
  @import "../../styles/yo/usage/component/loading.scss";
  .women{
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
        width: 25%
      }
      img{
        width: 100%;
      }
    }
    .activity{
      @include border(10px 0 0 0,#f4f4f8);
      @include flexbox();
      .activityleft{
        @include flex();
        @include border(0 1px 0 0,#ebebeb);
        img{
          width: 100%;
        }
      }
      .activityright{
        @include flex();
        @include flexbox();
        @include flex-direction(column);
        div{
          @include flex();
          width: 100%;
          img{
            width: 100%;
          }
        }
        div:nth-last-child(1){
          @include border(1px 0 0 0,#ebebeb);
        }
      }
    }
  }
</style>
