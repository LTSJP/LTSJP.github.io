<template lang="html">
  <div class="ornament">
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
        activity: [],
        adtime:'',
        goodslist: [],
      }
    },
    components: {
      GoodsList
    },
    mounted(){
      axios.get('/vip/ornamentba.php')
        .then((res)=>{
          this.activity = res.data.data.block[0].multi_block[0].data.concat(res.data.data.block[0].multi_block[1].data)
          this.adtime = res.data.data.block[0].multi_block[2].data[0].child[0].pic
        }),
      axios.get('./vip/ornamentgoods.php')
        .then((res)=>{
          this.goodslist = res.data.data.goods
        })
    }
  })
</script>

<style media="screen" lang="scss">
  @import "../../styles/yo/usage/core/reset.scss";
  .ornament{
    width: 100%;
    .activity{
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
