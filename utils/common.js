export function setCount(value) {
				if (value.toString().length < 9) {
					return Math.floor(value/10000) + '万'
				} else {
					return Math.floor(value / 100000000) + '亿'
				}
			}