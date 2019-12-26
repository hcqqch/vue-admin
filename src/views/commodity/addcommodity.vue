 <template>
    <!-- 创建新品 -->
    <section style="padding:20px;position:relative">
        <div class="infoItem">基本信息</div>
        <el-form class ref="form" :model="form" label-width="120px">
            <el-form-item label="商品类型" required>
                <el-cascader
                    style="width:100%"
                    v-model="goods_category"
                    :options="goods_category_options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="店铺内商品分类" required>
                <el-cascader
                    style="width:100%"
                    v-model="shop_goods_category"
                    :options="shop_goods_category_options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称" required>
                <el-input v-model="goods_name" placeholder="商品名称"></el-input>
            </el-form-item>
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
            <el-form-item label="分享描述" required>
                <el-input v-model="share_desc" placeholder="分享描述"></el-input>
            </el-form-item>
            <el-form-item label="商品图" style="width:900px" required>
                <img v-for="(item,i) in big_img" :key="i" :src="item" alt />
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
                    :show-file-list="false"
                    :data="qiniuData"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload"
                >
                    <i class="el-icon-plus"></i>
                    <video class="video" :src="videosrc" autoplay></video>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品详情图" style="width:900px" required>
                <img v-for="(item,i) in img_json" :key="i" :src="item" alt />
                <el-upload
                    action="http://up.qiniup.com"
                    list-type="picture-card"
                    :data="qiniuData"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess3"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <div class="infoItem">价格库存</div>
            <el-form-item label="商品规格">
                <sku-wrap
                    :specification="norms"
                    :childProductArray="goods_info"
                    :skuOptions="skuOptions"
                    @imageInfo="getUrl"
                    @info="get"
                    @infos="gets"
                ></sku-wrap>
            </el-form-item>

            <div class="infoItem">物流信息</div>
            <el-form-item style="width:900px" label="快递运费" required>
                <el-radio v-model="goods_feight" @change="radioChange" label="1">包邮</el-radio>
                <br />
                <el-radio v-model="goods_feight" @change="radioChange" label="2">统一运费</el-radio>
                <el-input-number
                    v-model="uniform_feight"
                    controls-position="right"
                    @change="changeFreight"
                    :min="0"
                    :max="100"
                ></el-input-number>元
                <div style="display:flex;align-items:baseline">
                    <el-radio v-model="goods_feight" @change="radioChange" label="3">分区运费</el-radio>
                    <el-select
                        style="margin:10px 20px 0 0"
                        v-model="goods_feight_template_id"
                        placeholder="请选择运费模板"
                    >
                        <el-option
                            v-for="item in mboptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-button type="primary" @click="addFremb">新建运费模板</el-button>
                </div>
            </el-form-item>

            <!-- 其他信息 -->
            <div class="infoItem">其他信息</div>
            <el-form-item style="width:900px" label="商品说明">
                <el-input type="textarea" v-model="form.desc" maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item style="width:900px" label="上架时间" required>
                <el-radio v-model="sale_time_radio" @change="radioChange2" label="1">立即上架售卖</el-radio>
                <br />
                <el-radio v-model="sale_time_radio" @change="radioChange2" label="2">自定义上架时间</el-radio>
                <el-date-picker v-model="sale_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                <br />
                <el-radio v-model="sale_time_radio" @change="radioChange2" label="3">暂不售卖放入仓库</el-radio>
            </el-form-item>
            <el-form-item style="width:900px" label="限购">
                <el-checkbox v-model="limitBuyChecked">限制每人可购数量</el-checkbox>
                <br />
                <div v-show="limitBuyChecked">
                    <div style="display:flex;align-items:baseline">
                        <el-radio v-model="limitchecked" @change="radioChange3" label="终身限购">终身限购</el-radio>
                        <el-input style="width:250px;" v-model="limitNum" placeholder="请输入数量"></el-input>件
                    </div>
                    <div style="display:flex;align-items:baseline">
                        <!-- <el-radio></el-radio> -->
                        <el-radio v-model="limitchecked" @change="radioChange3" label="按周期修改">按周期限购</el-radio>
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
                    <el-input-number v-model="reward" controls-position="right" :min="0" :max="90"></el-input-number>%
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
import {
    getAddgoodsInfo,
    submitAddgoods,
    checkAccount,
    getEditGoods,
    editGoods
} from "../../api/api";
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
            share_desc: "", //分享描述
            big_img: [], //商品主图
            big_video: "", //商品主视频
            img_json: [], //商品详情图
            norms: "", //规格
            default_img_rules: "", //默认规格图
            goods_price: "", //商品价格
            goods_stock: "", //库存
            goods_feight: "", //是否包邮
            uniform_feight: "", //统一运费
            goods_feight_template_id: "", //运费模板的id
            desc: "", //商品说明
            goods_status: "", //上架的状态0 表示未上架放到库存里 1表示已上架 2表示已删除
            sale_time: "", //上架的时间
            goods_limit: "", //0表示不限购1表示限购
            goods_limit_rules: "", //限购规则
            circle_buy: "", //0表示所有的购买，1表示只有圈子里购买
            goods_info: "", //子商品的json
            isreward: "", //是否分享佣金
            reward: "", //佣金比例

            mboptions: [], // 运费模板
            sale_time_radio: "", //上架时间选项
            upperTime: "", // 上架时间
            limitBuyChecked: false, //限制每人可购数量
            limitBuyChecked2: false, //只允许圈内用户购买
            limitchecked: false, //终身限购还是按周期修改
            limitNum: "", // 终身限购数量
            limitNum2: "", //按周期限购数量
            periodType: "", // 周期类型
            inputValue: "",
            tpoptions: [
                {
                    value: "1",
                    label: "每天"
                },
                {
                    value: "2",
                    label: "每周"
                },
                {
                    value: "3",
                    label: "每月"
                }
            ],
            shareMoneyChecked: false, //分享佣金设置
            inputVisible: false,
            upload_qiniu_addr: "http://q1ecexot0.bkt.clouddn.com/",
            qiniuData: { key: "", token: "" },
            imageUrl: "",
            Global: {
                dataUrl: "http://office.pintaihui.cn/api/v1"
            },
            videosrc: "",
            skuOptions: []
        };
    },
    methods: {
        getQiniuToken: function() {
            const _this = this;
            axios
                .post(this.Global.dataUrl + "/qiniu/token")
                .then(function(res) {
                    if (res.data) {
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
            // console.log(file.name);
            // console.log(file.type);
            this.qiniuData.key = file.name;

            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isGIF = file.type === "image/gif";
            const isLt2M = file.size / 1024 / 1024 < 2;
            // if (!isJPG && !isPNG) {
            //     this.$message.error("图片只能是 JPG/PNG/GIF 格式!");
            //     return false;
            // }
            // if (!isLt2M) {
            //     this.$message.error("图片大小不能超过 2MB!");
            //     return false;
            // }
        },
        handleAvatarSuccess: function(res, file) {
            this.big_img.push(this.upload_qiniu_addr + res.key);
            // console.log(this.big_img);
        },
        handleAvatarSuccess2: function(res, file) {
            this.videosrc = this.upload_qiniu_addr + res.key;
            this.big_video = this.videosrc;
        },
        handleAvatarSuccess3: function(res, file) {
            this.img_json.push(this.upload_qiniu_addr + res.key);
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
        // 快递运费改变
        radioChange(value) {
            this.uniform_feight = "";
            this.goods_feight_template_id = "";
        },
        radioChange2() {
            this.sale_time = "";
        },
        radioChange3() {
            this.limitNum = "";
            this.limitNum2 = "";
            this.periodType = "";
        },
        //获取添加商品信息
        getAddgoodsInfo() {
            getAddgoodsInfo()
                .then(res => {
                    const data = res.data.data;
                    this.goods_category_options = data.goods_category;
                    this.shop_goods_category_options = data.shop_goods_category;
                    let tags = [];
                    data.goods_tag.map(item => {
                        tags.push(item.name);
                    });
                    this.goods_tag = tags;
                    this.skuOptions = data.goods_norms;
                    this.skuOptions.map(item => {
                        item.value = item.id;
                        item.label = item.norms;
                    });
                    data.freight_template.map(item => {
                        item.label = item.name;
                    });
                    this.mboptions = data.freight_template;
                    // console.log(this.skuOptions);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 发布商品
        submitGood() {
            if (this.limitBuyChecked) {
                this.goods_limit = 1;
            } else {
                this.goods_limit = 0;
                this.limitNum = "";
                this.limitNum2 = "";
                this.periodType = "";
            }
            if (this.limitBuyChecked2) {
                this.circle_buy = 1;
            } else {
                this.circle_buy = 0;
            }
            if (this.shareMoneyChecked) {
                this.isreward = 1;
            } else {
                this.isreward = 0;
                this.reward = "";
            }

            if (this.sale_time != "") {
                this.sale_time = utils.formatDate.format(this.sale_time);
            }

            // console.log(this.sale_time);
            // console.log(this.imageUrl);
            // console.log(this.reward);

            this.goods_limit_rules = [
                {
                    limit_num_all: this.limitNum,
                    limit_num_period: this.limitNum2,
                    period_type: this.periodType
                }
            ];

            const params = {
                goods_category: this.goods_category,
                shop_goods_category: this.shop_goods_category,
                goods_name: this.goods_name,
                tag: this.goods_tag,
                share_desc: this.share_desc,
                big_img: this.big_img,
                big_video: this.big_video,
                img_json: this.img_json,
                norms: this.norms,
                default_img_rules: this.default_img_rules,
                goods_price: this.goods_price,
                goods_stock: this.goods_stock,
                goods_feight: this.goods_feight,
                uniform_feight: this.uniform_feight,
                goods_feight_template_id: this.goods_feight_template_id,
                desc: this.desc,
                goods_status: this.sale_time_radio,
                sale_time: this.sale_time,
                goods_limit: this.goods_limit,
                goods_limit_rules: this.goods_limit_rules,
                circle_buy: this.circle_buy,
                goods_info: this.goods_info,
                isreward: this.isreward,
                reward: this.reward
            };
            // const urlType = submitAddgoods
            // if(this.$route.query.id){
            //     urlType = editGoods
            // }
            submitAddgoods(
                { data: JSON.stringify(params) },
                {
                    transformRequest: [
                        function(data) {
                            var str = "";
                            for (var key in data) {
                                str +=
                                    encodeURIComponent(key) +
                                    "=" +
                                    encodeURIComponent(data[key]) +
                                    "&";
                            }
                            return str;
                        }
                    ]
                }
            )
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
        },
        get(info) {
            this.norms = info;
        },
        gets(infos) {
            infos.map(item => {
                item.isUse = item.isUse ? 0 : 1;
            });
            this.goods_info = infos;
        },
        getUrl(imageInfo) {
            this.imageUrl = imageInfo;
        },
        getEditGoods() {
            const params = {
                id: this.$route.query.id
            };
            // console.log(params);
            getEditGoods(params)
                .then(res => {
                    const data = res.data.data;
                    this.goods_category_options = data.goods_category;
                    this.shop_goods_category_options = data.shop_goods_category;
                    this.goods_category = data.goods.goods_category;
                    this.shop_goods_category = data.goods.shop_goods_category;
                    this.goods_name = data.goods.goods_name;
                    this.goods_tag = data.goods.tag;
                    this.share_desc = data.goods.share_desc;
                    this.big_img = data.goods.big_img;
                    console.log("ss");
                    console.log(data.goods.norms);
                    this.videosrc = data.goods.big_video;
                    this.img_json = data.goods.img_json;
                    this.norms = data.goods.norms;
                    this.default_img_rules = data.goods.default_img_rules;
                    this.goods_price = data.goods.goods_price;
                    this.goods_stock = data.goods.goods_stock;
                    this.goods_feight = data.goods.goods_feight;
                    this.uniform_feight = data.goods.uniform_feight;
                    this.goods_feight_template_id =
                        data.goods.goods_feight_template_id;
                    this.desc = data.goods.desc;
                    this.goods_status = data.goods.goods_status;
                    this.sale_time = data.goods.sale_time;
                    this.goods_limit = data.goods.goods_limit;
                    this.goods_limit_rules = data.goods.goods_limit_rules;
                    this.circle_buy = data.goods.circle_buy;
                    this.goods_info = data.goods.goods_info;
                    this.isreward = data.goods.isreward;
                    this.reward = data.goods.reward;
                })
                .catch(err => {
                    console.log(err);
                });
        }
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
        console.log(this.$route.query.id);
        if (this.$route.query.id) {
            this.getEditGoods();
        } else {
            this.getAddgoodsInfo();
        }
    }
};
</script>
 
 <style lang="scss" scoped>
.el-form-item {
    width: 450px;
}
.video {
    position: absolute;
    left: 0px;
    width: 147px;
    height: 147px;
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
img {
    width: 147px;
    height: 147px;
    margin-right: 10px;
    float: left;
}
</style>