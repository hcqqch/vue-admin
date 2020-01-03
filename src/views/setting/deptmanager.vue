<template>
    <!-- 部门管理 -->
    <section style="padding:20px">
        <div class="infoItem">部门管理</div>
        <el-row>
            <el-col :span="24">
                <el-button @click="addNewDept" type="primary">添加新部门</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            highlight-current-row
            v-loading="listLoading"
            style="width: 100%;"
        >
            <el-table-column prop="name" label="部门名称" width sortable></el-table-column>
            <el-table-column prop="desc" label="职能说明" width sortable></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type @click="handlePer(scope.row.id)">权限</el-button>
                    <el-button size="mini" type @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog width="30%" title="添加新部门" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="部门名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="职能说明" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.desc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitDept">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog width="30%" title="选择权限" :visible.sync="dialogFormVisible2">
            <el-tree
                ref="tree"
                default-expand-all
                :data="treedata"
                :props="defaultProps"
                node-key="id"
                :default-checked-keys="defaultCheckList"
                @node-click="handleNodeClick"
                @check-change="handleCheckChange"
                show-checkbox
            ></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="sumitPermission">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import {
    getDeptList,
    getPermission,
    addDept,
    addPermission,
    updateDept,
    delDept,
    getUpdateDept
} from "../../api/api";

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
            tableData: [],
            form: {
                name: "",
                desc: ""
            },
            radio: "",
            listLoading: "",
            value: "",
            formLabelWidth: "100px",
            dialogFormVisible: false,
            dialogFormVisible2: false,
            treedata: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            checkList: [],
            pid: "",
            defaultCheckList: [],
            isEdit: false,
            editId: ""
        };
    },
    methods: {
        addNewDept() {
            this.dialogFormVisible = true;
            this.isEdit = false;
            this.form = {};
        },
        getDeptList() {
            getDeptList()
                .then(res => {
                    const data = res.data.data.data;
                    this.tableData = data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getPermission() {
            const params = {
                id: this.pid
            };
            getPermission(params)
                .then(res => {
                    const data = res.data.data;
                    this.treedata = data.data;
                    if (data.get.roles) {
                        this.defaultCheckList = data.get.roles.split(",");
                        this.defaultCheckList = this.defaultCheckList.map(
                            Number
                        );
                    }else{
                        this.defaultCheckList = [];
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleNodeClick(val) {
            // console.log(val)
            const name = resizeBy();
        },
        handleCheckChange() {
            let res = this.$refs.tree.getCheckedNodes();
            let arr = [];
            res.forEach(item => {
                arr.push(item.id);
            });
            this.checkList = arr;
        },
        handlePer(id) {
            this.dialogFormVisible2 = true;
            this.pid = id;
            this.getPermission();
        },
        handleEdit(id) {
            this.dialogFormVisible = true;
            this.isEdit = true;
            this.editId = id;
            const params = {
                id
            };
            getUpdateDept(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.form.name = data.name;
                    this.form.desc = data.desc;
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleDel(id) {
            const params = {
                id
            };
            delDept(params)
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
                this.getDeptList();
        },
        // 添加部门
        submitDept() {
            const params = {
                id: this.editId,
                name: this.form.name,
                desc: this.form.desc
            };
            if (this.isEdit) {
                updateDept(params)
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
                        this.dialogFormVisible = false;
                        this.getDeptList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                addDept(params)
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
                        this.dialogFormVisible = false;
                        this.getDeptList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        // 编辑权限
        sumitPermission() {
            this.dialogFormVisible2 = false;
            const params = {
                id: this.pid,
                ids: this.checkList.toString()
            };
            addPermission(params)
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
        this.getDeptList();
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