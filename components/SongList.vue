<template>
	<view class="song-list-comp">
		<view class="title-wrapper">
			<view class="title">{{title}}</view>
			<navigator :url="link" class="show-more">歌单广场</navigator>
		</view>
		<scroll-view class="song-wrapper" scroll-x="true" :show-scrollbar=false  @scrolltolower="handleScroll">
			<view class="song" v-for="(d, i) in songList" :key="i">
				<img :src="d.picUrl" alt="">
				<view class="description">{{d.name}}</view>
				<view class="count">{{d.count}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			link: {
				type: String,
				default: ''
			},
			songList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				list: []
			}
		},
		methods: {
			handleScroll() {
				console.log('scroll right')
				uni.navigateTo({
					url: '../test/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.song-list-comp {
		width: 100%;
		padding: 0 20rpx;
		
		.song-wrapper {
			// display: flex;
			// flex-wrap: nowrap;
			white-space: nowrap;
			
			.song {
				width: 33%;
				flex-shrink: 0;
				padding-right: 20rpx;
				display: inline-block;
				
				// &:last-child {
				// 	padding-right: 0
				// }
				
				img {
					max-width: 100%;
					border-radius: 8rpx
				}
				
				.description {
					font-size: 20rpx;
					height: 32px;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-wrap: break-word;
					white-space: normal !important;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
