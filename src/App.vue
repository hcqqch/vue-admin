<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	}
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	// background: #F2F2EC;
    // padding: 10px;
    // margin: 20px 0px;
	background: #f2f2f2;
	padding: 10px;
	border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

.el-icon-my-shop{
	width: 18px !important;
	height: 18px !important;
    background: url('./assets/shop.png') center no-repeat;
    background-size: cover;
}

.el-icon-my-goods{
	width: 18px !important;
	height: 18px !important;
    background: url('./assets/goods.png') center no-repeat;
    background-size: cover;
}

.el-icon-my-order{
	width: 18px !important;
	height: 18px !important;
    background: url('./assets/order.png') center no-repeat;
    background-size: cover;
}

.el-icon-my-markting{
	width: 18px !important;
	height: 18px !important;
    background: url('./assets/markting.png') center no-repeat;
    background-size: cover;
}

.el-icon-my-money{
	width: 18px !important;
	height: 18px !important;
    background: url('./assets/money.png') center no-repeat;
    background-size: cover;
}

.el-icon-my-data{
	width: 18px !important;
	height: 18px !important;
    background: url('./assets/data.png') center no-repeat;
    background-size: cover;
}

.el-icon-my-setting{
	width: 18px !important;
	height: 18px !important;
    background: url('./assets/setting.png') center no-repeat;
    background-size: cover;
}

.el-icon-my-circle{
	width: 18px !important;
	height: 18px !important;
    background: url('./assets/circle.png') center no-repeat;
    background-size: cover;
}
</style>