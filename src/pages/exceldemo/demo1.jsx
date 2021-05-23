import React, { Component } from 'react'
import XLSX from 'xlsx'
/**
 * https://www.cnblogs.com/liuxianan/p/js-excel.html
 * https://www.jianshu.com/p/31534691ed53
 * https://github.com/SheetJS/sheetjs/tree/master/demos
 * https://oss.sheetjs.com/sheetjs/
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
          <button onClick={this.handleDeleteFile}>删除文件</button>
        <div>ddd</div>
        <div>{filenames}</div>
        <div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <OutTable data={data} cols={cols} />
        </div></div>
      </div>
    )
  }
}