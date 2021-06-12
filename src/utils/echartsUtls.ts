type XDataType =  {
  name: string
  key: number
}

type YDatasType = Array<Array<any>>
export function formDataSet(xData: Array<XDataType>, mulYData: YDatasType, lineType: string = 'bar' ) {
  console.log(mulYData)
  const dimensions = xData.map(item => item.name)
  const source: any[] = []
  source.push(dimensions, ...mulYData)
  const series = Array.from(new Array(dimensions.length-1), () => new Object({type: lineType})) 
  // mulYData.forEach(item => {
  //   let arr = []
  //   xData.forEach(ite => {
      
  //   })
  // })
  return {
    dataset: {
      source,
    },
    series
  }
}