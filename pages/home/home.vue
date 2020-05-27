<template>
	<view class="content">
		<view class="swiper-wrapper">
			<swiper
				class="swiper"
				indicator-active-color="#ff2519"
				indicator-color="rgba(0,0,0,.2)"
				:indicator-dots="true"
				:circular="true"
				:autoplay="true"
				:interval="5000"
				:duration="300"
			>
				<swiper-item class="swiper-item-wrapper flex-box" v-for="(d, i) in swipers" :key="i">
					<view class="swiper-item flex-box"><img :src="d.imageUrl" alt="" /></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="main-bar flex-box">
			<view class="flex-item bar" v-for="(d, i) in contentBar" :key="i">
				<img :src="'/static/index/t_' + (i + 1) + '.png'" alt="" />
				<view class="title">{{ d.name }}</view>
			</view>
		</view>
		<SongList :songList="songList" :title="title" :link="url"/>
		<SongTab />
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SongList from '@/components/SongList.vue'
import SongTab from '@/components/SongTab.vue'

export default {
	name: 'home',
	components: {
		SongList, SongTab
	},
	data() {
		return {
			contentBar: [{ name: '每日推荐' }, { name: '歌单' }, { name: '排行榜' }, { name: '电台' }, { name: '直播' }],
			swipers: [],
			songList: [],
			title: '歌单广场',
			url: '/pages/songSquare/songSquare'
		};
	},
	onLoad() {
		uni.request({
			url: 'http://192.168.0.93:3000/banner',
			method: 'GET',
			success: (res) => {
				this.swipers = res.data.banners
			}
		})
		
		uni.request({
			url: 'http://192.168.0.93:3000/personalized?limit=6',
			method: 'GET',
			success: (res) => {
				this.songList = res.data.result
			}
		})
	},
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
		width: 100%;
		.swiper {
			height: calc( 100vw * 131 / 355);
		}
		
		.swiper-item-wrapper {
			padding: 20rpx;
	
			.swiper-item {
				height: 100%;
				background: #eee;
			
				img {
					max-width: 100%;
					border-radius: 12rpx;
				}
			}
		}
	}

	.main-bar {
		width: 100%;
		padding: 40rpx 32rpx;
		justify-content: space-between;

		.bar {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;

			.title {
				font-size: 26rpx;
				margin-top: 16rpx;
				color: #888;
			}
			img {
				display: block;
				width: 92rpx;
				height: 92rpx;
			}
		}
	}
}
</style>
