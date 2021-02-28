// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	workspaceRoot: '../../',
	buildOptions: {
		metaUrlPath: 'snowpack' // GitHub Pages ignores _snowpack
	}
};
