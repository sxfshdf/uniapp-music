<template>
	<view class="song-square">
		<TabMenu :tabs="tabs" @switchTab="switchTab"></TabMenu>
		<SongList :songList="songList" :horizontal="false" />
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
					label: '推荐',
					value: 0
				},{
					label: '华语',
					value: 7
				},{
					label: '欧美',
					value: 96
				},{
					label: '日本',
					value: 8
				},{
					label: '韩国',
					value: 16
				}],
				songList: []
			}
		},
		methods: {
			switchTab(value) {
				uni.request({
					url: `http://192.168.0.93:3000/top/playlist/highquality?limit=20`,
					method: 'get',
					success: (res) => {
						this.songList = res.data.playlists || []
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/common.scss";
	
	.song-square {
		overflow: auto;
	}
</style>
