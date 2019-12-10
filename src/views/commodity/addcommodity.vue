 <template>
    <!-- 创建新品 -->
    <section style="padding:20px;position:relative">
        <div class="infoItem">基本信息</div>
        <el-form class ref="form" :model="form" label-width="120px">
        
            <el-form-item label="商品类型">
                <el-cascader
                    style="width:100%"
                    v-model="goods_category"
                    :options="goods_category_options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="店铺内商品分类">
                <el-cascader
                    style="width:100%"
                    v-model="shop_goods_category"
                    :options="shop_goods_category_options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="goods_name" placeholder="商品名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="品牌">
                 <el-input v-model="form.brand" placeholder="品牌"></el-input>
            </el-form-item>-->
            <el-form-item style="width:900px" label="标签">
                <el-tag
                    :key="tag"
                    v-for="tag in goods_tag"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                >{{tag}}</el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
            </el-form-item>
            <el-form-item label="分享描述">
                <el-input v-model="share_des" placeholder="分享描述"></el-input>
            </el-form-item>
            <el-form-item label="商品图" style="width:900px">
                <el-upload
                    action="http://up.qiniup.com"
                    list-type="picture-card"
                    :data="qiniuData"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="主图视频" style="width:900px">
                <el-upload
                    action="http://up.qiniup.com"
                    list-type="picture-card"
                    :data="qiniuData"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品详情图" style="width:900px">
                <el-upload
                    action="http://up.qiniup.com"
                    list-type="picture-card"
                    :data="qiniuData"
                    :on-success="handleAvatarSuccess"
                 
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <div class="infoItem">价格库存</div>
            <el-form-item label="商品规格">
                <sku-wrap :skuOptions="skuOptions"></sku-wrap>
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
            <el-form-item style="width:900px" label="商品说明">
                <el-input type="textarea" v-model="desc" maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item style="width:900px" label="上架时间">
                <el-radio v-model="sale_time_radio" label="立即上架售卖">立即上架售卖</el-radio>
                <br />
                <el-radio v-model="sale_time_radio" label="自定义上架时间">自定义上架时间</el-radio>
                <el-date-picker v-model="upperTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                <br />
                <el-radio v-model="sale_time_radio" label="暂不售卖放入仓库">暂不售卖放入仓库</el-radio>
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
        <div class="footerBtn">
            <el-button type="primary">保存到仓库</el-button>
            <el-button @click="submitGood" type="primary">发布该商品</el-button>
        </div>
    </section>
</template>
 
 <script>
import { getAddgoodsInfo, submitAddgoods } from "../../api/api";
import utils from "@/common/js/util";
import axios from "axios";
import qs from "qs";
// import SkuWrap from '../../components/sku'
export default {
    data() {
        return {
            form: {},
            goods_category: "", //商品分类
            shop_goods_category: "", //店铺内商品分类
            goods_category_options: [], //商品分类选项
            shop_goods_category_options: [], //店铺内商品分类选项
            goods_name: "", //商品名称
            goods_tag: [], //标签
            share_des: "", //分享描述
            big_img:"",//商品主图
            big_video:"",//商品主视频
            img_json:"",//商品详情图
            norms:"",//规格
            default_img_rules:"",//默认规格图
            goods_price:"",//商品价格
            goods_stock:0,//库存
            goods_feight:0,//是否包邮
            goods_feight_template_id:0,//运费模板的id
            goods_status:0,//上架的状态0 表示未上架放到库存里 1表示已上架 2表示已删除
            sale_time:"",//上架的时间
            goods_limit:0,//0表示不限购1表示限购
            goods_limit_rules:"",//限购规则
            circle_buy:0,//0表示所有的购买，1表示只有圈子里购买
            goods_info:"",//子商品的json
            label: [],
            radio: "",//
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
            desc: "", //商品说明
            sale_time_radio: "", //上架时间选项
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
            proportion: 0, //分享佣金比例
            inputVisible: false,
            inputValue: "",
            upload_qiniu_addr: "http://q1ecexot0.bkt.clouddn.com/",
            qiniuData: { key: "", token: "" },
            imageUrl: "",
            Global: {
                dataUrl: "http://office.pintaihui.cn/api/v1"
            },
            skuOptions:[],
        };
    },
    methods: {
        getQiniuToken: function() {
            const _this = this;
            axios
                .post(this.Global.dataUrl + "/qiniu/token")
                .then(function(res) {
                    console.log(res);
                    if (res.data) {
                        console.log(res.data.token);
                        _this.qiniuData.token = res.data.data.token;
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            duration: 2000,
                            type: "warning"
                        });
                    }
                });
        },
        beforeAvatarUpload: function(file) {
            console.log(file.name);
            this.qiniuData.key = file.name;
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isGIF = file.type === "image/gif";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error("图片只能是 JPG/PNG/GIF 格式!");
                return false;
            }
            if (!isLt2M) {
                this.$message.error("图片大小不能超过 2MB!");
                return false;
            }
        },
        handleAvatarSuccess: function(res, file) {
            console.log(res.key);
            this.imageUrl = this.upload_qiniu_addr + res.key;
            console.log(this.imageUrl);
        },
        handleError: function(res) {
            this.$message({
                message: "上传失败",
                duration: 2000,
                type: "warning"
            });
        },
        handleChange() {},
        // 修改统一运费
        changeFreight() {},
        // 新建运费模板
        addFremb() {
            this.$router.push("/addcommodity/addfremb");
        },
        // 标签关闭
        handleClose(tag) {
            this.goods_tag.splice(this.goods_tag.indexOf(tag), 1);
        },
        // 输入标签
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$nextTick(() => {});
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // 标签确认
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.goods_tag.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
        },
        //获取添加商品信息
        getAddgoodsInfo() {
            getAddgoodsInfo()
                .then(res => {
                    const data = res.data.data;
                    this.goods_category_options = data.goods_category;
                    this.shop_goods_category_options = data.shop_goods_category;
                    this.goods_tag = data.goods_tag;
                    this.skuOptions = data.goods_norms;
                    this.skuOptions.map(item=>{
                        item.value = item.id,
                        item.label = item.norms
                    })
                    console.log(this.skuOptions);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 发布商品
        submitGood() {}
    },
    components: {
        SkuWrap: resolve => {
            return require(["@/components/sku"], resolve);
        }
    },
    created() {
        this.getQiniuToken();
    },
    mounted() {
        this.getAddgoodsInfo();
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
}
.footerBtn {
    width: 100%;
    height: 60px;
    line-height: 60px;
    /* background: #f2f2f2; */
    text-align: center;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>