const path=require("path")
const hotMiddlewareSrcipt='webpack-hot-middleware/client?path=/__webpack_hmr&reload=true'
const webpack=require("webpack")

module.exports={
	entry:{
		index:['./src/pages/app.js',hotMiddlewareSrcipt]
	},
	output:{
		path:path.join(__dirname,'./public/javascripts'),
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				query:{
					presets:['react','es2015']
				}
			},
			{
	        	test: /\.(jpg|png|otf)$/, 
	        	loader: "url-loader?limit=8192"
	        },
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.scss$/,
				loader:'style-loader!css-loader!sass-loader'
			}
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]/*,
	devServer:{
		historyApiFallback:true,
		inline:true,
		hot:true
	}*/
}