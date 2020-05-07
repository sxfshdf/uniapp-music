<template>
	<view class="content">
		<view class="swiper-wrapper">
			<swiper class="swiper" 
			indicator-active-color="#ff2519"
			indicator-color="rgba(0,0,0,.2)"
			:indicator-dots="true" 
			:circular="true" 
			:autoplay="true" 
			:interval="5000" 
			:duration="300">
				<swiper-item><view class="swiper-item uni-bg-red">A</view></swiper-item>
				<swiper-item><view class="swiper-item uni-bg-green">B</view></swiper-item>
				<swiper-item><view class="swiper-item uni-bg-blue">C</view></swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	components: {},
	data() {
		return {};
	},
	onLoad() {},
	computed: {
		...mapGetters(['isLogin'])
	},
	methods: {
		...mapMutations(['setLogin'])
	}
};
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.swiper-wrapper {
		padding: 20rpx;
		width: 100%;

		.swiper-item {
			height: 100%;
			background: #eee;
		}
		
	}
}
</style>
