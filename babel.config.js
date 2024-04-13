module.exports = {
	plugins: ["@babel/plugin-transform-strict-mode"],
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					chrome: "37", // Set the target version to Chrome 43 or an appropriate version
				},
				useBuiltIns: "entry", // Use entry for better polyfill targeting
				corejs: 3, // Use Core.js 3
			},
		],
	],
};
