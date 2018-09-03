/*
 *
 * settings.js
 *
 * Keeping our settings across multiple imports 🎛
 *
 */


/**
 * Keeping our settings across multiple imports
 *
 * @type {Object}
 */
const SETTINGS = {
	/**
	 * The default settings
	 *
	 * @type {Object}
	 */
	defaults: {
		tileSize: 16,
		frameRate: 4,
		assetPaths: {
			images: '/assets/img/'
		},
	},


	/**
	 * Getting our settings
	 *
	 * @returns {object} - The settings object
	 */
	get: () => SETTINGS.defaults,


	/**
	 * Merge with default settings
	 *
	 * @param   {object} newSettings - The new settings object to be merged
	 *
	 * @returns {object}             - Our new settings
	 */
	set: ( newSettings ) => {
		if( newSettings ) {
			SETTINGS.default = newSettings;
			return SETTINGS.default;
		}

		return SETTINGS.get();
	},
};


module.exports = SETTINGS;
