<template>
    <section style="padding:20px">
        <div class="infoItem">商圈信息</div>
        <el-card shadow="always">
            <el-row>
                <el-col :span="12">
                    <div>商圈名称：{{name}}</div>
                </el-col>
                <el-col :span="12">
                    <div>创建时间：{{created_at}}</div>
                </el-col>
            </el-row>
        </el-card>

        <el-card style="margin-top:20px" shadow="always">
            <el-row>
                <el-col :span="3">
                    <div class>
                        <div class="des">成员数</div>
                        <div class="num">{{member}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">管理员</div>
                        <div class="num">{{admin}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">创建天数</div>
                        <div class="num">{{day}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">访问次数</div>
                        <div class="num">{{visit}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">商圈分享（次）</div>
                        <div class="num">{{share}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">商圈动态</div>
                        <div class="num">{{dynamic}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">动态转发量</div>
                        <div class="num">{{forward}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">文章转发量</div>
                        <div class="num">{{article_forward}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">商圈视频</div>
                        <div class="num">{{video}}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class>
                        <div class="des">视频转发量</div>
                        <div class="num">{{video_forward}}</div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="margin-top:20px" shadow="always">
            <el-row style="margin-top:20px;line-height:32px;">
                <el-col :span="24">
                    <div>商圈性质：{{type}}</div>
                </el-col>
                <el-col :span="24">
                    <div>所属行业：{{one_industry}}</div>
                </el-col>
                <el-col :span="24">
                    <div>所属地区：{{province_name}}{{city_name}}</div>
                </el-col>
                <el-col :span="24">
                    <div>商圈简介：{{descirption}}</div>
                </el-col>
            </el-row>
        </el-card>
    </section>
</template>

<script>
import { getCircle } from "../../api/api";
export default {
    data() {
        return {
            name:"",
            created_at:"",
            member:"",
            admin:"",
            day:"",
            visit:"",
            share:"",
            dynamic:"",
            forward:"",
            article_forward:"",
            video:"",
            video_forward:"",
            type:"",
            one_industry:"",
            province_name:"",
            city_name:"",
            descirption:""
        };
    },
    methods: {
        getCircle() {
            getCircle()
                .then(res => {
                    const data = res.data.data.data;
                    for(let prop in data){
                        if(this.hasOwnProperty(prop)){
                            this[prop] = data[prop]
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getCircle();
    }
};
</script>

<style lang="scss" scoped>
.el-col-3 {
    text-align: center;
}
.des {
    color: #666666;
    // font-size: 16px;
    padding: 10px;
}
.num {
    font-size: 24px;
}
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
</style>