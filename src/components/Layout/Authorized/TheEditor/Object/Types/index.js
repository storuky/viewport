import Base from './Base'
import AnalysisTools from './AnalysisTools'

let ObjectTypes = {
  Base,
  AnalysisTools
}

function createObject ({ targetField, postfix='' }) {
  let ObjectComponents = {}

  Object.keys(ObjectTypes).map(module => {
    Object.keys(ObjectTypes[module]).map(name => {
      ObjectComponents[`${module}_${name}${postfix}`] = ObjectTypes[module][name][targetField]
    })
  })

  return ObjectComponents
}

let ObjectComponents = createObject({targetField: 'Component'}),
    PropertyEditor = createObject({targetField: 'PropertyEditor', postfix: 'PropertyEditor'}),
    defaultProperties = createObject({targetField: 'defaultProperties'})

export {
  ObjectComponents,
  PropertyEditor,
  defaultProperties
}