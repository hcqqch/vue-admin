<template>
    <!-- 店铺设置 -->
    <section style="padding:20px">
        <div class="infoItem">经营设置</div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="经营状态">
                <el-radio-group v-model="form.business_status">
                    <el-radio label="2">营业</el-radio>
                    <el-radio label="3">休息</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="width:900px" label="营业时间">
                <el-radio-group
                    style="float:left;padding:15px 15px 0 0"
                    @change="radioChange"
                    v-model="form.business_time"
                >
                    <el-radio label="0">全天</el-radio>
                    <el-radio label="1">自定义</el-radio>
                </el-radio-group>
                <div style="display:flex" v-if="isShowTime">
                    <el-time-select
                        placeholder="起始时间"
                        v-model="form.startTime"
                        :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00'
                    }"
                    ></el-time-select>
                    <el-time-select
                        style="margin-left:10px"
                        placeholder="结束时间"
                        v-model="form.endTime"
                        :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00',
                    }"
                    ></el-time-select>
                </div>
            </el-form-item>
            <el-form-item label="下单门槛">
                <el-radio-group v-model="form.order_require">
                    <el-radio label="0">全部用户可以购买</el-radio>
                    <el-radio label="1">仅圈内用户可以购买</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="售罄商品">
                <el-radio-group v-model="form.display_sellout">
                    <el-radio label="0">展示</el-radio>
                    <el-radio label="1">不展示</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="发货地址">
                <el-cascader
                    v-model="form.city"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-button @click="save" type="primary">保存设置</el-button>
        </el-form>
    </section>
</template>
<script>
import { shopSetting, getshopSetting } from "../../api/api";
import { st } from "../../city";
import qs from "qs";

export default {
    data() {
        return {
            form: {
                business_status: "",
                business_time: "",
                order_require: "",
                display_sellout: "",
                city: "",
                address: "",
                startTime: "",
                endTime: ""
            },
            options: [],
            isShowTime: false
        };
    },
    methods: {
        handleChange() {},
        radioChange(val) {
            this.isShowTime = val == 1 ? true : false;
        },
        getshopSetting() {
            getshopSetting()
                .then(res => {
                    const data = res.data.data.data;
                    this.form.business_status = data.business_status;
                    this.business_time = data.business_time;
                    if (this.business_time !== "") {
                        this.form.startTime = this.business_time.substr(0, 5);
                        this.form.endTime = this.business_time.substr(6);
                        this.isShowTime = true;
                    }
                    this.form.order_require = data.order_require;
                    this.form.display_sellout = data.display_sellout;
                    this.form.city = data.send_city.split(",").map(Number);
                    this.form.address = data.address;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        save() {
            let business_time = 0;
            if (this.isShowTime) {
                business_time = `${this.form.startTime}-${this.form.endTime}`;
            }
            const params = {
                business_status: this.form.business_status,
                business_time: business_time,
                order_require: this.form.order_require,
                display_sellout: this.form.display_sellout,
                city: this.form.city.toString(),
                address: this.form.address
            };

            console.log(this.form.city);
            shopSetting(qs.stringify(params))
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: "success",
                            message: res.data.msg
                        });
                    } else {
                        this.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.options = st;
        this.options.map(item => {
            (item.value = item.id),
                (item.label = item.areaName),
                (item.children = item.list);
            if (item.children) {
                item.children.map(item => {
                    (item.value = item.id),
                        (item.label = item.areaName),
                        (item.children = item.list);
                    if (item.children) {
                        item.children.map(item => {
                            (item.value = item.id),
                                (item.label = item.areaName),
                                (item.children = item.list);
                        });
                    }
                });
            }
        });

        this.getshopSetting();
    }
};
</script>
<style lang="scss" scoped>
.el-form-item {
    width: 450px;
}
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>