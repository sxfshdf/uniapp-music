<template>
	<view class="list-long-wrapper">
		<view class="list-item-wrapper" v-for="(d, i) in list" :key="i">
			<view class="image-wrapper">
				<img class="image" :src="d.coverImgUrl" alt="">
			</view>
			<view class="title">{{d.name}}</view>
			<!-- <view class="description">{{d.description}}</view> -->
			<view class="count">{{setCount(d.playCount)}}</view>
		</view>
	</view>
</template>

<script>
	import {setCount} from '@/utils/common.js'
	export default {
		props: ['list'],
		methods: {
			setCount,
		}
	}
</script>

<style lang="scss" scoped>
	.list-long-wrapper {
		display: flex;
		flex-wrap: wrap;
		padding-left: 20rpx;
		
		.list-item-wrapper {
			width: calc(100% / 3);
			flex-shink: 0;
			padding: 24rpx 20rpx 20rpx 0;
			position: relative;
			
			.image-wrapper {
				background: #fff;
				width: 100%;
				position: relative;
				overflow: hidden;
				border-radius: 8rpx;
				margin-bottom: 12rpx;
				
				&:after {
					content: '';
					margin-bottom: 100%;
					display: block;
				}
				
				img {
					position: absolute;
					top: 0;
					left: 0;
					max-width: 100%
				}
			}
			.title {
				font-size: 28rpx;
				width: 100%;
				line-height: 1.5;
				height: 84rpx;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
				word-wrap: break-word;
				word-break: break-all;
			}
			.count {
				position: absolute;
				color: #fff;
				font-size: 20rpx;
				top: 32rpx;
				right: 32rpx;
			}
		}
	}
</style>
