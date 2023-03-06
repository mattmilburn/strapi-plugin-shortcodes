'use strict';

module.exports = ( { strapi } ) => ( {
  async get() {
    return strapi.entityService
      .findMany( 'plugin::shortcodes.shortcode' )
      .then( results => results.reduce( ( acc, result ) => {
        [ result.shortcode ]: result.replacement,
      }, {} ) );
  },
} );
