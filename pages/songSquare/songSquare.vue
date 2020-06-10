<template>
	<view class="song-square">
		<TabMenu :tabs="tabs" @switchTab="switchTab" :currentTab="currentTab"></TabMenu>
		<!-- <mescroll-uni ref="mescrollRef" top="78" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="song-list-long-wrapper">
				<view v-for="(d, i) in types" :key="i">
					<view>{{d.name}}</view>
				</view>
			</view>
		</mescroll-uni> -->
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<!--全部 -->
			<swiper-item v-for="(d, i) in tabs" :key="i">
				<mescroll-item :downOption="downOption" :upOption="upOption" :i="i" :index="tabIndex" :tabs="tabs" @down="downCallback" @up="upCallback">
					<template v-slot:content>
						<!-- <view class="list-long-wrapper"> -->
							<LongList :list="songList[currentType]"></LongList>
							<!-- <view class="list-item-wrapper" v-for="(d, i) in songList[d.label]" :key="i">
								<view class="image-wrapper">
									<img class="image" :src="d.coverImgUrl" alt="">
								</view>
								<view class="title">{{d.name}}</view>
								<!-- <view class="description">{{d.description}}</view> -->
								<!-- <view class="count">{{setCount(d.playCount)}}</view> -->
							<!-- </view> -->
						<!-- </view> -->
					</template>
				</mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import TabMenu from '@/components/TabMenu.vue'
	import LongList from '@/components/LongList.vue'
	import MescrollItem from "@/components/mescroll-uni/mescroll-swiper-item.vue"
	export default {
		name: 'songSquare',
		components: { TabMenu, MescrollItem, LongList },
		data() {
			return {
				tabs: [{
					label: '全部',
					value: 0
				},{
					label: '华语',
					value: 1
				},{
					label: '欧美',
					value: 2
				},{
					label: '日语',
					value: 3
				},{
					label: '韩语',
					value: 4
				},{
					label: '影视原声',
					value: 5
				},{
					label: '古典',
					value: 6
				},{
					label: '流行',
					value: 7
				}],
				tabIndex: 0,
				// songList: [],
				songList: {
					'全部': [],
					'华语': [],
					'欧美': [],
					'日语': [],
					'韩语': [],
					'影视原声': [],
					'古典': [],
					'流行': []
				},
				currentType: '全部',
				currentTab: {
					index: 0,
					key: 0,
					type: '',
				},
				types: [],
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
				},
				height: '100%',
				top: '78'
			}
		},
		mounted() {
			this.getSongs(this.currentType, 18).then(data => {
				this.songList[this.currentType] = data.data.playlists
			})
			uni.request({
				url: `http://192.168.0.93:3000/playlist/catlist`,
				method: 'get',
				success: (res) => {
					// console.log(res, 'res')
				}
			})
		},
		methods: {
			upCallback(mescroll) {
				const type = this.currentType
				const list = this.songList[type]
				const timeStamp = list.length && mescroll.num !== 1? list[list.length - 1].updateTime : ''
				this.getSongs(type, 18, timeStamp).then(data => {
					if (mescroll.num === 1) this.songList[type] = []
					this.songList[type] = this.songList[type].concat(data.data.playlists)
					mescroll.endSuccess(data.data.playlists.length, data.data.more)
				})
			},
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			switchTab(options) {
				this.tabIndex = options.key
				this.currentType = options.label
			},
			getSongs(type, limit, timeStamp = '') {
				return new Promise((resolve, reject) => {
					uni.request({
						url: `http://192.168.0.93:3000/top/playlist/highquality?limit=${limit}&cat=${type}&before=${timeStamp}`,
						method: 'get',
					}).then(res => {
						let [error, data] = res
						resolve(data)
					}).catch(e => {
						reject(e)
					})
				})
			},
			scrollTop() {
				console.log('get more song')
			},
			imageLoaded(e) {
				// console.log(e, 'eeee')
			},
			swiperChange({detail}) {
				this.tabIndex = detail.current
				let type
				this.tabs.forEach(tab => {
					if (tab.value === detail.current) {
						type = tab.label
					}
				})
				this.currentTab.index = detail.current
				this.currentTab.key = detail.current
				this.currentTab.type = type
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/common.scss";
	
	.song-square {
		width: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 0;
		height: calc(100% - 44px);
	}
</style>
