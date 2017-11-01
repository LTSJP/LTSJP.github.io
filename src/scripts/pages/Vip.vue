<template lang="html">
    <div class="common-con">
        <!-- 头部 -->
        <header>
            <span>VIP专享</span>
        </header>
        <!-- <div class="scroll-con"> -->
            <!--banner-->
    		<div class="banner">
    			<mt-swipe :auto="4000">
    			  <mt-swipe-item v-for="item in bannerList">
                    <img :src="item.pic"/>
    			  </mt-swipe-item>
    			</mt-swipe>
    		</div>
            <!--分类列表-->
            <div class="commodity-type">
                <div class="typelist" v-for="item in dataListTop">
                    <a href="javascript:;">
                        <img :src="item.child[0].pic" />
                    </a>
                </div>
                <div class="typelist" v-for="item in dataListBottom">
                    <a href="javascript:;">
                        <img :src="item.child[0].pic" />
                    </a>
                </div>
            </div>
            <!--商品列表-->
            <div class="shoplist">
                <div class="shoplist-title">
                    <!-- <img :src="item.child[0].pic" /> -->
                    — <span>热门专享</span> —
                </div>
                <div class="shoplist-con">
                    <dl v-for="item in shopListCon" :class="{alignLeft:item.goods_id}">
                        <dt><img :src="item.pic_url" /></dt>
                        <dd>
                          <p>{{item.title}}</p>
                          <span>¥{{item.cprice}}<i>去购买 ></i></span>
                        </dd>
                    </dl>
                </div>
            </div>
        <!-- </div> -->

    </div>
</template>
<script type="text/javascript">
    import Vue from 'vue';
    import axios from 'axios';
    import {Swipe, SwipeItem, Lazyload, Loadmore, InfiniteScroll} from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    Vue.use(Lazyload);
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    export default{
        data(){
            return {
                bannerList:[],
                dataListTop: [],
                dataListBottom: [],
                shopListCon: []
            }
        },
        mounted(){
        	this.$store.commit('changeIndex',2)
            axios.get('/vip/beautytop.php')
            .then((res) => {
                this.bannerList = res.data.data.block[0].multi_block[0].data.child;
                this.dataListTop = res.data.data.block[0].multi_block[1].data;
                this.dataListBottom = res.data.data.block[0].multi_block[2].data;

            }),
            axios.get('./vip/preferredbottom.php')
            .then((res) => {
                this.shopListCon = res.data.data.goods;
            })
        }
    }
</script>
<style lang="scss">
    @charset "UTF-8";
    @import "../../styles/yo/usage/core/reset.scss";
    .common-con{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        header{
            width: 100%;
            height: .4rem;
            text-align: center;
            line-height: .4rem;
            font-size: .15rem;
            background: #fff;
        }
        .banner{
           width: 100%;
           height: 1.24rem;
           img{
               width: 100%;
           }
       }
        .commodity-type{
            width: 100%;
            height: 2rem;
            background: #fff;
            @include flexbox();
            flex-wrap: wrap;
            .typelist{
                width: 25%;
                height: 1rem;
                img{
                    width: 100%;
                }
            }
        }
        .shoplist{
            width: 100%;
            overflow: hidden;
            .shoplist-title{
                width: 100%;
                height: .5rem;
                background: #f4f4f8;
                line-height: 0.5rem;
                text-align: center;
                img{
                    width: 100%;
                }
            }
            .shoplist-con{
                width: 100%;
                background: #f4f4f8;
                @include flexbox();
                @include flex-direction(column);
                dl{
                    width: 100%;
                    height: 2.2rem;
                    float: left;
                    text-align: center;
                    padding-top: .02rem;
                    position: relative;
                    background: #fff;
                    margin-bottom: .1rem;
                    &:nth-child(odd){
                        padding-right:.02rem;
                    };
                    &.alignLeft{
                        text-align: left;
                    }
                    dt{
                      width: 50%;
                      height: 1.6rem;
                      margin: 0 auto;
                      img{
                        width: 100%;
                      }
                    }
                    dd{
                      width: 100%;
                      padding-top: .11rem;
                      padding-left: .08rem;
                      padding-right: .09rem;
                      p{
                        height: .22rem;
                        line-height: .22rem;
                        font-size: 14px;
						color: #000;
                      }
                      span{
                        font-size: 14px;
                        color: #ff464e;
                        i{
                            float: right;
                            color: #fff;
                            display: inline-block;
                            padding: .02rem .1rem;
                            background: #eb5655;
                            border-radius: .02rem;
                        }
                      }
                    }
                }
            }
        }
    }
</style>
