<template lang="html">
  <div class="men">
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
        adtime:'',
        goodslist: [],
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
  .men{
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
      flex-wrap: wrap;
      li{
        float: left;
        width: 25%
      }
      img{
        width: 100%;
      }
    }

  }
</style>
