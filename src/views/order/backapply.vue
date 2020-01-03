<template>
<!-- 申请详情 -->
    <section style="padding:20px">
        <div class="infoItem">退换申请</div>
        <div class="block">
            <el-timeline v-for="(item,i) in data" :key="i">
                <el-timeline-item :timestamp="item.addtime" placement="top">
                    <el-card class="p-content">
                        <h4>首次申请</h4>
                        <p>
                            商品名称：
                            <span>{{item.goods_name}}</span>规格型号:
                            <span>{{item.norms_name}}</span>商品单价:
                            <span>{{item.goods_price}}</span>购买数量:
                            <span>{{item.num}}</span>
                        </p>
                        <p>
                            优惠总额:
                            <span>{{item.coupon_total}}</span>
                            实际支付:
                            <span>{{item.pay_price}}</span>
                            退换类型:
                            <span>{{item.type}}</span>
                            卖家处理
                            <span>{{item.deleted}}</span>
                        </p>
                        <p>
                            退款原因
                            <span>{{item.reason}}</span>
                        </p>
                        <p>
                            拒接原因:
                            <span>{{item.orders_refund_apply}}</span>
                        </p>
                        <p>
                            退款凭证:
                            <span v-for="(img,i) in item.img" :key="i">
                                <img style="width:100px;height:100px" :src="item.img[i]" alt />
                            </span>
                        </p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </section>
</template>

<script>
import { getRefundApply, getRefundlist } from "../../api/api";
import utils from "@/common/js/util";

export default {
    data() {
        return {
            data: []
        };
    },
    methods: {
        getRefundApply() {
            const params = {
                id: this.$route.query.id,
                order_id: this.$route.query.order_id
            };
            getRefundApply(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data;
                    this.data.map(item => {
                        item.img = JSON.parse(item.img);
                    });
                    console.log(this.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getRefundApply();
    }
};
</script>
<style scoped>
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
.p-content span {
    display: inline-block;
    margin-right: 100px;
}
</style>