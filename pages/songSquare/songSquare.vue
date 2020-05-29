<template>
	<view class="song-square">
		<view ref="tabBar" class="tab-bar">
			<scroll-view scroll-x="true" :scroll-left="scrollLeft" class="scroll-menu" @scroll="scroll">
				<view :ref="'menuTab' + d.value" class="menu-tab" v-for="(d, i) in tabs" :key="i" :class="{active: activeKey === d.value}"
				@click="switchTab(d.value)">
					<view class="menu-content" :ref="'menuContent' + d.value">{{d.label}}</view>
				</view>
			</scroll-view>
			<view ref="activeLine" class="scroll-bar-acitve" />
			<view class="scroll-bar" />
		</view>
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
					label: '韩国asd',
					value: 16
				}],
				activeKey: 0,
				scrollLeft: 0
			}
		},
		mounted() {
			this.switchTab(0)
		},
		methods: {
			switchTab(key) {
				this.activeKey = key
				const refName = `menuTab${key}`
				const refContent = `menuContent${key}`
				let {width, left: tabLeft} = this.$refs[refName][0].$el.getBoundingClientRect()
				let {width: widthContent} = this.$refs[refContent][0].$el.getBoundingClientRect()
				this.$refs.activeLine.$el.style.left = `${tabLeft + (width - widthContent) / 2}px`
				// this.$refs.activeLine.$el.style.width = `${width}px`
				this.$refs.activeLine.$el.style.width = `${widthContent}px`
				this.scrollLeft = tabLeft
			},
			scroll({detail}) {
				let {scrollLeft} = detail
				const refContent = `menuContent${this.activeKey}`
				const refName = `menuTab${this.activeKey}`
				let {width, left: tabLeft} = this.$refs[refName][0].$el.getBoundingClientRect()
				let {width: widthContent} = this.$refs[refContent][0].$el.getBoundingClientRect()
				this.$refs.activeLine.$el.style.left = `${tabLeft + (width - widthContent) / 2}px`
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/common.scss";
	.song-square {
		.tab-bar {
			position: relative;
			
			.scroll-bar {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 4rpx;
				background: rgba(0,0,0,.1);
			}
			
			.scroll-bar-acitve {
				position: absolute;
				bottom: 0;
				height: 4rpx;
				background: $primaryColor;
				transition: all 0.1s linear;
			}
			.scroll-menu {
				white-space: nowrap;
				.menu-tab {
					flex: 1;
					display: inline-block;
					font-size: 28rpx;
					font-weight: bold;
					padding: 16rpx 0;
					width: calc(100% / 5);
					text-align: center;
					color: #333;
					position: relative;
					transition: all 0.1s linear;
					
					&.active {
						color: $primaryColor;
					}
					.menu-content {
						display: inline-block;
						padding: 0 8rpx;
					}
				}
			}
			
		}
	}	
</style>
