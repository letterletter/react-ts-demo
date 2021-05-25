import React, { Component } from 'react'
import XLSX from 'xlsx'
import  './style.scss'
/**
 * https://www.cnblogs.com/liuxianan/p/js-excel.html
 * https://www.jianshu.com/p/31534691ed53
 * https://github.com/SheetJS/sheetjs/tree/master/demos
 * https://oss.sheetjs.com/sheetjs/
 * https://www.cnblogs.com/liuxianan/p/js-excel.html
 */
function OutTable({ data, cols }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped" contentEditable>
        <thead>
          <tr>{cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((r, i) => <tr key={i}>
            {cols.map(c => <td key={c.key}>{r[c.key]}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(x => `.${x}`).join(",");

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
  return o;
};
export default class Test extends Component {
  state = {
    data: [],
    cols: [],
    files: [],
    filenames: ''
  }
  componentDidMount() {

  }
  handleChange = (e) => {
    const files = e.target.files
    const file = files[0]
    console.log(files)
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result
      var workbook = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
      console.log('workbook', workbook)
      /* Get first worksheet */
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const htmldata = XLSX.utils.sheet_to_html(ws)
      console.log(data)
      this.setState({
        data: data,
        cols: make_cols(ws['!ref']),
        files: files,
        filenames: [].slice.call(files).map(item => item.name+' -- ')
      })
      console.log(htmldata)
    }

    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  handleDeleteFile = () => {
    let dom = document.getElementById('fileupd')
    console.log(dom.value)
  }
  isExcelFile(file) {
    return /\.(xlsx|xls|csv)$/.test(file.name)
  }

  //读取excel
  function(params) {

  }

  readTable = () => {
    var workbook = XLSX.utils.table_to_book(document.getElementById('tablearea'));
    XLSX.writeFile(workbook, 'testfile.xlsx')
    console.log('table wprkshop', workbook)
  }
  /*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
  render() {
    const { data, cols, files, filenames} = this.state
    console.log('files', files)
    return (
      <div>
        <input type="file" files={files} id='fileupd' multiple
          accept=".xlsx, .xls, .csv" onChange={this.handleChange} />
        <div>ddd</div>
        <div>{filenames}</div>
        <div>
          <html>
            <body>
              <h1>锄禾日当午</h1>
            </body>
          </html>
        </div>
        <div className='table-c'>
          <button onClick={this.readTable}>测试表格</button>
        <table className='tablesty'   id="tablearea"  >
                <caption>测试表单</caption>
                <thead><tr>
                  <th  id="title1">类别</th>
                  <th  id="title2">时间范围</th>
                  <th  id="title3" colSpan='3'>2020.09.03-2020.09.09</th>
                  <th  id="title4" colSpan='2'>制表时间</th>
                  <th  id="title5" colSpan='4'>2020.09.07</th>
                  <th  id="title6">制表人</th>
                  <th  id="title7" colSpan='2'>王杰</th>
                  </tr>  
                </thead>
                <tbody>
                  <tr >
                      <td headers="title1" rowSpan='2'>事件统计</td>
                      <td headers="title2">工作面</td>
                      <td headers="title3">回采方式</td>
                      <td headers="title4">进风尺寸</td>
                      <td headers="title5">回风尺寸</td>
                      <td headers="title1">&lt;10<sup>3</sup></td>
                      <td headers="title2">10<sup>3</sup></td>
                      <td headers="title3">10<sup>4</sup></td>
                      <td headers="title4">10<sup>5</sup></td>
                      <td headers="title5">&ge;10<sup>6</sup></td>
                      <td headers="title1">事件数</td>
                      <td headers="title2">内容2</td>
                      <td headers="title3">内容3</td>
                      <td headers="title4">备注</td>
                    </tr>
                    <tr >
                      <td headers="title2">5105工作面</td>
                      <td headers="title3">综放</td>
                      <td headers="title4">127.4</td>
                      <td headers="title5">133</td>
                      <td headers="title1">370</td>
                      <td headers="title2">23</td>
                      <td headers="title3">0</td>
                      <td headers="title5">0</td>
                      <td headers="title1">0</td>
                      <td headers="title2">393</td>
                      <td headers="title3">2.02E+05</td>
                      <td headers="title4">4013</td>
                      <td headers="title4"></td>
                    </tr>
                    <tr  >
                      <td rowSpan='6' colSpan='1' >活动趋势</td>
                      <td colSpan='13' rowSpan='6'>
                          dfdfd
                        </td>
                    </tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr>
                      <td rowSpan='2'>密度云图</td>
                      <td  style={{height: '300px'}}>
                        剖面
                      </td>
                      <td  colSpan='12'>
                      </td>
                    </tr>
                    <tr >
                      <td style={{height: '300px'}}>
                        平面
                      </td>
                      <td colSpan='12'>
                        dd
                      </td>
                    </tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr >
                      <td rowSpan='3' style={{height: '60px'}}>监测分析</td>
                      <td  rowSpan='3' colSpan='13'>re</td>
                    </tr>
                    <tr></tr><tr></tr>
                    <tr >
                      <td rowSpan='4' style={{height: '50px'}} >防治措施</td>
                      <td rowSpan='4' colSpan='13' >re</td>
                    </tr>
                    <tr></tr><tr></tr><tr></tr>
                    <tr>
                      <td rowSpan='2' style={{height: '50px'}}>建议</td>
                      <td rowSpan='2' colSpan='13'></td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td>签批</td>
                      <td colSpan='2'>分析员</td>
                      <td colSpan='2'></td>
                      <td colSpan='2'>地测科长</td>
                      <td colSpan='2'></td>
                      <td colSpan='2'>地测副总</td>
                      <td colSpan='3'></td>
                    </tr>
                </tbody>
              </table>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <OutTable data={data} cols={cols} />
        </div></div>
      </div>
    )
  }
}