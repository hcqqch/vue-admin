<template>
    <!-- 操作日志 -->
    <section style="padding:20px">
        <div class="infoItem">操作日志</div>
        <el-row>
            <el-col style="margin-bottom:20px" :span="24">
                操作时间：
                <el-date-picker
                    style="margin-right:20px"
                    v-model="effectiveTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                ></el-date-picker>操作人
                <el-select v-model="operator" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.account"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-button @click="onSearch" type="primary">查询</el-button>
                <el-button @click="resetField" type="primary">重置</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="username" label="用户" width sortable></el-table-column>
            <el-table-column prop="ip" label="IP地址" width sortable></el-table-column>
            <el-table-column prop="content" label="详情" width sortable></el-table-column>
            <el-table-column prop="created_at" label="操作时间" width sortable></el-table-column>
            <el-table-column label="操作" width>
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button @click="handleBatchDel" type>批量删除</el-button>
            <el-button @click="handleClearLog" type>清空日志</el-button>
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="20"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>
    </section>
</template>
<script>
import { getLoglist, getEmployeeList, delLog } from "../../api/api";
import utils from "@/common/js/util";
import cancelrateVue from "../data/cancelrate.vue";

export default {
    data() {
        return {
            effectiveTime: "", //操作时间
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            options: [],
            operator: "",
            total: 0,
            page: 1,
            tableData: [],
            listLoading: false,
            ids: []
        };
    },
    methods: {
        onSearch() {
            this.getLoglist();
        },
        resetField() {
            this.effectiveTime = "";
            this.operator = "";
        },
        handleCurrentChange(val) {
            this.page = val;
        },
        selsChange(val) {
            this.ids = [];
            val.map(item => {
                this.ids.push(item.id);
            });
        },
        handleDel(id) {
            const params = {
                ids: id,
                action:"delete"
            };
            delLog(params)
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
            this.getLoglist();
        },
        handleBatchDel() {
            const params = {
                ids: this.ids.toString(),
                action: "delete"
            };
            delLog(params)
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
                    this.getLoglist();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleClearLog() {
            const params = {
                action: "all"
            };
            delLog(params)
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
            this.getLoglist();
        },
        getEmployeeList() {
            getEmployeeList()
                .then(res => {
                    const data = res.data.data.data;
                    this.options = data.lists;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getLoglist() {
            let start_time = "";
            let end_time = "";
            if (this.effectiveTime) {
                start_time = utils.formatDate.format(
                    this.effectiveTime[0],
                    "yyyy-MM-dd hh:mm:ss"
                );
                end_time = utils.formatDate.format(
                    this.effectiveTime[1],
                    "yyyy-MM-dd hh:mm:ss"
                );
            }
            const params = {
                start_time,
                end_time,
                uid: this.operator
            };
            this.listLoading = true;
            getLoglist(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.tableData = data.lists;
                    this.listLoading = false;
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getLoglist();
        this.getEmployeeList();
    }
};
</script>
<style lang="scss" scoped>
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>