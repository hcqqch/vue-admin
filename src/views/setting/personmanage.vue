<template>
    <section>
        <!--人员管理-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="formInline.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-select v-model="formInline.department_id" placeholder="部门">
                        <el-option
                            v-for="(item,i) in deptOptions"
                            :key="i"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="primary" @click="resetField">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="account" label="用户名" width sortable></el-table-column>
            <el-table-column prop="mobile" label="联系电话" width sortable></el-table-column>
            <el-table-column prop="department_name" label="所属部门" width sortable></el-table-column>
            <el-table-column prop="created_at" label="创建时间" width sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button @click="addEmployee" type>添加员工</el-button>
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="20"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>

        <el-dialog width="30%" title="添加人员" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.re_password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="form.department_id">
                        <el-checkbox
                            v-for="(item,i) in checkList"
                            :key="i"
                            :label="item.id"
                        >{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPerson">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {
    addEmployee,
    updateEmployee,
    getUpdateEmployee,
    getEmployeeList,
    delEmployee,
    getDeptList
} from "../../api/api";
export default {
    data() {
        return {
            tabPosition: "0",
            data: [],
            total: 0,
            page: 1,
            sels: [], //列表选中项
            form: {
                account: "",
                password: "",
                re_password: "",
                mobile: "",
                department_id: []
            },
            formInline: {
                name: "",
                department_id: ""
            },
            type: [],
            deptOptions: [],
            createtime: "",
            listLoading: false,
            formLabelWidth: "100px",
            dialogFormVisible: false,
            checkList: [],
            isEdit: false,
            formList: [],
            pid:""
        };
    },
    methods: {
        onSearch() {
            this.getEmployeeList();
        },
        resetField() {
            this.formInline = {};
        },
        handleEdit(id) {
            console.log(id);
            this.dialogFormVisible = true;
            this.isEdit = true;
            this.pid = id;
            const params = {
                id
            };
            getUpdateEmployee(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.form.account = data.account;
                    this.form.mobile = data.mobile;
                    if (data.department_id.length > 1) {
                        this.form.department_id = data.department_id
                            .split(",")
                            .map(Number);
                    } else {
                        this.form.department_id = [Number(data.department_id)];
                    }
                    // console.log(department_id) = [Number(data.department_id)]
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleDel(id) {
            const params = {
                id
            };
            delEmployee(params)
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
            this.getEmployeeList();
        },
        handleCurrentChange(val) {
            this.page = val;
        },
        addEmployee() {
            this.dialogFormVisible = true;
            this.isEdit = false;
            this.pid = ""
        },
        submitPerson() {
            this.dialogFormVisible = false;
            const params = {
                account: this.form.account,
                password: this.form.password,
                re_password: this.form.re_password,
                mobile: this.form.mobile,
                department_id: this.form.department_id.toString()
            };
            if (this.isEdit) {
                updateEmployee({...params,id:this.pid})
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
            } else {
                addEmployee(params)
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
            }
        },
        getDeptList() {
            getDeptList()
                .then(res => {
                    const data = res.data.data.data;
                    this.checkList = data;
                    this.deptOptions = data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getEmployeeList() {
            this.listLoading = true;
            const params = {
                name: this.formInline.name,
                department_id: this.formInline.department_id
            };
            getEmployeeList(params)
                .then(res => {
                    const data = res.data.data.data;
                    this.data = data.lists;
                    this.total = data.total;
                    this.listLoading = false;
                })
                .catch();
        }
    },
    mounted() {
        this.getDeptList();
        this.getEmployeeList();
    }
};
</script>

<style scoped>
</style>