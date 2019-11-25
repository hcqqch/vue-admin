<template>
    <!-- 创建新品 -->
    <section style="padding:20px">
        <div class="infoItem">基本信息</div>
        <el-form class ref="form" :model="form" label-width="100px">
            <el-form-item label="商品分类">
                <el-cascader
                    style="width:100%"
                    v-model="type"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="form.name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-input v-model="form.brand" placeholder="品牌"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-input v-model="form.brand" placeholder="标签"></el-input>
            </el-form-item>
            <el-form-item label="分享描述">
                <el-input v-model="form.des" placeholder="分享描述"></el-input>
            </el-form-item>
            <el-form-item label="商品图" style="width:900px">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="主图视频" style="width:900px">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品详情图" style="width:900px">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <div class="infoItem">价格库存</div>
            <el-form-item label="商品规格">
                <sku-wrap></sku-wrap>
            </el-form-item>
            <div class="infoItem">物流信息</div>
            <el-form-item style="width:900px" label="快递运费">
                <el-radio v-model="radio" label="包邮">包邮</el-radio>
                <br />
                <el-radio v-model="radio" label="统一运费">统一运费</el-radio>
                <el-input-number
                    v-model="num"
                    controls-position="right"
                    @change="changeFreight"
                    :min="0"
                    :max="100"
                ></el-input-number>元
                <div style="display:flex;align-items:baseline">
                    <el-radio v-model="radio" label="分区运费">分区运费</el-radio>
                    <el-select style="margin:10px 20px 0 0" v-model="value" placeholder="请选择运费模板">
                        <el-option
                            v-for="item in mboptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button type="primary" @click="addFremb">新建运费模板</el-button>
                </div>
            </el-form-item>

            <!-- 其他信息 -->
            <div class="infoItem">其他信息</div>
            <el-form-item style="width:900px" label="上架时间">
                <el-radio v-model="radio" label="立即上架售卖">立即上架售卖</el-radio>
                <br />
                <el-radio v-model="radio" label="自定义上架时间">自定义上架时间</el-radio>
                <el-date-picker v-model="upperTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                <br />
                <el-radio v-model="radio" label="暂不售卖放入仓库">暂不售卖放入仓库</el-radio>
            </el-form-item>
            <el-form-item style="width:900px" label="限购">
                <el-checkbox v-model="limitBuyChecked">限制每人可购数量</el-checkbox>
                <br />
                <div v-show="limitBuyChecked">
                    <div style="display:flex;align-items:baseline">
                        <el-radio v-model="limitchecked" label="终身限购">终身限购</el-radio>
                        <el-input style="width:250px;" v-model="limitNum" placeholder="请输入数量"></el-input>件
                    </div>
                    <div style="display:flex;align-items:baseline">
                        <el-radio v-model="limitchecked" label="按周期修改">按周期限购</el-radio>
                        <el-select
                            style="margin:10px 10px 0 -14px;width:100px"
                            v-model="periodType"
                        >
                            <el-option
                                v-for="item in tpoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-input style="width:140px;" v-model="limitNum2" placeholder="请输入数量"></el-input>件
                    </div>
                </div>
                
                <el-checkbox v-model="limitBuyChecked2">只允许圈内用户购买</el-checkbox>
            </el-form-item>
            <el-form-item style="width:900px" label="分享佣金设置">
                <el-checkbox v-model="shareMoneyChecked">该商品参与分享拿佣金</el-checkbox>
                <div v-if="shareMoneyChecked">
                    佣金比例
                    <el-input-number
                        v-model="proportion"
                        controls-position="right"
                        :min="0"
                        :max="90"
                    ></el-input-number>%
                </div>
                <br />
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
import { getUserList } from "../../api/api";
// import SkuWrap from '../../components/sku'
export default {
    data() {
        return {
            form: {},
            type: [],
            radio: "",
            num: 1,
            options: [
                {
                    value: 1,
                    label: "东南",
                    children: [
                        {
                            value: 2,
                            label: "上海",
                            children: [
                                { value: 3, label: "普陀" },
                                { value: 4, label: "黄埔" },
                                { value: 5, label: "徐汇" }
                            ]
                        },
                        {
                            value: 7,
                            label: "江苏",
                            children: [
                                { value: 8, label: "南京" },
                                { value: 9, label: "苏州" },
                                { value: 10, label: "无锡" }
                            ]
                        },
                        {
                            value: 12,
                            label: "浙江",
                            children: [
                                { value: 13, label: "杭州" },
                                { value: 14, label: "宁波" },
                                { value: 15, label: "嘉兴" }
                            ]
                        }
                    ]
                },
                {
                    value: 17,
                    label: "西北",
                    children: [
                        {
                            value: 18,
                            label: "陕西",
                            children: [
                                { value: 19, label: "西安" },
                                { value: 20, label: "延安" }
                            ]
                        },
                        {
                            value: 21,
                            label: "新疆维吾尔族自治区",
                            children: [
                                { value: 22, label: "乌鲁木齐" },
                                { value: 23, label: "克拉玛依" }
                            ]
                        }
                    ]
                }
            ],
            // 运费模板
            mboptions: [
                {
                    value: "选项1",
                    label: "模板1"
                },
                {
                    value: "选项2",
                    label: "模板2"
                }
            ],
            value: "",
            upperTime: "", // 上架时间
            limitBuyChecked: false, //限制每人可购数量
            limitBuyChecked2: false, //只允许圈内用户购买
            limitchecked: false, //终身限购还是按周期修改
            limitNum: "", // 终身限购数量
            limitNum2: "", //按周期限购数量
            periodType: "", // 周期类型
            tpoptions: [
                {
                    value: "选项1",
                    label: "每天"
                },
                {
                    value: "选项2",
                    label: "每周"
                },
                {
                    value: "选项3",
                    label: "每月"
                }
            ],
            shareMoneyChecked: false, //分享佣金设置
            proportion: 0 //分享佣金比例
        };
    },
    methods: {
        handleChange() {},
        // 修改统一运费
        changeFreight() {},
         // 新建运费模板
        addFremb(){
            this.$router.push('/addcommodity/addfremb');
        },
    },
    components: {
        SkuWrap: resolve => {
            return require(["@/components/sku"], resolve);
        }
    },
    mounted() {}
};
</script>

<style scoped>
.el-form-item {
    width: 450px;
}

.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
</style>