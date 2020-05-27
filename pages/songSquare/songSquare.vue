<template>
	<view class="song-square">
		<scroll-view scroll-x="true" class="scroll-menu" @scroll="scroll">
			<view class="menu-tab" v-for="(d, i) in tabs" :key="i" :class="{active: activeKey === d.value}"
			@click="switchTab(d.value)">{{d.label}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'songSquare',
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
				activeKey: 0
			}
		},
		methods: {
			switchTab(key) {
				this.activeKey = key
			},
			scroll() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/common.scss";
	.song-square {
		.scroll-menu {
			white-space: nowrap;
			.menu-tab {
				display: inline-block;
				font-size: 28rpx;
				font-weight: bold;
				padding: 16rpx 0;
				width: calc(100% / 5);
				text-align: center;
				color: #333;
				position: relative;
				
				&.active {
					color: $primaryColor;
				}
			}
		}
	}	
</style>
