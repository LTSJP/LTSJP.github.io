<template lang="html">
  <div class="m-index">
    <!--<div>-->
    <router-view></router-view>
    <!--</div>-->
    <footer>
      <ul>
        <router-link to="/recommend" tag="li" :class="{active:this.$store.state.tabIndex===0}">
          <i class="yo-icon">&#xe6ce;</i>
          <b>今日推荐</b>
        </router-link>
        <router-link to="/optimization" tag="li" :class="{active:this.$store.state.tabIndex===1}">
          <i class="yo-icon">&#x344e;</i>
          <b>卷皮优选</b>
        </router-link>
        <router-link to="/vip" tag="li" :class="{active:this.$store.state.tabIndex===2}">
          <i class="yo-icon">&#xf0072;</i>
          <b>VIP专享</b>
        </router-link>
        <router-link to="/shoppingcart" tag="li" :class="{active:this.$store.state.tabIndex===3}">
          <i class="yo-icon">&#xf01d1;</i>
          <b>购物车</b>
        </router-link>
        <router-link to="/mine" tag="li" :class="{active:this.$store.state.tabIndex===4}">
          <i class="yo-icon">&#xe6bc;</i>
          <b>我的卷皮</b>
        </router-link>
      </ul>

    </footer>
  </div>
</template>


<script>
  import '@/assets/iconfont/iconfont.ttf'
  import '@/assets/iconfont/iconfont.woff'
  export default({
    data(){
      return{
        isActive: true
      }
    },
    components: {

    },
    mounted(){
    	
    }
  })
</script>
