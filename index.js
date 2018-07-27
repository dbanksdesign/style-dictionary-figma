const getDocument = require('./getDocument');
const fs = require('fs');
const StyleDictionary = require('style-dictionary');

const reducer = (ret, obj) => {
  if (obj.children) {
    let value = obj.children.find(child => child.type === 'TEXT' && child.name === 'value');
    if (value) {
      ret[obj.name] = {
        value: value.characters
      }
    } else {
      ret[obj.name] = obj.children.reduce(reducer, {});
    }
  }
  return ret;
}

getDocument('ekJQOrhrjvPh4sVlzQllyeJN')
.then(function(json) {
  return json.document.children.reduce(reducer, {});
}).then(function(properties) {
  const sd = StyleDictionary.extend({
    properties: properties,
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

