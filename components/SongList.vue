<template>
	<view class="song-list-comp">
		<view class="title-wrapper">
			<view class="title">{{title}}</view>
			<navigator :url="link" class="show-more">查看更多</navigator>
		</view>
		<scroll-view class="song-wrapper" scroll-x="true" :show-scrollbar=false  @scroll="handleScroll">
			<view class="song" v-for="(d, i) in songList" :key="i">
				<img :src="d.picUrl" alt="">
				<view class="description">{{d.name}}</view>
				<view class="count">{{setCount(d.playCount)}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'SongList',
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
		mounted() {
			this.songList.forEach(song => {
				console.log(song.playCount.length)
			})
		},
		methods: {
			handleScroll(event) {
				// uni.navigateTo({
				// 	url: '../test/index'
				// })
			},
			setCount(value) {
				if (value.toString().length < 9) {
					return Math.floor(value/10000) + '万'
				} else {
					return Math.floor(value / 100000000) + '亿'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
				position: relative;
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
				
				.count {
					position: absolute;
					color: #fff;
					font-size: 20rpx;
					top: 8rpx;
					right: 32rpx;
				}
			}
		}
		.title-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 16rpx;
			.title {
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}
</style>
