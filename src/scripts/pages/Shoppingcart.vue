<template lang="html">
  <div class="shopcart">
    <header>
      <i class="yo-ico" @click="back">&#xe679;</i>
      <span>购物车</span>
      <span>{{headope}}</span>
    </header>
    <section>
      <div class="empty" v-if="!allprod.length>0">
        <img src="../../assets/images/empty-cart.png">
        <p>看到喜欢的就带回家吧</p>
        <router-link to="/" tag="p">
          去选购
        </router-link>
      </div>
      <div class="content" v-if="allprod.length>0">
        <dl v-for="(item,index) in allprod" :class="{check:ischecked&&has[index]===index}">
          <dt>
            <div>
              <i class="yo-ico" @click="select(index)">&#xe637;</i>
            </div>
            <div class="shop">
              <i class="yo-ico">&#xe676;</i>
              <span>{{item.shopname}}</span>
              <i class="yo-ico">&#xe6a3;</i>
            </div>
          </dt>
          <dd>
            <div :class="{check:ischecked}">
              <i class="yo-ico" @click="select(index)">&#xe637;</i>
            </div>
            <div class="buyimg">
              <img :src="item.pic" alt="">
            </div>
            <div class="det">
              <p class="name">{{item.name}}</p>
              <p class="color">{{item.color}}{{item.size}}</p>
              <p class="price">
                <span class="np">{{item.np}}</span>
                <span class="op">{{item.op}}</span>
              </p>
            </div>
            <div class="num">
               <button type="button" @click="dec(index)">-</button>
               <input type="text" v-model="item.buynum">
               <button type="button" @click="add(index)">+</button>
            </div>
          </dd>
        </dl>
      </div>
    </section>
    <footer v-if="allprod.length>0">
      <div class="check_box">
        <div :class="{check:isallchecked}">
          <i class="yo-ico"  @click="go_check">&#xe637;</i>
        </div>
        <span>全选</span>
      </div>
      <div class="go_pay">
        <span>结算</span>
        <span>({{allnum}})</span>
      </div>
      <div class="money">
        <span>合计</span>
        <span>￥{{allprice}}</span>
      </div>
    </footer>
  </div>
</template>

<script type="text/javascript">
  import Index from './index.vue'
  import store from '../../vuex/store'
  import { MessageBox } from 'mint-ui';
  export default({
    data(){
      return{
        headope:'编辑',
        ischecked: true,
        isallchecked: true,
        has: [],
        allprod: [],
        allprice: 0,
        allnum: 0
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      jisuan(){
        var self = this
        var suan = this.has.filter(function(item,index){
          return self.has[index] === index
        })
        this.allnum = 0
        suan.forEach(function(item,index){
          self.allnum += self.allprod[item].buynum
        })
      },
      dec(n){
        if(this.allprod[n].buynum>1){
          this.allprod[n].buynum = --this.allprod[n].buynum
        }else{
          this.allprod[n].buynum = 1
        }
        this.jisuan()
      },
      add(n){
        this.allprod[n].buynum = ++this.allprod[n].buynum
        this.jisuan()
      },
      select(i){
        this.ischecked = true
        if(this.has[i]===i){
          this.has.splice(i,1,-1)
        }else{
          this.has.splice(i,1,i)
        }
        this.jisuan()
      },
      go_check(){
        this.isallchecked = !this.isallchecked
        if(this.isallchecked){
          this.has=this.$store.state.judge
        }else{
          this.has=[]
          for(var i = 0;i<this.$store.state.judge.length;i++){
            this.has.push(-1)
          }

        }
        this.jisuan()
      }
    },
    watch: {
      has: function(){
        var self = this
        var is = this.has.every(function(item,index){
          return self.has[index]===index
        })
        if(is){
          this.isallchecked = true
          this.ischecked = true
        }else{
          this.isallchecked = false
        }
        this.jisuan()
      },
      allnum: function(){
        var self = this
        var suan = this.has.filter(function(item,index){
          return self.has[index] === index
        })
        self.allprice = 0
        suan.forEach(function(item,index){
          self.allprice += Number(self.allprod[item].np*self.allprod[item].buynum);
        })
        self.allprice = self.allprice.toFixed(2);
      }
    },
    mounted(){
      var self = this
      this.$store.commit('changeIndex',3)
      this.allprod = this.$store.state.prod
      this.has = this.$store.state.judge
      this.allprod.forEach(function(item,index){
        self.allprice += self.allprod[index].np*self.allprod[index].buynum
        self.allnum += self.allprod[index].buynum
      })
    }
  })
</script>

<style media="screen" lang="scss">
  @import "../../styles/yo/usage/core/reset.scss";
  .shopcart{
    background: #f4f4f8;
    @include flexbox();
    @include flex-direction(column);
    height: 100%;
    width: 100%;
    header{
      height: .48rem;
      background: white;
      padding: 0 .15rem;
      @include flexbox();
      @include justify-content(space-between);
      @include align-items(center);
      @include border(0 0 1px 0);
      font-size: .18rem;
      color: #4a4a4a;
    }
    section{
      @include flex();
      width: 100%;
      overflow-y: scroll;
      .empty{
        text-align: center;
        padding-top: .2rem;
        img{
          width: 1.8rem;
        }
        p{
          line-height: .3rem;
          font-size: .16rem;
          color: #333333;
          &:nth-last-child(1){
            color: #ed6a6b;
            padding: .1rem 0.3rem;
            width: 1.4rem;
            margin: .2rem auto 0;
            @include border(1px,#ed6a6b);
          }
        }
      }
      .content{
        dl{
          margin-bottom: .1rem;
          &.check{
            dt,dd{
              >div:nth-child(1){
                background: #eb5655;
                @include border(0);

              }
            }
          }
          dt{
            padding: 0 .15rem;
            background: white;
            @include flexbox();
            @include align-items(center);
            height: .44rem;
            @include border(0 0 1px 0);
            >div:nth-child(1){
              width: .18rem;
              height: .18rem;
              margin-right: .14rem;
              @include flexbox();
              @include justify-content(center);
              @include align-items(center);
              @include border(1px,#666666,solid,50%);
              i{
                color: white;
                font-size: .08rem;
                transform: scale(.5);
                font-weight: 900;
              }
            }
            .shop{
              @include flexbox();
              @include align-items(center);
              color: #6d6d6d;
              i{
                margin-top: -3px;
              }
              span{
                margin: 0 .06rem;
              }

            }
          }
          dd{
            background: white;
            @include flexbox();
            @include align-items(center);
            height: 1.18rem;
            padding: .14rem .15rem;
            >div:nth-child(1){
              width: .18rem;
              height: .18rem;
              margin-right: .14rem;
              @include flexbox();
              @include justify-content(center);
              @include align-items(center);
              @include border(1px,#666666,solid,50%);
              i{
                color: white;
                font-size: .08rem;
                transform: scale(.5);
                font-weight: 900;
              }

            }
            .buyimg{
              width: .9rem;
              height: .9rem;
              @include border(1px);
              img{
                width: 100%;
                height: 100%;
              }
            }
            .det{
              margin: 0 .12rem;
              width: 1.13rem;
              .name{
              	overflow: hidden;
              	white-space: nowrap;
              	text-overflow: ellipsis;
                font-size: .13rem;
                color: #333333;
                font-weight: 900;
              }
              .color{
                font-size: .11rem;
               	overflow: hidden;
              	white-space: nowrap;
              	text-overflow: ellipsis;
                color: #bbbbbb;
                margin-bottom: .32rem;
              }
              .price{
                .np{
                  color: #eb5655;
                  font-size: .16rem;
                }
                .op{
                  color: #d9d9d9;
                  font-size: .12rem;
                  text-decoration: line-through;
                }
              }
            }
            .num{
              width: .9rem;
              height: .24rem;
              @include flexbox();
              @include justify-content(center);
              @include align-items(center);
              @include border(1px 0,#ebebeb);
              margin-top: .65rem;
              button{
                width: .21rem;
                outline: none;
                border: none;
                background: white;
                @include border(0 1px,#ebebeb);
              }
              input{
                @include flex();
                text-align: center;
                border: none;
              }
            }
          }
        }
      }
    }
    footer{
      height: .48rem;
      background: white;
      padding-left: .15rem;
      .check_box{
        @include flexbox();
        @include align-items(center);
        float: left;
        height: 100%;
        width: .6rem;
        >div:nth-child(1){
          width: .18rem;
          height: .18rem;
          margin-right: .08rem;
          @include flexbox();
          @include justify-content(center);
          @include align-items(center);
          @include border(1px,#666666,solid,50%);
          i{
            color: white;
            font-size: .08rem;
            transform: scale(.5);
            font-weight: 900;
          }

          &.check{
            background: #eb5655;
            @include border(0,white,solid,50%);
          }
        }
      }
      .go_pay{
        float: right;
        width: 1.2rem;
        height: 100%;
        text-align: center;
        line-height: .48rem;
        background: #eb5655;
        color: white;
        font-size: .16rem;
      }
      .money{
        float: right;
        margin-right: .1rem;
        line-height: .48rem;
        color: #515151;
        span:nth-last-child(1){
          color: #eb5655;
        }
      }
    }
  }
</style>
