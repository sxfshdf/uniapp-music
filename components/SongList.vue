<template>
	<view class="song-list-comp" :class="{'song-list-comp-y': !horizontal}">
		<view class="title-wrapper">
			<view v-if="title" class="title">{{title}}</view>
			<navigator v-if="link" :url="link" class="show-more">查看更多</navigator>
		</view>
		<scroll-view v-if="horizontal" class="song-wrapper" scroll-x="true" :show-scrollbar=false  @scroll="handleScroll">
			<view class="song" v-for="(d, i) in songList" :key="i">
				<view class="image-wrapper">
					<image class="cover-image" mode="aspectFit" :src="d.picUrl || d.coverImgUrl" alt="" />
				</view>
				<view class="description">{{d.name}}</view>
				<view class="count">{{setCount(d.playCount)}}</view>
			</view>
		</scroll-view>
		<scroll-view v-else class="song-wrapper song-wrapper-y" scroll-y="true" :show-scrollbar=false  @scrolltolower="scrollTop" @scroll="handleScroll">
			<view class="song" v-for="(d, i) in songList" :key="i">
				<view class="image-wrapper">
					<image class="cover-image" mode="aspectFit" :src="d.picUrl || d.coverImgUrl" alt="" />
				</view>
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
			},
			horizontal: {
				type: Boolean,
				default: true
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
			handleScroll({detail}) {
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
			},
			scrollTop() {
				this.$emit('scrollTop')
			},
			imageLoaded(e) {
				this.$emit('imageLoaded', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.song-list-comp {
		width: 100%;
		padding: 0 20rpx;
		
		&.song-list-comp-y {
			padding-right: 0;
		}
		
		.song-wrapper {
			// display: flex;
			// flex-wrap: nowrap;
			white-space: nowrap;
			
			&.song-wrapper-y {
				height: 100%;
				white-space: normal;
				
				.song {
					margin-bottom: 32rpx;
					width: calc(100% / 3);
				}
			}
			
			.song {
				width: 33%;
				flex-shrink: 0;
				padding-right: 20rpx;
				display: inline-block;
				position: relative;
				// &:last-child {
				// 	padding-right: 0
				// }
				.image-wrapper {
					background: #fff;
					width: 100%;
					position: relative;
					overflow: hidden;
					border-radius: 12rpx;
					margin-bottom: 12rpx;
					
					&:after {
						content: '';
						display: block;
						margin-bottom: 100%;
					}
					
					.cover-image {
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
					}
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
