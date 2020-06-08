<template>
	<view class="song-square">
		<TabMenu :tabs="tabs" @switchTab="switchTab"></TabMenu>
		<SongList :class="{'active': currentType === '全部'}" :songList="songList[currentType]" :horizontal="false" @scrollTop="scrollTop" />
		<SongList :class="{'active': currentType === '华语'}" :songList="songList[currentType]" :horizontal="false" @scrollTop="scrollTop" />
		<SongList :class="{'active': currentType === '欧美'}" :songList="songList[currentType]" :horizontal="false" @scrollTop="scrollTop" />
		<SongList :class="{'active': currentType === '日语'}" :songList="songList[currentType]" :horizontal="false" @scrollTop="scrollTop" />
		<SongList :class="{'active': currentType === '韩语'}" :songList="songList[currentType]" :horizontal="false" @scrollTop="scrollTop" />
	</view>
</template>

<script>
	import TabMenu from '@/components/TabMenu.vue'
	import SongList from '@/components/SongList.vue'
	export default {
		// name: 'songSquare',
		components: { TabMenu, SongList },
		data() {
			return {
				tabs: [{
					label: '全部',
					value: 0
				},{
					label: '华语',
					value: 7
				},{
					label: '欧美',
					value: 96
				},{
					label: '日语',
					value: 8
				},{
					label: '韩语',
					value: 16
				}],
				// songList: [],
				songList: {
					'全部': [],
					'华语': [],
					'欧美': [],
					'日语': [],
					'韩语': [],
				},
				currentType: '全部'
			}
		},
		mounted() {
			this.getSongs(this.currentType, 18)
			// uni.request({
			// 	url: `http://192.168.0.93:3000/playlist/catlist`,
			// 	method: 'get',
			// 	success: (res) => {
			// 		console.log(res, 'res')
			// 	}
			// })
		},
		methods: {
			switchTab(type) {
				this.currentType = type
				this.getSongs(type, 18)
			},
			getSongs(type, limit) {
				uni.request({
					url: `http://192.168.0.93:3000/top/playlist/highquality?limit=${limit}&cat=${type}`,
					method: 'get',
					success: (res) => {
						this.songList[type] = res.data.playlists || []
					}
				})
			},
			scrollTop() {
				console.log('get more song')
			},
			imageLoaded(e) {
				// console.log(e, 'eeee')
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
		
		/deep/.song-list-comp-y {
			flex: 1;
			display: flex;
			flex-direction: column;
			height: 100%;
			display: none;
			
			&.active {
				display: block;
			}
			.song-wrapper-y {
				flex: 1;
				height: 100%;
			}
		}
	}
</style>
