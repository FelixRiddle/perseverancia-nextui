/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/apps',
				permanent: true,
			},
		]
	}
}

module.exports = nextConfig
