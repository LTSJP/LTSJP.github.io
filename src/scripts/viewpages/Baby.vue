<template lang="html">
    <div class="common-con">
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
        <!-- 推荐 -->
        <div class="recommend">
            <div v-for="item in recommend">
                <img :src="item.child[0].pic" alt="">
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
                        <img :src="item.corner" alt="">
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios';
    export default{
        data(){
            return {
                dataListTop: [],
                dataListBottom: [],
                recommend:[],
                shopListTit: [],
                shopListCon: []
            }
        },
        mounted(){
            axios.get('/vip/babytop.php')
            .then((res) => {
                // console.log(res.data.data.block[0].multi_block[0].data);
                this.dataListTop = res.data.data.block[0].multi_block[0].data;
                this.dataListBottom = res.data.data.block[0].multi_block[1].data;
                this.recommend = res.data.data.block[0].multi_block[2].data;
                this.shopListTit = res.data.data.block[0].multi_block[3].data;
            }),
            axios.get('./vip/babybottom.php')
            .then((res) => {
                this.shopListCon = res.data.data.goods;
            })
        }
    }
</script>
<style lang="scss">
    @charset "UTF-8";
    @import '../../styles/yo/usage/core/reset';
    .common-con{
        width: 100%;
        height: 2rem;
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
        .recommend{
            width: 100%;
            height: 2.29rem;
            margin-bottom: 0.1rem;
            @include flexbox();
            @include flex-direction(row);
            div{
                @include flex();
                &:nth-child(odd){
                    padding-right: .005rem;
                }
                img{
                    width: 100%;
                }
            }
        }
        .shoplist{
            width: 100%;
            overflow: hidden;
            background: #fff;
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
