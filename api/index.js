import request from '../utils/index.js'

console.log(request.request, 'request')

export function getBanner(data) {
	return request.request({
		url: '/banner',
		method: 'GET',
		data,
		authType: 'None'
	})
}
