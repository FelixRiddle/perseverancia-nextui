module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
				loader: 'babel-loader',
				options: {
						presets: [
							[
								'@babel/preset-env',
								{ targets: { node: 'current' } }
							],
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
		],
	},
};
