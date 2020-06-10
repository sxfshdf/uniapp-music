<template>
	<!-- <view class="song-square"> -->
		<view ref="tabBar" class="tab-bar">
			<scroll-view scroll-x="true" :scroll-left="scrollLeft" :scroll-with-animation="true" class="scroll-menu" @scroll="scroll">
				<view :ref="'menuTab' + d.value" class="menu-tab" v-for="(d, i) in tabs" :key="i" :class="{active: activeKey === d.value}"
				@click="switchTab(i, d.value, d.label)">
					<view class="menu-content" :ref="'menuContent' + d.value">{{d.label}}</view>
				</view>
			</scroll-view>
			<view ref="activeLine" class="scroll-bar-acitve" :class="{'transition':clickTab}" />
			<view class="scroll-bar" />
		</view>
	<!-- </view> -->
</template>

<script>
	export default {
		name: 'TabMenu',
		props: ['tabs', 'currentTab'],
		data() {
			return {
				activeKey: 0,
				scrollLeft: 0,
				old: {
					scrollLeft: 0
				},
				query: null,
				silderBarWidth: 0,
				lastIndex: 0,
				clickTab: false
			}
		},
		mounted() {
			this.query = uni.createSelectorQuery().in(this)
			this.query.select('.scroll-bar').boundingClientRect(data => {
				this.silderBarWidth = data.width
			})
			this.switchTab(0, 0, '全部')
		},
		methods: {
			getElements(name) {
				let elements
				this.query.selectAll(name).boundingClientRect(data => {
					elements = data
				}).exec()
				return elements || []
			},
			switchTab(index, key, label) {
				this.clickTab = true
				const els = this.getElements('.menu-tab')
				const tabsWidth = els.reduce((acc, cur) => acc + cur.width, 0)
				this.activeKey = key
				const refName = `menuTab${key}`
				const refContent = `menuContent${key}`
				let {width, left: tabLeft} = this.$refs[refName][0].$el.getBoundingClientRect()
				let {width: widthContent} = this.$refs[refContent][0].$el.getBoundingClientRect()
				if (index === 3) {
					this.$refs.activeLine.$el.style.left = `${this.silderBarWidth / 2 - (width - widthContent) / 2}px`
					this.scrollLeft = width / 2
				} else if (index > 3 && index < this.tabs.length - 3) {
					this.$refs.activeLine.$el.style.left = `${this.silderBarWidth / 2 - (width - widthContent) / 2}px`
					this.scrollLeft = this.scrollLeft > width / 2 ? width / 2 + (index - 3)*width : this.scrollLeft + width
				} else if (index < 3) {
					if (this.scrollLeft === 0) {
						this.$refs.activeLine.$el.style.left = `${tabLeft + (width - widthContent) / 2}px`
					}
					this.scrollLeft = 0
				} else {
					this.scrollLeft = this.scrollLeft + width
					if (this.lastIndex < this.tabs.length - 3) {
						this.$refs.activeLine.$el.style.left = `${tabLeft - 41 - (index - this.lastIndex)*36 + (width - widthContent) / 2}px`
					} else {
						this.$refs.activeLine.$el.style.left = `${tabLeft + (width - widthContent) / 2}px`
					}
				}
				this.$refs.activeLine.$el.style.width = `${widthContent}px`
				this.$emit('switchTab', {key, label})
				this.lastIndex = index
			},
			scroll({detail}) {
				let {scrollLeft} = detail
				this.scrollLeft = scrollLeft
				const refContent = `menuContent${this.activeKey}`
				const refName = `menuTab${this.activeKey}`
				let {width, left: tabLeft} = this.$refs[refName][0].$el.getBoundingClientRect()
				let {width: widthContent} = this.$refs[refContent][0].$el.getBoundingClientRect()
				this.$refs.activeLine.$el.style.left = `${tabLeft + (width - widthContent) / 2}px`
				setTimeout(() => {
					this.clickTab = false
				}, 10)
				
			}
		},
		watch: {
			currentTab: {
				handler(val) {
					this.switchTab(val.index, val.key, val.type)
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/common.scss";
	
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
			
			&.transition {
				transition: all linear 0.15s;
			}
		}
		.scroll-menu {
			white-space: nowrap;
			.menu-tab {
				flex: 1;
				display: inline-block;
				font-size: 28rpx;
				line-height: 36rpx;
				font-weight: bold;
				padding: 16rpx 32rpx;
				min-width: 128rpx;
				// width: calc(100% / 6);
				text-align: center;
				color: #333;
				position: relative;
				transition: all linear 0.15s;
				
				&.active {
					color: $primaryColor;
				}
				.menu-content {
					display: inline-block;
					padding: 0 4rpx;
				}
			}
		}
	}
</style>
