import React, { Component } from 'react'
import XLSX from 'xlsx'
import $ from 'jquery'
import { Menu, Modal} from 'antd'
import './table.scss'
import Line from '../../components/echarts/line'
import FuncLine from '../../components/echarts/funcLine.js'
import FuncPolar from '../../components/echarts/funcPolar'
import { formDataSet} from '../../utils/echartsUtls'
import './style.scss'
/**
 * https://www.cnblogs.com/liuxianan/p/js-excel.html
 * https://www.jianshu.com/p/31534691ed53
 * https://github.com/SheetJS/sheetjs/tree/master/demos
 * https://oss.sheetjs.com/sheetjs/
 * https://www.cnblogs.com/liuxianan/p/js-excel.html
 */
 var firstindexrow;
 var firstindexcol;
 var curindexrow;
 var curindexcol;
 var ws;
function OutTable({ data, cols }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped" contentEditable={true}>
        <thead>
          <tr>{cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((r, i) => <tr key={i}>
            {cols.map(c => <td className='select' key={c.key}>{r[c.key]}</td>)}
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
    filenames: '',
    rightLineType: '',
    addVisible: false, //创建图
    lineDataSetSeries: null,
  }
  componentDidMount() {
    document.oncontextmenu = function name(e) {
      return false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.data, this.state.data)
    if(prevState.data !== this.state.data) {
      console.log('ee')
      this.initForm()
    }
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
      ws = workbook.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('data', data, make_cols(ws['!ref']))
      const htmldata = XLSX.utils.sheet_to_html(ws)
      // console.log(data)
      this.setState({
        data: data,
        cols: make_cols(ws['!ref']),
        files: files,
        filenames: [].slice.call(files).map(item => item.name + ' -- ')
      })
      // console.log(htmldata)
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

  handleRightClick = e => {
    this.setState({
      showRightMenu: true
    })
    const { clientX: clickX, clientY: clickY } = e
    const { innerWidth: screenW, innerHeight: screenH } = window
    // const screenW = window.innerWidth;
    // const screenH = window.innerHeight;
    const rootW = this.root.offsetWidth;
    const rootH = this.root.offsetHeight;

    const right = (screenW - clickX) > rootW;
    const left = !right;
    const top = (screenH - clickY) > rootH;
    const bottom = !top;
    var csstext = ''
    if (right) {
      csstext += `left:${clickX + 5}px;`
    }

    if (left) {
      csstext += `left:${clickX - rootW - 5}px;`
    }

    if (top) {
      csstext += `top:${clickY + 5}px;`
    }

    if (bottom) {
      csstext += `top:${clickY - rootH - 5}px;`
    }
    csstext += `display:block;`
    this.root.style.cssText += csstext
  }
  handleMenuClick = ({item, key, keyPath, domEvent }) => {
    console.log('key, key', key)
    let xdata = this.state.cols.slice(firstindexcol,  curindexcol+1)
    let ydatas = this.getSelectCon()
    console.log(xdata, this.getSelectCon(), ws)
    // console.log(formDataSet(xdata, ydatas))
    this.setState({
      lineDataSetSeries: formDataSet(xdata, ydatas),
      rightLineType: key,
      addVisible: true
    })
    this.root.style.display='none'
  }
  getSelectCon =() =>  {
    var minrow = curindexrow > firstindexrow ? firstindexrow : curindexrow;
    var mincol = curindexcol > firstindexcol ? firstindexcol : curindexcol;
    var maxrow = curindexrow > firstindexrow ? curindexrow : firstindexrow;
    var maxcol = curindexcol > firstindexcol ? curindexcol : firstindexcol;
    let res = []
    // for (var i = minrow; i <= maxrow; i++) {
    //   let arr = []
    //   for (var j = mincol; j <= maxcol; j++) {
    //     $("tr:eq(" + i + ") td:eq(" + j + ")").addClass("div-ISelect");
    //     arr.push($("tr:eq(" + i + ") td:eq(" + j + ")").text())
    //   }
    //   res.push(arr)
    // }
    const data = this.state.data
    let resfromdata = []
    for (var i = minrow; i <= maxrow; i++) {
      let arr = data[i].slice(mincol, maxcol+1)
      // for (var j = mincol; j <= maxcol; j++) {
      //   $("tr:eq(" + i + ") td:eq(" + j + ")").addClass("div-ISelect");
      //   arr.push($("tr:eq(" + i + ") td:eq(" + j + ")").text())
        
      // }
      resfromdata.push(arr)
    }
    console.log(resfromdata)
    return resfromdata
  }
  handleHide = () => {
    this.root.style.display = 'none'
  }
  initForm() {

    var isMouseDown = false,
      isHighlighted
    var that = this
    console.log('that', that)
    //添加点击事件
    $(".select").mousedown(function (e) {
      console.log('e', e)
      if (e.which === 3) {  //右键
        let event = e ||
          e.preventDefault()
        e.stopPropagation()
        that.handleRightClick(e)
        return
      }
      if (that.state.showRightMenu) {
        that.setState({
          showRightMenu: false
        })
        that.root.style.display = 'none'
      }
      isMouseDown = true;
      var currentTD = $(this);
      console.log('currentId', currentTD)
      $("tr:gt(0) td").each(function (i) {  //每次重新按下，把之前选中的样式清除
        $(this).removeClass('div-ISelect');
      })
      firstindexrow = currentTD.parent().index();
      firstindexcol = currentTD.index();
      curindexrow = currentTD.parent().index();
      curindexcol = currentTD.index();
      console.log('findexrow findex col', firstindexrow, firstindexcol, 'curindexrow col', curindexrow, curindexcol)
      $("tr:eq(" + curindexrow + ") td:eq(" + curindexcol + ")").addClass("div-ISelect");
      return false;
    }).mouseenter(function (e) {
      if (isMouseDown) {
        var currentTD = $(this);
        $("tr:gt(0) td").each(function (i) {
          $(this).removeClass('div-ISelect');
        })
        curindexrow = currentTD.parent().index();
        curindexcol = currentTD.index();
        var minrow = curindexrow > firstindexrow ? firstindexrow : curindexrow;
        var mincol = curindexcol > firstindexcol ? firstindexcol : curindexcol;
        var maxrow = curindexrow > firstindexrow ? curindexrow : firstindexrow;
        var maxcol = curindexcol > firstindexcol ? curindexcol : firstindexcol;
        console.log('mouseenter', curindexcol, curindexrow)
        for (var i = minrow; i <= maxrow; i++) {
          for (var j = mincol; j <= maxcol; j++) {
            $("tr:eq(" + i + ") td:eq(" + j + ")").addClass("div-ISelect");
          }
        }
      }
    });
    $(document).mouseup(function () {
      console.log('mouseup', curindexrow, curindexcol, firstindexrow, firstindexcol)
      isMouseDown = false;
    });
  }
  render() {
    const { data, cols, files, filenames, rightLineType, addVisible, lineDataSetSeries } = this.state
    // console.log('files', files)
    return (
      <div>
        <input type="file" files={files} id='fileupd' multiple
          accept=".xlsx, .xls, .csv" onChange={this.handleChange} />
        <div>ddd</div>
        <div>{filenames}  <button onClick={this.getSelectCon}>获取选中</button></div>
        <FuncPolar id='funcdemo' />>
        {/* <FuncLine id='funcdemo' /> */}
        <div>
        </div>
        <div className="row">
          <div className="col-xs-12" contentEditable>
            <OutTable data={data} cols={cols} />
          </div>
        </div>
        <div ref={ref => {this.root=ref}} className='right-menu'
          style={{position: 'absolute',borderRadius: '3px', display: 'none', width: '130px',
          zIndex: '200', height: '100px',  backgroundColor: '#ffffff', border: '1px solid rgb(248, 242, 247)',color: '#1a1a1a' }}>
          <Menu mode="vertical"  width={120} onClick={this.handleMenuClick}  triggerSubMenuAction="click" ref={ref => {this.root=ref}}
          >
            <Menu.Item key='line'>
              折线图
            </Menu.Item>
            <Menu.Item key='pie'>
              饼图
            </Menu.Item>
            <Menu.Item key='scatter'>
              散点图
            </Menu.Item>
          </Menu>
        </div>
        <Modal visible={addVisible} onCancel={e => this.setState({ addVisible: false})} destroyOnClose>
        {addVisible  && <Line id='333' basicConfig={{legendOrient:'vertical', lineStyle: true, lineType: 'solid',lineColor: 'blue', showArea: false }} 
          DsetAndSeries={lineDataSetSeries}
            dataConfig = {{xname: ['a', 'b', 'c']}}
          />
      }
        </Modal>
      </div>
    )
  }
}