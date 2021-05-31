import React, { Component } from 'react'
import XLSX from 'xlsx'
import './demo2.scss'
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
        filenames: [].slice.call(files).map(item => item.name + ' -- ')
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

  aotToSheet() {
    //XLSX.utils.aoa_to_sheet takes an array of arrays of JS values and returns a worksheet resembling the input data.
    var ws = XLSX.utils.aoa_to_sheet([
      "SheetJS".split(""),
      [1,2,3,4,5,6,7],
      [2,3,4,5,6,7,8]
    ]);
  }
  jsonToSheet() {
    //Alternatively, the header row can be skipped:
    var ws = XLSX.utils.json_to_sheet([
      { A:"S", B:"h", C:"e", D:"e", E:"t", F:"J", G:"S" },
      { A: 1,  B: 2,  C: 3,  D: 4,  E: 5,  F: 6,  G: 7  },
      { A: 2,  B: 3,  C: 4,  D: 5,  E: 6,  F: 7,  G: 8  }
    ], {header:["A","B","C","D","E","F","G"], skipHeader:true});

    //XLSX.utils.sheet_add_json takes an array of objects and updates an existing worksheet object. 
    //It follows the same process as json_to_sheet and accepts an options argument:

    /* Write data starting at A2 */
    XLSX.utils.sheet_add_json(ws, [
      { A: 1, B: 2 }, { A: 2, B: 3 }, { A: 3, B: 4 }
    ], {skipHeader: true, origin: "A2"});

    /* Write data starting at E2 */
    XLSX.utils.sheet_add_json(ws, [
      { A: 5, B: 6, C: 7 }, { A: 6, B: 7, C: 8 }, { A: 7, B: 8, C: 9 }
    ], {skipHeader: true, origin: { r: 1, c: 4 }, header: [ "A", "B", "C" ]});

    /* Append row */
    XLSX.utils.sheet_add_json(ws, [
      { A: 4, B: 5, C: 6, D: 7, E: 8, F: 9, G: 0 }
    ], {header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true, origin: -1});
    
  }

  readTable = () => {
    var workbook = XLSX.utils.table_to_book(document.getElementById('tablearea'));
    XLSX.writeFile(workbook, 'testfile.xlsx')
    console.log('table wprkshop', workbook)
  }
  handleCreate = () => {
    /* Initial row */
    var ws = XLSX.utils.json_to_sheet([
      { A: "S", B: "h", C: "e", D: "e", E: "t", F: "J", G: "S" }
    ], { header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true });

    /* Write data starting at A2 */
    XLSX.utils.sheet_add_json(ws, [
      { A: 1, B: 2 }, { A: 2, B: 3 }, { A: 3, B: 4 }
    ], { skipHeader: true, origin: "A2" });

    /* Write data starting at E2 */
    XLSX.utils.sheet_add_json(ws, [
      { A: 5, B: 6, C: 7 }, { A: 6, B: 7, C: 8 }, { A: 7, B: 8, C: 9 }
    ], { skipHeader: true, origin: { r: 1, c: 4 }, header: ["A", "B", "C"] });

    /* Append row */
    XLSX.utils.sheet_add_json(ws, [
      { A: 4, B: 5, C: 6, D: 7, E: 8, F: 9, G: 0 }
    ], { header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true, origin: -1 });

    const htmldata = XLSX.utils.sheet_to_html(ws)
    document.getElementById('demoid').innerHTML = htmldata
  }
  /*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
  render() {
    const { data, cols, files, filenames } = this.state
    console.log('files', files)
    return (
      <div className='demo2main'>
        <input type="file" files={files} id='fileupd' multiple
          accept=".xlsx, .xls, .csv" onChange={this.handleChange} />
        <div>ddd</div>
        <div>{filenames}</div>
        <button onClick={this.handleCreate}>测试创建表格</button>
        <div id="demoid">

        </div>
        <div className="row">
          <div className="col-xs-12">
            <OutTable data={data} cols={cols} />
          </div></div>
      </div>
    )
  }
}