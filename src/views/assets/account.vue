<template>
    <section style="padding:20px">
        <div class="infoItem">账户总览</div>

        <el-row :gutter="12">
            <el-col :span="8">
                <el-card class="larger" shadow="always">
                    已结算额：
                    <span>{{money}}</span>元
                    <!-- <el-button type="text" @click="withDraw">提现</el-button> -->
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="larger" shadow="always">
                    待结算额：
                    <span>{{frozen_money}}</span>元
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="larger" shadow="always">
                    保证金：
                    <span>{{security_money}}</span>元
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12" style="margin-top:20px">
            <el-col :span="24">
                <el-card class="larger" shadow="always">
                    总收入：
                    <span>{{total}}元</span>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12" style="margin-top:20px">
            <el-col :span="24">
                <el-card class="larger" shadow="always">
                    佣金支出：
                    <span>{{commission}}</span>元
                </el-card>
            </el-col>
        </el-row>

        <el-dialog width="30%" title="提现申请" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="提现银行卡:" :label-width="formLabelWidth">{{card_sn}}</el-form-item>
                <el-form-item label="提现银行:" :label-width="formLabelWidth">{{card_name}}</el-form-item>
                <el-form-item label="银行卡所有人:" :label-width="formLabelWidth">{{card_user_name}}</el-form-item>
                <el-form-item label="可提现金额:" :label-width="formLabelWidth">{{money}}</el-form-item>
                <el-form-item label="提现金额" :label-width="formLabelWidth">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="提现密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitWithdraw">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getWallet, postWallet } from "../../api/api";

export default {
    data() {
        return {
            money: "",
            frozen_money: "",
            security_money: "",
            total: "",
            commission: "",
            dialogFormVisible: false,
            formLabelWidth: "120px",
            form: {
                money: "",
                password: ""
            },
            card_sn: "",
            card_name: "",
            card_user_name: ""
        };
    },
    methods: {
        withDraw() {
            this.dialogFormVisible = true;
        },
        submitWithdraw() {
            const params = {
                money: this.form.money,
                password: this.form.password
            };
            postWallet(params)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: "warning"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.dialogFormVisible = false;
        },
        getWallet() {
            getWallet()
                .then(res => {
                    const data = res.data.data;
                    this.money = data.data.money;
                    this.commission = data.data.commission;
                    this.security_money = data.data.security_money;
                    this.total = data.data.total;
                    this.frozen_money = data.data.frozen_money;
                    this.card_sn = data.bank.card_sn;
                    this.card_name = data.bank.card_name;
                    this.card_user_name = data.bank.card_user_name;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getWallet();
    }
};
</script>

<style lang="scss" scoped>
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
.larger {
    font-size: 18px;
    line-height: 36px;
}
</style>
