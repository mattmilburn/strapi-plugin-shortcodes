'use strict';

const has = require( 'lodash/has' );
const head = require( 'lodash/head' );
const isArray = require( 'lodash/isArray' );
const isString = require( 'lodash/isString' );

const { getService, interpolate, isApiRequest } = require( '../utils' );

// Transform function which is used to transform the response object.
const transform = ( data, shortcodes ) => {
  // Single entry.
  if ( has( data, 'attributes' ) ) {
    return transform( data.attributes, shortcodes );
  }

  // Collection of entries.
  if ( isArray( data ) && data.length && has( head( data ), 'attributes' ) ) {
    return data.map( item => transform( item, shortcodes ) );
  }

  // Loop through properties.
  Object.entries( data ).forEach( ( [ key, value ] ) => {
    if ( ! value ) {
      return;
    }

    // Single component.
    if ( has( value, 'id' ) ) {
      data[ key ] = transform( value, shortcodes );
    }

    // Repeatable component or dynamic zone.
    if ( isArray( value ) && has( head( value ), 'id' ) ) {
      data[ key ] = value.map( component => transform( component, shortcodes ) );
    }

    // Finally, replace the shortcode in string values.
    if ( isString( value ) ) {
      data[ key ] = interpolate( value, shortcodes );
    }
  } );

  return data;
};

// Transform API response by parsing data string to JSON for rich text fields.
module.exports = async ( { strapi } ) => {
  strapi.server.use( async ( ctx, next ) => {
    await next();

    if (
      ! ctx.body ||
      ! ctx.body.data ||
      ! isApiRequest( ctx )
    ) {
      return;
    }

    // Do nothing if there are no shortcodes in the database.
    const shortcodes = await getService( 'shortcodes' ).get();

    if ( ! shortcodes ) {
      return;
    }

    ctx.body.data = transform( ctx.body.data, shortcodes );
  } );
};
