<template lang="html">
  <div class="detail" >
    <header :class="{hasbg:show}" id="detail_header">
      <div class="back" @click="goback">
        <i class="yo-ico">&#xe679;</i>
      </div>
      <transition name="fade">
        <ul class="headertab" v-if="show">
          <li :class="{in:hedeindex === 0}">商品</li>
          <li :class="{in:hedeindex === 1}">详情</li>
        </ul>
      </transition>
      <div class="more">
        <i class="yo-ico">&#xe7e4;</i>
      </div>
    </header>
    <section v-handle="fadein">
      <div class="goodsinfo">
        <mt-swipe :auto="0" class="pic" >
          <mt-swipe-item v-for="(item,index) in goodspic" :key="index">
            <img v-lazy="item">
            <span>{{index}}</span>
          </mt-swipe-item>
        </mt-swipe>
        <div class="info">
          <div class="info-top">
            <span class="newprice">￥{{data.tuan_price||data.cprice}}</span>
            <del class="oldprice">{{data.oprice}}</del>
            <i class="yo-ico">&#xe652;</i>
          </div>
          <div class="info-center">
            {{data.title}}
          </div>
          <div class="info-bottom">
            <span>
              <i class="yo-ico">&#xe671;</i>
              <i>{{data.baoyou_tips}}</i>
            </span>
            <span>
              <i class="yo-ico">&#xe78b;</i>
              <i>{{headdata.join_number}}</i>
            </span>
            <span>
              <i class="yo-ico">&#xe651;</i>
              <i>{{data.shipping_origin}}</i>
            </span>
          </div>
        </div>
        <ul class="welfare">
          <li class="sale"  @click="isshow">
            <span>{{sale1}}</span>
            <b>{{saleonedata.content || ''}}</b>
            <i class="yo-ico">&#xe7e4;</i>
          </li>
            <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom" class="saleinfo">
              <header>
                <span>促销</span>
                <i class="yo-ico" @click="isshow">&#xe646;</i>
              </header>
              <div class="saletitle">
                <span>{{sale1}}</span>
                <b>{{saleonedata.content || ''}}</b>
              </div>
              <div class="coupons">
                <dl v-for="(item,index) in saleonedata.info">
                  <dt>￥{{item.money}}</dt>
                  <dd>
                    <p>{{item.conditions}}</p>
                    <p>{{item.expire_time}}</p>
                  </dd>
                </dl>
              </div>
            </mt-popup>
          <li class="openvip">
            <span>{{sale2}}</span>
            <b>{{saledata.vip_info.content || ''}}</b>
            <i class="yo-ico">&#xe6a3;</i>
          </li>
          <li class="service"  @click="servershow">
            <div class="ser-left">
              <div v-for="(item,value) in data.service_promise.show_content" v-if="data.service_promise">
                <img :src="item.icon_url">
                <span>{{item.content || ''}}</span>
              </div>
            </div>
            <div class="ser-right">
              <i class="yo-ico">&#xe7e4;</i>
            </div>
          </li>
            <mt-popup v-model="popupVisible1" popup-transition="popup-fade" position="bottom" class="serverinfo">
              <header>
                <span>服务承诺</span>
                <i class="yo-ico" @click="servershow">&#xe646;</i>
              </header>
              <div class="coupons">
                <dl v-for="(item,index) in data.service_promise.show_content">
                  <dt>
                    <img :src="item.icon_url">
                    <span>{{item.content}}</span>
                  </dt>
                  <dd>
                    {{item.description}}
                  </dd>
                </dl>
              </div>
              <div class="know" @click="servershow">
                知道了
              </div>
            </mt-popup>
        </ul>
      </div>
      <div class="choose"  @click="go_choose">
        <span>{{pl_choose}}</span>
        <i class="yo-ico">&#xe6a3;</i>
          </div>
        <mt-popup v-model="popupVisible2" popup-transition="popup-fade" position="bottom" class="choosecontent">
          <header>
            <img :src="chooseinfo.info.goods_pic_url">
            <div>
              <p>￥{{chooseinfo.info.cprice}}</p>
              <p >{{pl_choose}}</p>
            </div>
            <i class="yo-ico" @click="go_choose">&#xe646;</i>
          </header>
          <div class="coupons">
            <dl>
              <dt>{{chooseinfo.info.zav_name}}</dt>
              <dd>
                <span v-for="(item,index) in colorinfo" @click="choosecolor(item,index)" :class="{colorelect:colnum===index&&colele}">{{item}}</span>
              </dd>
            </dl>
            <dl v-if="sizeinfo.length>0">
              <dt>{{chooseinfo.info.fav_name}}</dt>
              <dd>
                <span v-for="(item,index) in sizeinfo" @click="choosesize(item,index)" :class="{sizeelect:sizenum===index&&sizeele}">{{item}}</span>
              </dd>
            </dl>
            <div>
              <span>购买数量</span>
              <div class="elenum">
                 <button type="button" @click="dec">-</button>
                 <input type="text" v-model="buynum">
                 <button type="button" @click="add">+</button>
              </div>
            </div>
          </div>
          <div class="sure" @click="go_choose">
            确定
          </div>
        </mt-popup>
      <div class="detail_box">
        <ul>
          <li @click="toggle(0)" :class="{selected:tabnum===0}">图文详情</li>
          <li @click="toggle(1)" :class="{selected:tabnum===1}">商品参数</li>
          <li @click="toggle(2)" :class="{selected:tabnum===2}">咨询与售后</li>
        </ul>
        <div class="img_text" v-if="tabnum===0">
          <img v-for="(item,index) in data.goods_content.gd_content" :src="item">
        </div>
        <div class="attribute" v-if="tabnum===1">
          <dl v-for="(item,index) in data.goods_content.attribute">
            <dt>{{item.st_key}}</dt>
            <dd>{{item.st_value}}</dd>
          </dl>
        </div>
        <div class="af_sale" v-if="tabnum===2">
          <dl v-for="(item,index) in data.goods_content.rule_infos">
            <dt>{{item.ri_title}}</dt>
            <dd>{{item.ri_content}}</dd>
          </dl>
        </div>
      </div>
    </section>
    <footer>
      <ul>
        <li class="cus_ser">
          <i class="yo-ico">&#xe678;</i>
          <span>客服</span>
        </li>
        <router-link class="shop_cart" tag="li" to="/shoppingcart">
          <i class="yo-ico">&#xe63f;</i>
          <span>购物车</span>
        </router-link>
        <li class="buy_now">
          <span></span>
          <span>立即购买</span>
        </li>
        <li class="add_to_cart" @click="addToCart">加入购物车</li>
      </ul>
    </footer>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import axios from 'axios'
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Swipe, SwipeItem,Lazyload,Popup   } from 'mint-ui'
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(Popup.name, Popup)
  Vue.use(Lazyload)

  Vue.directive('handle', {
    bind: function (el, binding) {
      el.addEventListener('scroll', function () {
        var func = binding.value;
        if (el.scrollTop >= 200) {
          func().fadeIn()
          if(el.scrollTop >= 600){
            func().intwo()
          }else{
            func().inone()
          }
        }else{
          func().fadeOut()
        }
      })
    }
  })
  export default({
    data(){
      return{
        show:false,
        hedeindex:0,
        goodspic:[],
        data:{},
        headdata:{},
        saledata:{},
        saleonedata:{},
        sale1:'',
        sale2:'',
        popupVisible:false,
        popupVisible1:false,
        popupVisible2:false,
        pl_choose: '请选择:颜色 、 尺码',
        chooseinfo:{},
        colorinfo:[],
        sizeinfo:[],
        colnum:0,
        colele:false,
        sizenum:0,
        sizeele:false,
        color:'',
        size:'',
        buynum:1,
        tabnum:0,
        addprod: {}
      }
    },
    methods: {
      goback(){
        this.$router.go(-1)
      },
      addToCart(){
        this.addprod={
          shopname: this.data.schedule_info.brand_title,
          pic: this.chooseinfo.info.goods_pic_url,
          name: this.data.title,
          color: this.color,
          size: this.size,
          np: this.data.tuan_price||this.data.cprice,
          op: this.data.oprice,
          buynum: this.buynum
        }
        this.$store.commit('addtocart',this.addprod)
        this.$store.commit('chandeJudge',this.$store.state.prod)
        console.log(this.$store.state.prod);
        console.log(this.$store.state.judge);
        Toast({
				  message: '添加成功',
				  iconClass: 'icon icon-success'
				});
      },
      isshow(){
        this.popupVisible = !this.popupVisible
      },
      servershow(){
        this.popupVisible1 = !this.popupVisible1
      },
      go_choose(){
        this.popupVisible2 = !this.popupVisible2
      },
      fadein(){
        var self = this
        return{
          fadeIn: function(){
            self.show = true

          },
          fadeOut: function(){
            self.show = false
          },
          inone: function(){
            self.hedeindex = 0
          },
          intwo: function(){
            self.hedeindex = 1
          }
        }
      },
      choosecolor(item,index){
        if(this.colnum === index){
          this.colele = !this.colele
        }else{
          this.colnum = index
          this.colele = true
        }
        if(this.colele){
          this.color = item
          if(this.sizeele){
            this.pl_choose = `已选择: ${this.color} ${this.size}`
          }else{
            this.pl_choose = `已选择: ${this.color}`
          }
        }else if(this.sizeele){
          this.pl_choose = `已选择: ${this.size}`
        }else{
          this.pl_choose = `请选择:颜色 、 尺码`
        }
      },
      choosesize(item,index){
        if(this.sizenum === index){
          this.sizeele = !this.sizeele
        }else{
          this.sizenum = index
          this.sizeele = true
        }
        if(this.sizeele){
          this.size = item
          if(this.colele){
            this.pl_choose = `已选择: ${this.color} ${this.size}`
          }else{
            this.pl_choose = `已选择: ${this.size}`
          }
        }else if(this.colele){
          this.pl_choose = `已选择: ${this.color}`
        }else{
          this.pl_choose = `请选择: 颜色 、 尺码`
        }
      },
      dec(){
        if(this.buynum>1){
          this.buynum = --this.buynum
        }else{
          this.buynum = 1
        }
      },
      add(){
        this.buynum = ++this.buynum
      },
      toggle(index){
        this.tabnum = index
      }
    },
    mounted(){
      axios.get(`/jp/detail?app_version=4.6.0&goods_id=${this.$route.params.id}&goods_utype=C3&platform=Android&pt_page=1&user_label=C3&vcartid=%7B%22cart_id%22%3A%226653471%22%2C%22status%22%3A0%2C%22end_time%22%3A0%2C%22card_type%22%3A%220%22%7D`)
      .then((res)=>{
        this.saledata = res.data.data
        this.saleonedata = res.data.data.coupon[0]
        this.sale1 = this.saleonedata.icon.text
        this.sale2 = this.saledata.vip_info.icon_new.text
      })
      axios.get(`/apj/ptgoods/sku?app_version=4.6.0&djyhxx=djyhxx_123_406_1&goods_id=${this.$route.params.id}&info=&item_id=&pg_id=&platform=Android&single_pop=0`)
        .then((res)=>{
          this.headdata = res.data.data.info
          this.chooseinfo = res.data.data
          for(var i = 0;i<this.chooseinfo.sku.length;i++){
            this.colorinfo.push(this.chooseinfo.sku[i].av_fvalue)
            this.sizeinfo.push(this.chooseinfo.sku[i].av_zvalue)
          }
          this.colorinfo = Array.from(new Set(this.colorinfo)).filter(function(item){
            return item!==''
          })
          this.sizeinfo = Array.from(new Set(this.sizeinfo)).filter(function(item){
            return item!==''
          })
        })
        axios.get(`/apj/ptgoods/detail?app_version=4.6.0&cbtdfk=&djyhxx=djyhxx_123_406_1&goods_id=${this.$route.params.id}&info=&item_id=&pg_id=&platform=Android&sxzcrk=`)
          .then((res)=>{
            // console.log(res.data.data)
            this.data = res.data.data.info
            this.goodspic = res.data.data.info.images
            console.log(res);
          })
        this.$nextTick(function () {
          window.addEventListener('scroll', this.handleScroll)
        })
    }
  })
</script>

<style media="screen" lang="scss">
  @import "../../styles/yo/usage/core/reset.scss";
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .detail{
    @include flexbox();
    @include flex-direction(column);
    width: 100%;
    height: 100%;
    #detail_header{
      position: fixed;
      top: 0;
      z-index: 9999;
      padding: 0 .1rem;
      width: 100%;
      height: .48rem;
      @include flexbox();
      @include align-items(center);
      @include justify-content(space-between);
      &.hasbg{
        background: white;
        .back,.more{
          background: none;
          color: #8c8c8c;
        }
      }
      .back{
        width: 30px;
        height: 30px;
        background: rgba(0, 0, 0, .2);
        text-align: center;
        color: white;
        border-radius: 50%;
        padding-top: 3px;
      }
      ul{
        height: 100%;
        li{
          float: left;
          margin: 0 .2rem;
          padding: 0 .05rem;
          height: 100%;
          line-height: .48rem;
          &.in{
            color: #eb5655;
            @include border(0 0 4px 0,#eb5655);
          }
        }
      }
      .more{
        width: 30px;
        height: 30px;
        background: rgba(0, 0, 0, .2);
        text-align: center;
        color: white;
        border-radius: 50%;
        padding-top: 3px;
      }
    }
    section{
      @include flex()
      width: 100%;
      overflow-y: scroll;
      .goodsinfo{
      .pic{
        height: 3.75rem;
        img{
          width: 100%;
        }
      }
      .info{
        width: 100%;
        padding: 0 .16rem;
        height: 1.13rem;
        @include border(0 0 20px 0,#f4f4f8);
        .info-top{
          width: 100%;
          height: .2rem;
          line-height: .2rem;
          margin-top: .2rem;
          span,del{
            float: left;
          }
          span{
            font-size: .2rem;
            color: #eb5655;
            font-weight: 700;
          }
          del{
            font-size: .12rem;
            color: #999999;
            text-decoration: line-through;
            margin: .02rem 0 0 .05rem;
          }
          i{
            float: right;
            color: #666666;
            font-size: .2rem;
            font-weight: 900;
          }
        }
        .info-center{
          font-size: .15rem;
          color: #333333;
          text-align: left;
          height: .16rem;
          line-height: .16rem;
          margin: .13rem 0;
        }
        .info-bottom{
          @include flexbox();
          @include justify-content(space-between);
          @include align-items(center);
          color: #999999;
          span{
            @include flexbox();
            @include align-items(center);
            i:nth-child(1){
              margin: -3px 3px 0 0;
            }
          }
        }
      }
      .welfare{
        padding: 0 .14rem;
        li{
          height: .48rem;
          @include flexbox();
          @include justify-content(space-between);
          @include align-items(center);
          @include border(1px 0 0 0,#ebebeb);
          font-size: .1rem;
          >span{
            width: .3rem;
            height: .2rem;
            text-align: center;
            line-height: .2rem;
            background: #eb5655;
            color: white;
            margin-right: .1rem;
          }
          b{
            font-weight: 100;
            @include flex();
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &.service{
            .ser-left{
              @include flexbox();
              img{
                width: .04rem;
                height: .04rem;
              }
              >div{
                margin-right: .15rem;
              }
            }
          }
        }
          .mint-popup{
            width: 100%;
            header{
              padding: 0 .14rem;
              height: .48rem;
              line-height: .48rem;
              font-size: .18rem;
              font-weight: 100;
              @include border(0 0 1px 0);
              span{
                margin-left: 48%;
              }
              i{
                float: right;
              }
            }
          }
          .saleinfo{
            .saletitle{
              padding: 0 .14rem;
              @include flexbox();
              height: .36rem;
              @include justify-content(space-between);
              @include align-items(center);
              span{
                width: .3rem;
                height: .2rem;
                text-align: center;
                line-height: .2rem;
                background: #eb5655;
                color: white;
                margin-right: .12rem;
              }
              b{
                font-weight: 100;
                @include flex();
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .coupons{
              padding: 0 .45rem;
              @include border(0 0 1px 0);
              dl{
                @include flexbox();
                @include border(0 0 1px 0);
                @include align-items(center);
                height: .6rem;
                padding-left: .2rem;
                dt{
                  font-size: .25rem;
                  color: #ff464e;
                  width: .5rem;
                }
                dd{
                  margin-left: .2rem;
                  line-height: .25rem;
                  p:nth-child(2){
                    color: #999999;
                  }
                }
                &:nth-last-child(1){
                  @include border(0);
                }
              }
            }
          }
          .serverinfo{
            header span{
              margin-left: 42%;
            }
            .coupons{
              padding-left: .17rem;
              dl{
                padding: .15rem 0.4rem .15rem 0;
                @include border(0 0 1px 0);
                font-size: .1rem;
                dt{
                  margin-bottom: .1rem;
                  font-size: .13rem;
                  img{
                    width: .04rem;
                    height: .04rem;
                  }
                }
                dd{
                  color: #999999;
                  padding-left: .18rem;
                }
                &:nth-last-child(1){
                  @include border(0);
                }
              }
            }
            .know{
              width: 100%;
              height: .48rem;
              background: #eb5655;
              color: white;
              text-align: center;
              line-height: .48rem;
            }
          }
      }
      }
      .choose{
        padding: 0 .15rem;
        height: .68rem;
        @include border(20px 0,#f4f4f8);
        @include flexbox();
        @include align-items(center);
        @include justify-content(space-between);
      }
        .choosecontent{
          width: 100%;
          header{
            padding: 0 .15rem;
            height: .64rem;
            img{
              width: 1rem;
              height: 1rem;
              margin-top: -.36rem;
              float: left;
              @include border(1px,#ebebeb);
            }
            div{
              margin: .12rem 0 0 .12rem;
              float: left;
              width: 2rem;
              p:nth-child(1){
                color: #eb5655;
               	overflow: hidden;
              	white-space: nowrap;
              	text-overflow: ellipsis;
              }
              p:nth-child(2){
                font-size: .1rem;
              }
            }
            i{
              float: right;
              margin-top: .14rem;
              font-size: .2rem;
            }
          }
          .coupons{
            padding: 0 .15rem;
            dl{
              dt{
                margin: .24rem 0 .16rem;
              }
              dd{
                span{
                  display: inline-block;
                  padding: .1rem .32rem;
                  margin: 0 .12rem .12rem 0;
                  @include border(1px,black);
                  &.colorelect,&.sizeelect{
                    @include border(0);
                    background: #eb5655;
                    color: white;
                  }
                }
              }
            }
            >div{
              margin: .14rem 0 .3rem;
              height: .2rem;
              span{
                float: left;
              }
              div{
                float: right;
                width: .88rem;
                height: .24rem;
                @include flexbox();
                @include justify-content(center);
                @include align-items(center);
                @include border(1px 0,#ebebeb);
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
          .sure{
            width: 100%;
            height: .48rem;
            background: #eb5655;
            color: white;
            text-align: center;
            line-height: .48rem;
          }
        }
      .detail_box{
        padding: .1rem .1rem 0;
        ul{
          width: 100%;
          height: .3rem;
          @include flexbox();
          @include align-items(center);
          @include border(1px,#666666,solid,5px);
          li{
            @include flex();
            @include flexbox();
            @include align-items(center);
            @include justify-content(center);
            height: 100%;
            color: #666666;
            &:nth-child(1){
              border-top-left-radius:5px;
              border-bottom-left-radius:5px;
            }
            &:nth-child(2){
              @include border(0 1px,#666666);
            }
            &:nth-child(3){
              border-top-right-radius:5px;
              border-bottom-right-radius:5px;
            }
            &.selected{
              background: #666666;
              color: white;
            }
          }
        }
        .img_text{
          img{
            width: 100%;
          }
        }
        .attribute{
          margin-top: .28rem;
          dl{
            margin-bottom: .12rem;
            @include flexbox();
            dt{
              width: 1.5rem;
              padding-left: .05rem;
              color: #999999;
            }
            dd{
              color: #333333;
            }
            &:nth-child(3){
              dd{
                color: #ee7f31;
              }
            }
          }
        }
        .af_sale{
          margin-top: .28rem;
          dl{
            dt{
              margin-bottom: .1rem;

            }
            dd{
              margin-bottom: .16rem;
              color: #999999;
            }
          }
        }
      }
    }
    footer{
      height: .48rem;
      @include border(1px 0 0 0);
      ul{
        @include flexbox();
        @include align-items(center);
        height: 100%;
        li{
          @include flexbox();
          height: 100%;
          @include flex-direction(column);
          @include align-items(center);
          @include justify-content(center);
          &.cus_ser{
            width: .47rem;
            span{
              font-size: .1rem;
            }
          }
          &.shop_cart{
            width: .49rem;
            @include border(0 1px);
            span{
              font-size: .1rem;
            }
          }
          &.buy_now{
            width: 1.12rem;
          }
          &.add_to_cart{
            width:1.67rem;
            background: #eb5655;
            color: white;
          }
        }
      }
    }
  }
</style>
