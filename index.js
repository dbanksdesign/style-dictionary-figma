const getDocument = require('./getDocument');
const fs = require('fs');
const dottie = require('dottie');
const StyleDictionary = require('style-dictionary');

// Colors / Base / 100 -> colors.base.100.value
const formatName = (name) => {
  const subcategories = name.split('/').map((category) => category.trim().toLowerCase());
  return subcategories.join('.').concat('.value');
}

// Finds first node in subtree that uses style with given id.
// Returns null if not found.
const findNodeWithStyleId = (subtree, id) => {
  const styleFound = () => {
    if (subtree.styles) {
      const matchingStyle = Object.values(subtree.styles).find((value) => {
        return value === id;
      });
      return !!matchingStyle;
    }
    return false;
  }
  if (styleFound()) {
    return subtree;
  } else if (subtree.children) {
    for (let i = 0; i < subtree.children.length; i += 1) {
      const matchingChild = findNodeWithStyleId(subtree.children[i], id);
      if (matchingChild) { return matchingChild; }
    }
  }
  return null;
}

const getStyleValues = (styledNode, type) => {
  switch (type) {
    case 'FILL': {
      const { r, g, b, a } = styledNode.fills[0].color;
      return `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
    }
    case 'TEXT': {
      const { style: textStyle } = styledNode;
      return `${textStyle.fontSize}px`;
    }
    default:
      return;
  }
}

getDocument('Z0AjNxOTONWaTNrPZGap9q')
.then((json) => {
  const { styles, document } = json;
  let properties = {};
  Object.keys(styles).forEach((id) => {
    const style = styles[id];
    const { name, styleType } = style;
    const formattedName = formatName(name);
    const styledNode = findNodeWithStyleId(document, id);
    const styleData = getStyleValues(styledNode, styleType);
    dottie.set(properties, formattedName, styleData);
  })
  return properties;
}).then((properties) => {
  const sd = StyleDictionary.extend({
    properties,
    platforms: {
      scss: {
        transformGroup: 'scss',
        buildPath: 'build/',
        files: [{
          destination: 'variables.scss',
          format: 'scss/variables'
        }]
      }
    }
  });

  sd.buildAllPlatforms();
});
