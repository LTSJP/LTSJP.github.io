<template lang="html">
    <div class="box">
        <!-- 头部 -->
        <header>
            <span>商城</span>
        </header>
        <!-- 搜索 -->
        <div class="search">
            <a href="javascript:;">
                <img :src="item.pic" alt="" v-for="item in searchImg">
            </a>
        </div>
        <!-- banner -->
        <div class="banner">
            <img :src="item.pic" alt="" v-for="item in bannerList">
        </div>
        <!-- 商品分类 -->
        <div class="commodity-type">
            <div class="list-top">
                <p class="typelist" v-for="item in dataListTop">
                    <a href="javascript:;">
                        <img :src="item.child[0].pic" />
                    </a>
                </p>
            </div>
            <div class="list-bottom">
                <p class="typelist" v-for="item in dataListBottom">
                    <a href="javascript:;">
                        <img :src="item.child[0].pic" />
                    </a>
                </p>
            </div>
        </div>
        <!--商品列表-->
        <div class="shoplist">
            <div class="shoplist-title">
                — <span>精选好货</span> —
            </div>
            <div class="shoplist-con">
                <dl v-for="item in shopListCon" :class="{alignLeft:item.goods_id}">
                    <dt><img :src="item.pic_url" /></dt>
                    <dd>
                      <p class="discount">{{item.label_yxlist[0].text}}</p>
                      <span>{{item.title}}</span>
                      <p class="price">¥{{item.cprice}}</p>
                    </dd>
                    <!-- <div class="small-img">
                        <img :src="item.logo_url" alt="">
                    </div> -->
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
                searchImg:[],
                bannerList:[],
                dataListTop: [],
                dataListBottom: [],
                shopListCon: []
            }
        },
        mounted(){
            axios.get('/vip/preferredtop.php')
            .then((res) => {
                this.searchImg = res.data.data.block[0].multi_block[0].data[0].child;
                this.bannerList = res.data.data.block[0].multi_block[1].data[0].child;
                this.dataListTop = res.data.data.block[0].multi_block[2].data;
                this.dataListBottom = res.data.data.block[0].multi_block[3].data;
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
    .box{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        header{
            width: 100%;
            height: .4rem;
            @include border(0 0 1px 0);
            text-align: center;
            line-height: .4rem;
            font-size: .15rem;
            color: #e66b00;
            background: #fff;
            span{
                @include border(0 0 1px 0);
                width: .37rem;
                height: 100%;
                display: inline-block;
                border-bottom: 1px solid #e66b00;
            }
        }
        .search{
            width: 100%;
            height: .4rem;
            img{
                width: 100%;
            }
        }
        .banner{
            width: 100%;
            height: 1.19rem;
            img{
                width: 100%;
            }
        }
        .commodity-type{
            width: 100%;
            height: 1.9rem;
            background: #fff;
            margin-bottom: 0.1rem;
            @include flexbox();
            @include flex-direction(column);
            flex-wrap: wrap;
            background: pink;
            div{
                @include flex();
            }
            .list-top{
                width: 100%;
                @include flexbox();
                img{
                    width: 100%;
                }
            }
            .list-bottom{
                width: 100%;
                @include flexbox();
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
                line-height: 0.5rem;
                background: #fff;
                text-align: center;
            }
            .shoplist-con{
                width: 100%;
                background: #f4f4f8;
                dl{
                    width: 50%;
                    height: 2.28rem;
                    float: left;
                    text-align: center;
                    padding-top: .01rem;
                    position: relative;
                    &:nth-child(odd){
                        padding-right:.01rem;
                    };
                    &.alignLeft{
                        text-align: left;
                    }
                    dt{
                      width: 100%;
                      height: 1.46rem;
                      background: #fff;
                      img{
                        width: 100%;
                      }
                    }
                    dd{
                      width: 100%;
                      height: .8rem;
                      padding-top: .11rem;
                      padding-left: .08rem;
                      padding-right: .09rem;
                      background: #fff;
                      .discount{
                        width: .24rem;
                        height: .14rem;
                        font-size: 12px;
                        color: #fff;
                        background: #ff7700;
                        text-align: center;
                      }
                      span{
                        font-size: 11px;
                        i{
                            float: right;
                            color: #bbb;
                        }
                      }
                      .price{
                          color: #e66b01;
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
