<template>
    <!-- 商品规格模板 -->
    <div id="app-sku">
        <!-- 规格设置 -->
        <div class="specification">
            <div class="title">产品规格设置</div>
            <ul class="spec-list">
                <li class="item" v-for="(item, index) in specification" :key="index">
                    <div class="name">
                        <el-select
                            style="display:block"
                            size="small"
                            v-model="item.name"
                            filterable
                            allow-create
                            default-first-option
                            placeholder="输入或选择规格"
                            @change="clearOption(index)"
                        >
                            <el-option
                                v-for="item in skuOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label"
                            ></el-option>
                        </el-select>
                        <!-- <el-input size="small" v-model="item.name" placeholder="输入产品规格"></el-input> -->
                        <i class="icon el-icon-circle-close" @click="delSpec(index)"></i>
                    </div>
                    <div class="values">
                        <span class="el-tag" v-for="(tag, num) in item.value" :key="tag">
                            <span class="el-select__tags-text">{{tag}}</span>
                            <i class="el-tag__close el-icon-close" @click="delSpecTag(index, num)"></i>
                        </span>
                        <div class="add-attr">
                            <el-input
                                size="small"
                                v-model="addValues[index]"
                                placeholder="多个产品属性以空格隔开"
                                icon="plus"
                                @click="addSpecTag(index)"
                                @keyup.native.enter="addSpecTag(index)"
                            ></el-input>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="add-spec">
                <el-button
                    size="small"
                    type="info"
                    :disabled="specification.length >= 10"
                    @click="addSpec"
                >添加规格项目</el-button>
            </div>
        </div>

        <!-- 规格展示 -->
        <!-- <div class="example">
            <h4 class="title">
                规格展示
                <el-button
                    type="primary"
                    @click="specificationStatus = !specificationStatus"
                    size="mini"
                >{{ !specificationStatus ? '显示' : '隐藏' }}</el-button>
            </h4>
            <table class="stock-table" v-if="specificationStatus">
                <thead>
                    <tr>
                        <th v-for="(item, index) in specification" :key="index">{{item.name}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in countSum(0)" :key="index">
                        <td
                            v-for="(n, specIndex) in specification.length"
                            :key="n"
                        >{{getSpecAttr(specIndex, index)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>-->

        <!-- 规格明细 -->
        <div class="example">
            <h4 class="title">规格明细</h4>
            <table class="stock-table" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th v-for="(item, index) in specification" :key="index">{{item.name}}</th>
                        <th style="width: 160px;">规格编码</th>
                        <th>成本价（元）</th>
                        <th>库存</th>
                        <th>销售价（元）</th>
                        <th>原价</th>
                        <th style="width:60px">规格图</th>
                        <th>是否启用</th>
                    </tr>
                </thead>
                <tbody v-if="specification[0] && specification[0].value.length">
                    <tr :key="index" v-for="(item, index) in countSum(0)">
                        <template v-for="(n, specIndex) in specification.length">
                            <td
                                v-if="showTd(specIndex, index)"
                                :key="n"
                                :rowspan="countSum(n)"
                            >{{getSpecAttr(specIndex, index)}}</td>
                        </template>
                        <td>
                            <el-input
                                size="small"
                                type="text"
                                :disabled="!childProductArray[index].isUse"
                                v-model="childProductArray[index].childProductNo"
                                @blur="handleNo(index)"
                                placeholder="输入商品规格编号"
                            ></el-input>
                        </td>
                        <td>
                            <el-input
                                size="small"
                                type="text"
                                v-model.number="childProductArray[index].childProductCost"
                                placeholder="输入成本价"
                                :disabled="!childProductArray[index].isUse"
                            ></el-input>
                        </td>
                        <td>
                            <el-input
                                size="small"
                                type="text"
                                v-model.number="childProductArray[index].childProductStock"
                                placeholder="输入库存"
                                :disabled="!childProductArray[index].isUse"
                            ></el-input>
                        </td>
                        <td>
                            <el-input
                                size="small"
                                type="text"
                                v-model.number="childProductArray[index].childProductPrice"
                                placeholder="输入销售价"
                                :disabled="!childProductArray[index].isUse"
                            ></el-input>
                        </td>
                        <td>
                            <el-input
                                size="small"
                                type="text"
                                v-model.number="childProductArray[index].childProductOrigin"
                                placeholder="输入原价"
                                :disabled="!childProductArray[index].isUse"
                            ></el-input>
                        </td>
                        <td>
                            <!-- 图片 -->
                            <el-upload
                                class="avatar-uploader"
                                action="http://up.qiniup.com"
                                :data="qiniuData"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess2"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="childProductArray[index].specDrawing" :src="childProductArray[index].specDrawing" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </td>
                        <td>
                            <el-switch
                                v-model="childProductArray[index].isUse"
                                @change="(val) => {handleUserChange(index, val)}"
                            ></el-switch>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="10" class="wh-foot">
                            <span class="label">批量设置：</span>
                            <ul class="set-list" v-if="isSetListShow">
                                <li class="set-item" @click="openBatch('childProductCost')">成本价</li>
                                <li class="set-item" @click="openBatch('childProductStock')">库存</li>
                                <li class="set-item" @click="openBatch('childProductPrice')">销售价</li>
                                <li class="set-item" @click="openBatch('childProductOrigin')">原价</li>
                            </ul>
                            <div class="set-form" v-else>
                                <el-input size="mini" v-model.number="batchValue" placeholder="请输入"></el-input>
                                <i class="set-btn blue el-icon-check" @click="setBatch"></i>
                                <i class="set-btn red el-icon-close" @click="cancelBatch"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 默认规格信息设置 -->
        <div>
            <h4 style="margin-top:20px" class="title">默认规格图</h4>
            <el-upload
                class="avatar-uploader"
                action="http://up.qiniup.com"
                :data="qiniuData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <h4 style="margin-top:20px" class="title">默认价格</h4>
            <el-form-item label="价格" required label-width="50px">
                <el-input
                    v-model="defaultPrice"
                    :disabled="isCanSetting"
                    style="width:40%;margin-left:10px"
                ></el-input>
            </el-form-item>
            <h4 style="margin-top:20px" class="title">默认库存</h4>
            <el-form-item label="库存" required label-width="50px">
                <el-input
                    v-model="defaultSku"
                    :disabled="isCanSetting"
                    style="width:40%;margin-left:10px"
                ></el-input>
            </el-form-item>
            <el-button style="margin-top:20px" type="primary" @click="showinfo">确认库存信息</el-button>
        </div>

        <div class="example">
            <!-- <h4 class="title">数据格式</h4> -->
            <!-- <div class="code-area">
                <div v-for="(item, index) in childProductArray" :key="index">{{ item }}</div>
            </div>-->
        </div>
    </div>
</template>

<script>
// import { getAddgoodsInfo, submitAddgoods } from "../../api/api";
import axios from "axios";
// import qs from "qs";

// 为Object添加一个原型方法，判断两个对象是否相等
function objEquals(object1, object2) {
    // For the first loop, we only check for types
    for (let propName in object1) {
        // Check for inherited methods and properties - like .equals itself
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        // Return false if the return value is different
        if (
            object1.hasOwnProperty(propName) !==
            object2.hasOwnProperty(propName)
        ) {
            return false;
            // Check instance type
        } else if (typeof object1[propName] !== typeof object2[propName]) {
            // Different types => not equal
            return false;
        }
    }
    // Now a deeper check using other objects property names
    for (let propName in object2) {
        // We must check instances anyway, there may be a property that only exists in object2
        // I wonder, if remembering the checked values from the first loop would be faster or not
        if (
            object1.hasOwnProperty(propName) !==
            object2.hasOwnProperty(propName)
        ) {
            return false;
        } else if (typeof object1[propName] !== typeof object2[propName]) {
            return false;
        }
        // If the property is inherited, do not check any more (it must be equa if both objects inherit it)
        if (!object1.hasOwnProperty(propName)) {
            continue;
        }
        // Now the detail check and recursion
        // This returns the script back to the array comparing
        /** REQUIRES Array.equals**/
        if (
            object1[propName] instanceof Array &&
            object2[propName] instanceof Array
        ) {
            // recurse into the nested arrays
            if (objEquals(!object1[propName], object2[propName])) {
                return false;
            }
        } else if (
            object1[propName] instanceof Object &&
            object2[propName] instanceof Object
        ) {
            // recurse into another objects
            // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
            if (objEquals(!object1[propName], object2[propName])) {
                return false;
            }
            // Normal value comparison for strings and numbers
        } else if (object1[propName] !== object2[propName]) {
            return false;
        }
    }
    // If everything passed, let's say YES
    return true;
}

export default {
    name: "skuwrap",

    // props:{
    //     skuOptions:{
    //         type:Object,
    //         default:[]
    //     },
    //     specification:{
    //         type:Object,
    //         default:[]
    //     },
    //     childProductArray:{
    //         type:Object,
    //         default:[]
    //     }
    // },

    // props: ["skuOptions","specification","childProductArray"],

    data() {
        return {
            // 显示规格列表
            specificationStatus: false,
            // 规格
            // specification:[],
            specification: [
                // {
                //     name: "颜色",
                //     value: ["黑色", "白色", "蓝色"]
                // }
            ],
            //规格下拉数据
            // skuOptions: [],
            // 子规格
            // childProductArray: [
            //     // {
            //     //     childProductId: 0,
            //     //     childProductSpec: { 颜色: "黑色" },
            //     //     childProductNo: "PRODUCTNO_0", //规格编码
            //     //     childProductStock: 0, //库存
            //     //     childProductPrice: 0, //销售价
            //     //     childProductCost: 0, //成本价
            //     //     childProductOrigin: 0, //原价
            //     //     specDrawing:"",//规格图
            //     //     isUse: true //是否启用
            //     // },
            //     // {
            //     //     childProductId: 0,
            //     //     childProductSpec: { 颜色: "白色" },
            //     //     childProductNo: "PRODUCTNO_1",
            //     //     childProductStock: 0,
            //     //     childProductPrice: 0,
            //     //     childProductCost: 0,
            //     //     childProductOrigin: 0,
            //     //     specDrawing:"",//规格图
            //     //     isUse: true
            //     // },
            //     // {
            //     //     childProductId: 0,
            //     //     childProductSpec: { 颜色: "蓝色" },
            //     //     childProductNo: "PRODUCTNO_2",
            //     //     childProductStock: 0,
            //     //     childProductPrice: 0,
            //     //     childProductCost: 0,
            //     //     childProductOrigin: 0,
            //     //     isUse: true
            //     // }
            // ],
            // 用来存储要添加的规格属性
            addValues: [],
            // 默认商品编号
            defaultProductNo: "PRODUCTNO_",
            // 批量设置相关
            isSetListShow: true,
            batchValue: "", // 批量设置所绑定的值
            currentType: "", // 要批量设置的类型
            defaultPrice: "", //默认价格
            defaultSku: "", //默认库存

            upload_qiniu_addr: "http://img.pintaihui.cn/",
            qiniuData: { key: "", token: "" },
            imageUrl: "", //默认规格图
            Global: {
                dataUrl: "https://office.pintaihui.cn"
            },
            specDrawing:""//详细规格图
        };
    },

    computed: {
        // 所有sku的id
        stockSpecArr() {
            return this.childProductArray.map(item => item.childProductSpec);
        },
        //默认价格库存是否可编辑
        isCanSetting() {
            return this.specification.length == 0 ? false : true;
        }
    },

    methods: {
        // 向父组件传递数据
        showinfo() {
            this.$message("已确认");
            this.$emit("info", this.specification);
            this.$emit("infos", this.childProductArray);
            this.$emit("imageInfo", this.imageUrl);
            console.log(this.imageUrl);
        },
        // 添加规格项目
        addSpec() {
            if (this.specification.length < 11) {
                console.log(this.specification);
                this.specification.push({
                    name: "",
                    value: []
                });
            }
        },
        //清除商品子规格
        clearOption(index) {
            this.specification[index].value = [];
        },

        // 删除规格项目
        delSpec(index) {
            this.specification.splice(index, 1);
            this.handleSpecChange("del");
        },

        // 添加规格属性
        addSpecTag(index) {
            let str = this.addValues[index] || "";
            if (!str.trim()) return; // 判空
            str = str.trim();
            let arr = str.split(/\s+/); // 使用空格分割成数组

            let newArr = this.specification[index].value.concat(arr);
            newArr = Array.from(new Set(newArr)); // 去重
            this.$set(this.specification[index], "value", newArr);

            this.clearAddValues(index);

            this.handleSpecChange("add");
        },

        // 删除规格属性
        delSpecTag(index, num) {
            this.specification[index].value.splice(num, 1);
            this.handleSpecChange("del");
        },

        // 清空 addValues
        clearAddValues(index) {
            this.$set(this.addValues, index, "");
        },

        /*
        根据传入的属性值，拿到相应规格的属性
        @params
          specIndex 规格项目在 advancedSpecification 中的序号
          index 所有属性在遍历时的序号
      */
        getSpecAttr(specIndex, index) {
            // 获取当前规格项目下的属性值
            const currentValues = this.specification[specIndex].value;
            let indexCopy;

            // 判断是否是最后一个规格项目
            if (
                this.specification[specIndex + 1] &&
                this.specification[specIndex + 1].value.length
            ) {
                indexCopy = index / this.countSum(specIndex + 1);
            } else {
                indexCopy = index;
            }

            const i = Math.floor(indexCopy % currentValues.length);

            if (i.toString() !== "NaN") {
                return currentValues[i];
            } else {
                return "";
            }
        },

        /*
        计算属性的乘积
        @params
          specIndex 规格项目在 advancedSpecification 中的序号
      */
        countSum(specIndex) {
            let num = 1;
            this.specification.forEach((item, index) => {
                if (index >= specIndex && item.value.length) {
                    num *= item.value.length;
                }
            });
            return num;
        },

        // 根据传入的条件，来判断是否显示该td
        showTd(specIndex, index) {
            // 如果当前项目下没有属性，则不显示
            if (!this.specification[specIndex]) {
                return false;
            } else if (index % this.countSum(specIndex + 1) === 0) {
                return true;
            } else {
                return false;
            }
        },

        /**
         * [handleSpecChange 监听标签的变化,当添加标签时；求出每一行的hash id，再动态变更库存信息；当删除标签时，先清空已有库存信息，然后将原有库存信息暂存到stockCopy中，方便后面调用]
         * @param  {[string]} option ['add'|'del' 操作类型，添加或删除]
         * @return {[type]}        [description]
         */
        handleSpecChange(option) {
            const stockCopy = JSON.parse(
                JSON.stringify(this.childProductArray)
            );
            if (option === "del") {
                this.childProductArray = [];
            }

            for (let i = 0; i < this.countSum(0); i++) {
                this.changeStock(option, i, stockCopy);
            }

            // if(option = "del"){
            //     this.childProduct = childProduct;
            //     this.childProductId  = childProductId;
            //     if(this.changeStock = this.)
            // }
        },

        /**
         * [根据规格，动态改变库存相关信息]
         * @param  {[string]} option    ['add'|'del' 操作类型，添加或删除]
         * @param  {[array]} stockCopy [库存信息的拷贝]
         * @return {[type]}           [description]
         */
        changeStock(option, index, stockCopy) {
            let childProduct = {
                childProductId: 0,
                childProductSpec: this.getChildProductSpec(index),
                childProductNo: this.defaultProductNo + index,
                childProductStock: 0,
                childProductPrice: 0,
                childProductCost: 0,
                childProductOrigin: 0, //原价
                specDrawing: "", //规格图
                isUse: true
            };

            const spec = childProduct.childProductSpec;
            if (option === "add") {
                // 如果此id不存在，说明为新增属性，则向 childProductArray 中添加一条数据
                if (
                    this.stockSpecArr.findIndex(item =>
                        objEquals(spec, item)
                    ) === -1
                ) {
                    this.$set(this.childProductArray, index, childProduct);
                }
            } else if (option === "del") {
                // 因为是删除操作，理论上所有数据都能从stockCopy中获取到
                let origin = "";
                stockCopy.forEach(item => {
                    if (objEquals(spec, item.childProductSpec)) {
                        origin = item;
                        return false;
                    }
                });
                this.childProductArray.push(origin || childProduct);
            }
        },

        // 获取childProductArray的childProductSpec属性
        getChildProductSpec(index) {
            let obj = {};
            this.specification.forEach((item, specIndex) => {
                obj[item.name] = this.getSpecAttr(specIndex, index);
            });
            return obj;
        },

        // 监听规格启用操作
        handleUserChange(index, value) {
            // 启用规格时，生成不重复的商品编号；关闭规格时，清空商品编号
            if (value) {
                let No = this.makeProductNoNotRepet(index);
                this.$set(this.childProductArray[index], "childProductNo", No);
            } else {
                this.$set(this.childProductArray[index], "childProductNo", "");
            }
        },

        // 监听商品编号的blur事件
        handleNo(index) {
            // 1.当用户输入完商品编号时，判断是否重复，如有重复，则提示客户并自动修改为不重复的商品编号
            const value = this.childProductArray[index].childProductNo;
            let isRepet;

            this.childProductArray.forEach((item, i) => {
                if (item.childProductNo === value && i !== index) {
                    isRepet = true;
                }
            });

            if (isRepet) {
                this.$message({
                    type: "warning",
                    message: "不允许输入重复的商品编号"
                });
                this.$set(
                    this.childProductArray[index],
                    "childProductNo",
                    this.makeProductNoNotRepet(index)
                );
            }
        },

        // 生成不重复的商品编号
        makeProductNoNotRepet(index) {
            let No;
            let i = index;
            let isRepet = true;
            while (isRepet) {
                No = this.defaultProductNo + i;
                isRepet = this.isProductNoRepet(No);
                i++;
            }
            return No;
        },

        // 商品编号判重
        isProductNoRepet(No) {
            const result = this.childProductArray.findIndex(item => {
                return item.childProductNo === No;
            });
            return result > -1;
        },

        // 打开设置框
        openBatch(type) {
            this.currentType = type;
            this.isSetListShow = false;
        },

        // 批量设置
        setBatch() {
            if (typeof this.batchValue === "string") {
                this.$message({
                    type: "warning",
                    message: "请输入正确的值"
                });
                return;
            }
            this.childProductArray.forEach(item => {
                if (item.isUse) {
                    item[this.currentType] = this.batchValue;
                }
            });
            this.cancelBatch();
        },

        // 取消批量设置
        cancelBatch() {
            this.batchValue = "";
            this.currentType = "";
            this.isSetListShow = true;
        },
        //上传成功的回调
        handleAvatarSuccess: function(res, file) {
            console.log(res.key);
            this.imageUrl = this.upload_qiniu_addr + res.key;
            console.log(this.imageUrl);
        },
        handleAvatarSuccess2: function(res, file) {
            console.log("ss")
            // console.log(index)
            console.log(index);
            // console.log(res)
            // childProductArray[index].specDrawing = this.upload_qiniu_addr + res.key;
            // this.row = this.upload_qiniu_addr + res.key;
            // console.log(this.row);
        },
        // 上传之前的回调
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        getQiniuToken: function() {
            const _this = this;
            axios
                .post(this.Global.dataUrl + "/api/v1/qiniu/token")
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
        }
    },

    created() {
        this.getQiniuToken();
    }
};
</script>
<style lang="scss">
* {
    list-style: none;
    padding: 0;
    border: 0;
}
#app-sku {
    .title {
        padding: 0 12px;
        line-height: 1;
        font-size: 18px;
        border-left: 4px solid #50bfff;
        color: #666;
        margin: 0 0 16px 0;
        font-weight: 400;
    }
    .example {
        margin-top: 50px;
        .code-area {
            width: 100%;
            min-height: 300px;
            box-sizing: border-box;
            padding: 20px;
            border: 2px dashed #c00;
            font-size: 14px;
            line-height: 1.6;
        }
    }
    .specification {
        display: inline-block;
        vertical-align: top;
        width: 480px;
        .spec-list {
            background-color: #fff;
            border: 1px solid #d8d8d8;
            padding: 10px;
            .item {
                margin-top: 5px;
                &:first-child {
                    margin-top: 0;
                }
                .name {
                    background: #f3f6fb;
                    padding: 2px 8px;
                    text-align: right;
                    overflow: hidden;
                    .el-input {
                        float: left;
                        width: 150px;
                    }
                    .icon {
                        display: none;
                        color: #929292;
                        cursor: pointer;
                        &:hover {
                            color: #880000;
                        }
                    }
                    &:hover {
                        .icon {
                            display: inline-block;
                        }
                    }
                }
                .values {
                    .el-tag {
                        margin: 8px 0 0 8px;
                    }
                    .add-attr {
                        display: inline-block;
                        vertical-align: top;
                        margin-top: 4px;
                        .el-input {
                            width: 200px;
                            margin: 2px 0 0 4px;
                        }
                    }
                }
            }
            .add-spec {
                font-size: 13px;
            }
        }
    }
    .stock-table {
        width: 840px;
        padding: 0;
        border-collapse: separate;
        border-color: #dfe6ec;
        border-style: solid;
        border-width: 1px 0 0 1px;
        background-color: #fff;
        td,
        th {
            padding: 4px 10px;
            border-bottom: 1px solid #dfe6ec;
            border-right: 1px solid #dfe6ec;
        }
        th {
            line-height: 30px;
            background-color: #eef1f6;
        }
        .link {
            cursor: pointer;
            color: #0088ee;
            font-size: 13px;
            margin-left: 6px;
        }
        .wh-foot {
            line-height: 30px;
            .label {
                display: inline-block;
                vertical-align: top;
            }
            .set-list {
                display: inline-block;
                vertical-align: top;
                font-size: 0;
                .set-item {
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 15px;
                    font-size: 13px;
                    cursor: pointer;
                    color: #0088ee;
                }
            }
            .set-form {
                display: inline-block;
                margin-left: 10px;
                .el-input {
                    display: inline-block;
                    width: 120px;
                }
                .set-btn {
                    display: inline-block;
                    padding: 0 2px;
                    font-size: 15px;
                    cursor: pointer;
                    &.blue {
                        color: #0088ee;
                    }
                    &.red {
                        color: #cc0000;
                    }
                }
            }
            .right {
                float: right;
            }
            .text {
                font-size: 13px;
            }
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
}
</style>
