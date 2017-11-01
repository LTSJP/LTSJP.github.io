<template lang="html">
    <div class="common-con">
        <!--banner-->
		<div class="banner">
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="item in bannerList">
			  	<!-- <router-link to="/adpage" tag="img" :src="val.pic"/></router-link> -->
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
        <!-- 广告 -->
        <div class="advertisement" v-for="item in advertisement">
            <img :src="item.pic" alt="">
        </div>
        <!-- 推荐 -->
        <div class="recommend">
            <div class="leftlist" v-for="item in recommend1">
                <img :src="item.pic" alt="">
            </div>
            <div class="rightlist">
                <div v-for="item in recommend2">
                    <img :src="item.pic" alt="">
                </div>
            </div>
        </div>
        <!--商品列表-->
        <div class="shoplist">
            <div class="shoplist-title" v-for="item in shopListTit">
                <img :src="item.child[0].pic" />
            </div>
            <div class="shoplist-con">
                <dl v-for="item in shopListCon" :class="{alignLeft:item.goods_id}">
                    <dt><img :src="item.pic_url" /></dt>
                    <dd>
                      <p>{{item.coupon_tips}}</p>
                      <span>{{item.title}}<i>{{item.time_left}}</i></span>
                    </dd>
                    <div class="small-img">
                        <img :src="item.logo_url" alt="">
                    </div>
                </dl>
            </div>
        </div>
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
                advertisement: [],
                recommend1: [],
                recommend2: [],
                shopListTit: [],
                shopListCon: []
            }
        },
        mounted(){
            axios.get('/vip/mantop.php')
            .then((res) => {
                // console.log(res.data.data.block[0].multi_block[0].data);
                this.bannerList = res.data.data.block[0].multi_block[0].data.child;
                this.dataListTop = res.data.data.block[0].multi_block[1].data;
                this.dataListBottom = res.data.data.block[0].multi_block[2].data;
                this.advertisement = res.data.data.block[0].multi_block[3].data[0].child;
                this.recommend1 = res.data.data.block[0].multi_block[4].data[0].child;
                this.recommend2 = res.data.data.block[0].multi_block[4].data[1].child;
                this.shopListTit = res.data.data.block[0].multi_block[5].data;
            }),
            axios.get('./vip/manbottom.php')
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
        .banner{
           width: 100%;
           height: 1.46rem;
           img{
               width: 100%;

           }
       }
        .commodity-type{
            width: 100%;
            height: 2rem;
            background: #fff;
            margin-bottom: 0.1rem;
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
        .advertisement{
            width: 100%;
            height: 1.24rem;
            img{
                width: 100%;
            }
        }
        .recommend{
            width: 100%;
            height: 2.29rem;
            margin-bottom: 0.1rem;
            @include flexbox();
            @include flex-direction();
            div{
                @include flex();
                &:nth-child(odd){
                    padding-right: .005rem;
                }
                img{
                    width: 100%;
                }
            }
            .rightlist{
                div{
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
                line-height: 0.5rem;
                img{
                    width: 100%;
                }
            }
            .shoplist-con{
                width: 100%;
                background: #f4f4f8;
                dl{
                    width: 50%;
                    height: 2.44rem;
                    float: left;
                    text-align: center;
                    padding-top: .02rem;
                    position: relative;
                    &:nth-child(odd){
                        padding-right:.02rem;
                    };
                    &.alignLeft{
                        text-align: left;
                    }
                    dt{
                      width: 100%;
                      height: 1.86rem;
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
                        font-size: 12px;
                        color: #ff464e;
                      }
                      span{
                        font-size: 11px;
                        i{
                            float: right;
                            color: #bbb;
                        }
                      }
                    }
                    .small-img{
                        position: absolute;
                        right: 0.08rem;
                        bottom: .45rem;
                        width: .5rem;
                        height: .25rem;
                        img{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
