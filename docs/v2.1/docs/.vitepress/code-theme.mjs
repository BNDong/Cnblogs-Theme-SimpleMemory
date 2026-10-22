// Both appearances use a dark code surface, with the same readable token palette.
export default {
  name: 'simplememory-plum',
  type: 'dark',
  colors: {
    'editor.background': '#201a2c',
    'editor.foreground': '#eee6f7'
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#b8abc9' } },
    { scope: ['keyword', 'storage', 'meta.property-name', 'support.type.property-name', 'variable.other.property'], settings: { foreground: '#f0adc4' } },
    { scope: ['string', 'punctuation.definition.string'], settings: { foreground: '#d1b4fa' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character', 'variable.language'], settings: { foreground: '#f2c398' } },
    { scope: ['entity.name.function', 'support.function'], settings: { foreground: '#e8c8f5' } },
    { scope: ['entity.name.tag', 'entity.other.attribute-name'], settings: { foreground: '#f0adc4' } },
    { scope: ['entity.name.type', 'support.type', 'support.class'], settings: { foreground: '#d1b4fa' } },
    { scope: ['invalid', 'message.error'], settings: { foreground: '#ffb4bd' } }
  ]
}
