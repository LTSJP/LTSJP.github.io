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
        <!--商品列表-->
		<GoodsList :goodsList="shopListCon" :update="updateimg"></GoodsList>
        
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios';
    import GoodsList from '../components/GoodsList.vue'
    export default{
        data(){
            return {
                dataListTop: [],
                dataListBottom: [],
                shopListTit: [],
                shopListCon: [],
                updateimg:''
            }
        },
        components:{
			GoodsList
		},
        mounted(){
            axios.get('/vip/list1.php')
            .then((res) => {
                this.dataListTop = res.data.data.block[0].multi_block[0].data;
                this.dataListBottom = res.data.data.block[0].multi_block[1].data;
                this.shopListTit = res.data.data.block[0].multi_block[2].data;
                this.updateimg = res.data.data.block[0].multi_block[2].data[0].child[0].pic;
            }),
            axios.get('./vip/list2.php')
            .then((res) => {
                this.shopListCon = res.data.data.goods;
            })
        }
    }
</script>
<style lang="scss">
	@import '../../styles/yo/usage/core/reset';

    @charset "UTF-8";
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
                      text-align: center;
                      p{
                        height: .22rem;
                        font-size: 12px;
                        color: #ff464e;
                      }
                      span{
                        font-size: 11px;
                      }
                    }
                }
            }
        }
    }
</style>
