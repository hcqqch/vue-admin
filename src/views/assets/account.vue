<template>
    <section style="padding:20px">
        <div class="infoItem">账户总览</div>

        <el-row :gutter="12">
            <el-col :span="8">
                <el-card class="larger" shadow="always">可用店铺余额：8000元</el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="larger" shadow="always">待结算额：0元</el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="larger" shadow="always">保证金：0元</el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12" style="margin-top:20px">
            <el-col :span="24">
                <el-card class="larger" shadow="always">总收入</el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12" style="margin-top:20px">
            <el-col :span="24">
                <el-card class="larger" shadow="always">佣金支出</el-card>
            </el-col>
        </el-row>
    </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.infoItem {
    width: 99%;
    padding: 10px;
    background: #f2f2f2;
    margin-bottom: 20px;
}
.larger {
    font-size: 18px;
    line-height: 36px;
}
</style>
