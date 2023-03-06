'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'shortcodes',
  info: {
    displayName: 'Shortcode',
    singularName: 'shortcode',
    pluralName: 'shortcodes',
    tableName: 'shortcodes',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: true,
    },
  },
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
