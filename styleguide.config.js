const path = require('path');
module.exports  = {
	template: {
		head:{
			links: [
				{
					rel: 'stylesheet',
					href:'./examples/dropdown.css'
				}
			],
		}
	},
	skipComponentsWithoutExample:true,
	components: 'src/**/[A-Z]*.js',
	ribbon: {
		// Link to open on the ribbon click (required)
		url: 'https://gecgithub01.walmart.com/a0s01j1/smart-components',
		// Text to show on the ribbon (optional)
		text: 'Fork me on GitHub'
	},
	usageMode:'expand',
	require: [path.resolve(__dirname, 'styleguide.setup.js')],
	getComponentPathLine(componentPath) {
		// const name = path.basename(componentPath, '.js')
		// const dir = path.dirname(componentPath)
		// console.log('import', `${name} from '${dir}/${name}`);
		// return `import ${name} from '${dir}/${name}';`
	},

	getExampleFilename(componentPath) {
		const name = path.basename(componentPath, '.js');
		return path.resolve(__dirname +'/examples',`${name}.examples.md`);
	},
	webpackConfig: {
		module: {
			rules: [
				// Babel loader, will use your project’s .babelrc
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				// Other loaders that are needed for your components
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader?modules'
				}
			]
		}
	}

}
