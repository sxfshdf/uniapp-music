<template>
	<view class="song-tab-wrapper">
		<view class="tab-wrapper flex-box">
			<view class="tab-item-wrapper flex-box">
				<view class="tab-item" :class="{active: activeKey === 1}" @click="activeKey = 1">新碟</view>
				<view class="separation">|</view>
				<view class="tab-item" :class="{active: activeKey === 2}" @click="activeKey = 2">新歌</view>
			</view>
			<template v-if="activeKey === 1">
				<navigator class="show-more">更多新碟</navigator>
			</template>
			<template v-if="activeKey === 2">
				<navigator class="show-more">更多新歌</navigator>
			</template>
		</view>
		<scroll-view scroll-x="true" class="scroll-wrapper" :scroll-left="scrollLeft" @scroll="handleScroll">
			<template v-if="activeKey === 1">
				<view v-for="(item, index) in list" :key="index" class="scroll-item-wrapper">
					<view class="scroll-item flex-box" v-for="(d, i) in item" :key="i">
						<view class="song-pic">
							<img :src="d.blurPicUrl" alt="">
						</view>
						<view class="song-info flex-box">
							<view class="name">{{d.name}}</view>
							<view class="artists">{{arrToString(d.artists)}}</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view v-for="(item, index) in list" :key="index" class="scroll-item-wrapper">
					<view class="scroll-item flex-box" v-for="(d, i) in item" :key="i">
						<view class="song-pic">
							<img :src="d.album && d.album.blurPicUrl" alt="">
						</view>
						<view class="song-info flex-box">
							<view class="name">{{d.name}}</view>
							<view class="artists">{{arrToString(d.artists)}}</view>
						</view>
					</view>
				</view>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'SongTab',
		data() {
			return {
				activeKey: 1,
				list: [],
				scrollLeft: 0,
			}
		},
		created() {
			this.getListData(1)
			this.getLatestSongs()
		},
		mounted() {
			const imgs = document.getElementsByTagName('img')
			console.log(imgs, 'imgs')
		},
		methods: {
			arrToString(arr) {
				if (!Array.isArray(arr) || !arr.length) return
				let name = ''
				arr.forEach((item, index) => {
					if (index === (arr.length - 1)) {
						name = name + item.name 
					} else {
						name = name + item.name + ' | '
					}
				})
				return name
			},
			getListData(type) {
				switch(type) {
					case 1:
						this.getAlbums()
						break
					case 2:
						this.getLatestSongs()
				}
			},
			
			getAlbums() {
				uni.request({
					url: 'http://192.168.0.93:3000/top/album?offset=0&limit=6',
					method: 'GET',
					success: (res) => {
						let first = res.data.albums.slice(0,3)
						let second = res.data.albums.slice(3,6)
						this.list = [first, second]
					}
				})
			},
			getLatestSongs() {
				uni.request({
					url: 'http://192.168.0.93:3000/top/song?type=0',
					method: 'GET',
					success: (res) => {
						let first = res.data.data.slice(0,3)
						let second = res.data.data.slice(3,6)
						this.list = [first, second]
					}
				})
			},
			handleScroll(event) {
				this.scrollLeft = event.detail.scrollLeft
			}
		},
		watch: {
			activeKey(val) {
				this.getListData(val)
				this.scrollLeft = 0
			}
		}
	}
</script>
	
<style lang="scss" scoped>
	@import '@/common/css/mixins.scss';
	.song-tab-wrapper {
		width: 100%;
		padding: 20rpx;
		
		.tab-wrapper {
			justify-content: space-between;
			
			.tab-item-wrapper {
				.tab-item {
					font-size: 28rpx;
					padding: 20rpx 20rpx 20rpx 0;
					color: #888;
					
					&:last-child {
						padding-right: 0;
						padding: 20rpx 0 20rpx 20rpx;
					}
					
					&.active {
						font-size: 32rpx;
						color: #333;
						font-weight: bold;
					}
				}
				
				.separation {
					font-size: 32rpx;
					line-height: 1;
					color: #888;
				}
			}
		}
		.scroll-wrapper {
			white-space: nowrap;
			
			.scroll-item-wrapper {
				display: inline-block;
				width: 100%;
				
				&:last-child {
					margin-left: -20rpx;
				}
				.scroll-item {
					justify-content: unset;
					padding: 12rpx 16rpx 12rpx 0;
					
					.song-pic {
						width: calc(100vw / 5);
						height: calc(100vw / 5);
						line-height: 1;
						flex-shrink: 0;
						img {
							max-width: 100%;
							border-radius: 8rpx;
						}
					}
					
					.song-info {
						flex-direction: column;
						align-items: flex-start;
						padding: 0 12rpx;
						width: 100%;
						
						.name {
							@include singleLineHidden(90%);
							font-size: 32rpx;
							margin-bottom: 8rpx;
						}
						
						.artists {
							@include singleLineHidden(90%);
							font-size: 26rpx;
							color: #999;
						}
					}
				}
			}
		}
	}
	
</style>
