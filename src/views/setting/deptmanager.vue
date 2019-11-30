<template>
    <!-- 部门管理 -->
    <section style="padding:20px">
        <div class="infoItem">部门管理</div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary">添加新部门</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="data"
            highlight-current-row
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="num" label="部门名称" width="" sortable></el-table-column>
            <el-table-column prop="createtime" label="职能说明" width="" sortable></el-table-column>
            <el-table-column label="操作" width="">
                <template>
                    <div>
                        <el-button size="small"></el-button>
                    </div>
                </template>
                <template scope="scope"> 
                    <el-button
                        size=""
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >权限</el-button>
                    <el-button
                        size=""
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                        size=""
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>
<script>
export default {
    data() {
        return {
            value2: "", //操作时间
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
            tableData: [
                {
                    date: "2016-05-02",
                    name: "1",
                    address: "1 1518 弄"
                }
            ],
            value: ""
        };
    },
    methods: {

    },
    mounted() {
        
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