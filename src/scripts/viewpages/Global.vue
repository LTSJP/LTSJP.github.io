<template lang="html">
  <div class="global">
    <ul class="activity">
      <router-link to="/mine" tag="li" v-for="(item,index) in activity" :key="index">
        <img v-lazy="item.child[0].pic"/>
      </router-link>
    </ul>
    <div class="listtitle">
			<router-link to="/mine" tag="img" :src="adtime"></router-link>
		</div>
    <div class="goodsMessage" v-for="(item,index) in goodslist" :key="index">
      <router-link to="/mine" tag="div" class="shop">
        <div class="shopLogo">
          <img v-lazy="item.logo_url" />
        </div>
        <div class="shopMessage">
          <h3>{{item.coupon_tips}}</h3>
          <p>
            <img v-lazy="item.logo">
            <span>{{item.title}}</span>
          </p>
        </div>
        <div class="more">
          <span>{{item.mkt_info}}</span>
          <i class="yo-ico">&#xe6a3;</i>
        </div>
      </router-link>
      <div class="goods">
        <router-link to="/mine" tag="dl">
          <dt class="pic">
            <img v-lazy="item.sub_data[0].pic"/>
          </dt>
          <dd>
            <p class="price">
              <span>{{item.sub_data[0].cp}}</span>
              <del>{{item.sub_data[0].op}}</del>
            </p>
            <p class="goodsname">
              {{item.sub_data[0].title}}
            </p>
          </dd>
        </router-link>
        <router-link to="/mine" tag="dl">
          <dt class="pic">
            <img v-lazy="item.sub_data[1].pic"/>
          </dt>
          <dd>
            <p class="price">
              <span>{{item.sub_data[1].cp}}</span>
              <del>{{item.sub_data[1].op}}</del>
            </p>
            <p class="goodsname">
              {{item.sub_data[1].title}}
            </p>
          </dd>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue/dist/vue'
  import axios from 'axios'
  import 'mint-ui/lib/style.css'
  import GoodsList from '../components/GoodsList.vue'
  import { Lazyload } from 'mint-ui'
  Vue.use(Lazyload)
  export default({
    data(){
      return{
        activity: [],
        adtime:'',
        goodslist: []
      }
    },
    mounted(){
      axios.get('/vip/globalba.php')
        .then((res)=>{
          this.activity = res.data.data.block[0].multi_block[0].data.concat(res.data.data.block[0].multi_block[1].data)
          this.adtime = res.data.data.block[0].multi_block[2].data[0].child[0].pic
        }),
      axios.get('./vip/globalgoods.php')
        .then((res)=>{
          this.goodslist = res.data.data.goods
        })
    }
  })
</script>

<style media="screen" lang="scss">
  @import "../../styles/yo/usage/core/reset.scss";
  .global{
    width: 100%;
    background:#fff;
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
    .listtitle{
        width: 100%;
        @include border(10px 0 0 0,#ebebeb);
        img{
            width: 100%;
        }
    }
    .goodsMessage{
      padding: .1rem .12rem 0;
      @include border(0 0 10px 0,#f4f4f8);
      .shop{
        @include flexbox();
        .shopLogo{
          width: .36rem;
          height: .36rem;
          @include border(1px,#e7e7e7);
          img{
            width: 100%;
            height: 100%;
          }
        }
        .shopMessage{
          margin-left: .1rem;
          @include flex();
          h3{
            font-size: .13rem;
            font-weight: 900;
            color: #464646;
          }
          p{
            img{
              width:.15rem;
              height: .1rem;
            }
            span{
              color: #999999;
              font-size: .1rem;
            }
          }
        }
        .more{
          color: #999999;
          font-size: .13rem;
          width: .98rem;
          @include flexbox();
          @include align-items(center);
          span{
            white-space: nowrap;
          }
          i{
            margin-top: -4px;
          }
        }
      }
      .goods{
        @include flexbox();
        padding: .1rem 0;
        dl{
          @include flex();
          height: 2.22rem;
          dt{
            width: 100%;
            img{
              width: 100%;
            }
          }
          dd{
            .price{
              span{
                color: #5d0ee5;
                font-size: .14rem;
                font-weight: 600;
              }
              del{
                text-decoration:line-through;
                color: #bbbbbb;
                font-size: .1rem;
              }
            }
            .goodsname{
              color: #606060;
              font-size: .12rem;
            }
          }
        }
        dl:nth-last-child(1){
          @include border(0 0 0 1px,#ebebeb);
          dd{
            margin-left: .12rem;
          }
        }
      }
    }
    .goodsMessage:nth-last-child(1){
      @include border(0);
    }
  }
</style>
