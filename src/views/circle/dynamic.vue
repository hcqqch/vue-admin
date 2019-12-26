<template>
    <!-- 动态管理 -->
    <section style="padding:20px">
        <div class="infoItem">商圈动态</div>
        <!--列表-->
        <el-table
            @selection-change="selsChange"
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="username" label="用户名" sortable></el-table-column>
            <el-table-column prop="created_at" label="发布时间" sortable></el-table-column>
            <el-table-column prop="title" label="标题" sortable></el-table-column>
            <el-table-column prop="thumb" label="图片" sortable>
                <template slot-scope="scope">
                    <img v-if="scope.row.thumb" :src="scope.row.thumb" alt />
                </template>
            </el-table-column>
            <el-table-column prop="video_url" label="视频" sortable>
                <template slot-scope="scope">
                    <video width="100px" :src="scope.row.video_url"></video>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" sortable></el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.is_publish==2"
                        size="small"
                        type
                        @click="handleOpt(scope.row.id,'up')"
                    >上架</el-button>
                    <el-button
                        v-if="scope.row.is_publish==1"
                        size="small"
                        type
                        @click="handleOpt(scope.row.id,'down')"
                    >下架</el-button>
                    <el-button size="small" type @click="handleOpt(scope.row.id,'top')">置顶</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleOpt(scope.row.id,'delete')"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-button @click="handleBatch('down')" type>下架</el-button>
            <el-button @click="handleBatch('up')" type>上架</el-button>
            <el-button @click="handleBatch('delete')" type>删除</el-button>
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="10"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>
    </section>
</template>

<script>
import { getDynamicList, circleOperate } from "../../api/api";
import axios from "axios";
import qs from "qs";

export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            listLoading: false,
            ids: []
        };
    },
    methods: {
        selsChange(val) {
            this.ids = [];
            val.map(item => {
                this.ids.push(item.id);
            });
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getDynamicList();
        },
        handleOpt(id, type) {
            const params = {
                ids:id,
                action: type
            };
            circleOperate(params)
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
                this.getDynamicList();
        },
        handleBatch(type){
            const params = {
                ids:this.ids.toString(),
                action: type
            };
            circleOperate(params)
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
                this.getDynamicList();
        },
        getDynamicList() {
            this.listLoading = true;
            getDynamicList()
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data.lists;
                    this.total = data.total;
                    this.listLoading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        }

    },
    mounted() {
        this.getDynamicList();
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
</style>