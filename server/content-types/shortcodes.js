'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'shortcodes',
  info: {
    displayName: 'Shortcodes',
    singularName: 'shortcode',
    pluralName: 'shortcodes',
    tableName: 'shortcodes',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {},
  attributes: {
    shortcode: {
      type: 'uid',
      required: true,
    },
    replacement: {
      type: 'string',
      required: true,
    },
  },
};
