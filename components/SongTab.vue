<template>
	<view class="song-tab-wrapper">
		<view class="tab-wrapper flex-box">
			<view class="tab-item-wrapper flex-box">
				<view class="tab-item" :class="{active: activeKey === 1}" @click="clickTab(1)">新碟</view>
				<view class="separation">|</view>
				<view class="tab-item" :class="{active: activeKey === 2}" @click="clickTab(2)">新歌</view>
			</view>
			<template v-if="activeKey === 1">
				<navigator class="show-more" :url="link">更多新碟</navigator>
			</template>
			<template v-if="activeKey === 2">
				<navigator class="show-more" :url="link">更多新歌</navigator>
			</template>
		</view>
		<scroll-view scroll-x="true" class="scroll-wrapper" :scroll-left="scrollLeft" @scroll="handleScroll">
			<template v-if="activeKey === 1">
				<view v-for="(item, index) in newAlbumList" :key="index" class="scroll-item-wrapper">
					<view class="scroll-item flex-box" v-for="d in item" :key="d.id">
						<view class="song-pic new-album">
							<img :src="d.blurPicUrl" alt="">
						</view>
						<view class="song-info flex-box new-album">
							<view class="name">{{d.name}}</view>
							<view class="artists">{{arrToString(d.artists)}}</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view v-for="(item, index) in newSongList" :key="index" class="scroll-item-wrapper">
					<view class="scroll-item flex-box" v-for="d in item" :key="d.id">
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
		props: {
			link: {
				type: String,
			}
		},
		data() {
			return {
				activeKey: 1,
				newSongList: [],
				newAlbumList: [],
				scrollLeft: 0,
			}
		},
		created() {
			this.getListData(1)
		},
		methods: {
			clickTab(key) {
				this.activeKey = key
			},
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
			// 新碟
			getAlbums() {
				if (!this.newAlbumList.length) {
					uni.request({
						url: 'http://192.168.0.93:3000/top/album?offset=0&limit=6',
						method: 'GET',
						success: (res) => {
							let first = res.data.albums.slice(0,3)
							let second = res.data.albums.slice(3,6)
							this.newAlbumList = [first, second]
						}
					})
				}
			},
			// 新歌
			getLatestSongs() {
				if (!this.newSongList.length) {
					uni.request({
						url: 'http://192.168.0.93:3000/top/song?type=0',
						method: 'GET',
						success: (res) => {
							let first = res.data.data.slice(0,3)
							let second = res.data.data.slice(3,6)
							this.newSongList = [first, second]
						}
					})
				}
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
	@import "@/common/css/common.scss";
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
			min-height: 200rpx;
			
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
						position: relative;
						background: #fff;
						img {
							max-width: 100%;
							border-radius: 8rpx;
						}
						
						&.new-album {
							&:after {
								@include baseAfter(100%, 100%);
								right: -20rpx;
								top: 0;
								border-radius: 100%;
								background: #000;
								z-index: -2;
							}
							&:before {
								@include baseAfter(90%, 90%);
								top: 50%;
								transform: translateY(-50%);
								right: -10rpx;
								border: 2rpx solid #ccc;
								border-radius: 4rpx;
								background: rgba(255,255,255,.2);
								z-index: -1;
							}
							
						}
					}
					
					.song-info {
						flex-direction: column;
						align-items: flex-start;
						padding: 0 12rpx;
						width: 72%;
						
						&.new-album {
							padding: 0 12rpx 0 32rpx;
						}
						
						.name {
							@include singleLineHidden(100%);
							font-size: 32rpx;
							margin-bottom: 8rpx;
						}
						
						.artists {
							@include singleLineHidden(100%);
							font-size: 26rpx;
							color: #999;
						}
					}
				}
			}
		}
	}
	
</style>
