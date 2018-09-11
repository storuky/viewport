var types = [
  'Base_TextObject',
  'Base_RectObject',
  'AnalysisTools_GeneralObject',
  'AnalysisTools_OrganisationObject',
  'AnalysisTools_PersonObject',
]

const objects = Array(10).fill({}).map((el, index) => {
  return {
    id: index,
    type: types[Math.floor(Math.random() * types.length)],
    // type: 'RectObject',
    // width: Math.random() * 300,
    // height: Math.random() * 300,
    // minHeight: 50,
    // minWidth: 70,
    // maxHeight: 300,
    // maxWidth: 300,
    position: { x: Math.random() * 1200, y: Math.random() * 500 },
    info: {
      settings: {
        color: '#333333',
        backgroundColor: '#e7e7e7'
      }
    }
  }
})

export default objects