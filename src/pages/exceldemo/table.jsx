import React, { Component } from 'react'
import $ from 'jquery'
import { Menu} from 'antd'
import XLSX from 'xlsx'
import './table.scss'
/**
 * https://www.cnblogs.com/liuxianan/p/js-excel.html
 * https://www.jianshu.com/p/31534691ed53
 * https://github.com/SheetJS/sheetjs/tree/master/demos
 * https://oss.sheetjs.com/sheetjs/
 * https://www.cnblogs.com/liuxianan/p/js-excel.html
 */
//by baojian
var firstindexrow;
var firstindexcol;
var curindexrow;
var curindexcol;
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
    filenames: '',
    showRightMenu: false
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
  componentDidMount() {
    console.log($('#pid').text())
    this.initForm()
    document.oncontextmenu = function name(e) {
      return false
    }
  }
  handleRightClick = e => {
    this.setState({
      showRightMenu: true
    })
    const { clientX: clickX, clientY: clickY} = e
    const { innerWidth: screenW, innerHeight : screenH} = window
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
          csstext+=`left:${clickX + 5}px;`
        }

        if (left) {
          csstext+=`left:${clickX - rootW - 5}px;`
        }

        if (top) {
            csstext+=`top:${clickY + 5}px;`
        }

        if (bottom) {
            csstext+=`top:${clickY - rootH - 5}px;`
        }
        csstext+=`display:block;`
        this.root.style.cssText += csstext
  }
  getSelectCon() {
    var minrow = curindexrow>firstindexrow?firstindexrow:curindexrow;
    var mincol = curindexcol>firstindexcol?firstindexcol:curindexcol;
    var maxrow = curindexrow>firstindexrow?curindexrow:firstindexrow;
    var maxcol = curindexcol>firstindexcol?curindexcol:firstindexcol;
    let res = []
    for(var i=minrow;i<=maxrow;i++){
      let arr = []
        for(var j=mincol;j<=maxcol;j++){
            $("tr:eq("+i+") td:eq("+j+")").addClass("div-ISelect");
            arr.push( $("tr:eq("+i+") td:eq("+j+")").text())
        }
        res.push(arr)
    }
    console.log(res)
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
      console.log('e',e)
      if(e.which === 3) {  //右键
        let event = e || 
        e.preventDefault()
        e.stopPropagation()
        that.handleRightClick(e)
        return
      }
      if(that.state.showRightMenu) {
        that.setState({
          showRightMenu: false
        })
        that.root.style.display = 'none'
      }
        isMouseDown = true;
        var currentTD = $(this);
        console.log('currentId', currentTD)
        $("tr:gt(0) td").each(function(i){  //每次重新按下，把之前选中的样式清除
            $(this).removeClass('div-ISelect');
        })
        firstindexrow = currentTD.parent().index();
        firstindexcol=currentTD.index();
        curindexrow = currentTD.parent().index();
        curindexcol = currentTD.index();
        console.log('findexrow findex col',firstindexrow, firstindexcol, 'curindexrow col', curindexrow, curindexcol)
        $("tr:eq("+curindexrow+") td:eq("+curindexcol+")").addClass("div-ISelect");
        return false;
    }).mouseenter(function (e) {
        if (isMouseDown) {
            var currentTD = $(this);
            $("tr:gt(0) td").each(function(i){
                $(this).removeClass('div-ISelect');
            })
            curindexrow = currentTD.parent().index();
            curindexcol = currentTD.index();
            var minrow = curindexrow>firstindexrow?firstindexrow:curindexrow;
            var mincol = curindexcol>firstindexcol?firstindexcol:curindexcol;
            var maxrow = curindexrow>firstindexrow?curindexrow:firstindexrow;
            var maxcol = curindexcol>firstindexcol?curindexcol:firstindexcol;
            for(var i=minrow;i<=maxrow;i++){
                for(var j=mincol;j<=maxcol;j++){
                    $("tr:eq("+i+") td:eq("+j+")").addClass("div-ISelect");
                }
            }
        }
    });
    $(document).mouseup(function () {
            isMouseDown = false;
        });
}
  render() {
    const { data, cols, files, filenames } = this.state
    console.log('files', files)
    return (
      // <div className='demo2main'>
      //   <input type="file" files={files} id='fileupd' multiple
      //     accept=".xlsx, .xls, .csv" onChange={this.handleChange} />
      //   <div>ddd</div>
      //   <div>{filenames}</div>
      //   <button onClick={this.handleCreate}>测试创建表格</button>
      //   <div id="demoid">

      //   </div>
      //   <div className="row">
      //     <div className="col-xs-12">
      //       <OutTable data={data} cols={cols} />
      //     </div>
      //   </div>
      // </div>
      <div class="table-container">
        <p id='pid' style={{backgroundColor:'red'}}>ddd</p>
        <button onClick={this.getSelectCon}>获取选中</button>
        <table>
            <caption>我是表格标题</caption>
            <tbody>
            <tr>
                <th></th>
                <th class="table-week"><span>周一</span></th>
                <th class="table-week"><span>周二</span></th>
                <th class="table-week"><span>周三</span></th>
                <th class="table-week"><span>周四</span></th>
                <th class="table-week"><span>周五</span></th>
                <th class="table-week"><span>周六</span></th>
                <th class="table-week"><span>周日</span></th>
            </tr>
            <tr>
                <td>第一行</td>
                <td class='select'>
                    <div count='1'>r1已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r1已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r1已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r1已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r1已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r1已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r1已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
            </tr>
            <tr>
                <td>第二行</td>
                <td class='select'>
                    <div count='1'>r2已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r2已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r2已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r2已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r2已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r2已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r2已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
            </tr>
            <tr>
                <td>第三行</td>
                <td class='select'>
                    <div count='1'>r3已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r3已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r3已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r3已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r3已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r3已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r3已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
            </tr>
            <tr>
                <td>第四行</td>
                <td class='select'>
                    <div count='1'>r4已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r4已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r4已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r4已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r4已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r4已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r4已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
            </tr>
            <tr>
                <td>第五行</td>
                <td class='select'>
                    <div count='1'>r5已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r5已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r5已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r5已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r5已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r5已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
                <td class='select'>
                    <div count='1'>r5已约：1人</div>
                    <div class='div-right'>√</div>
                </td>
            </tr>
            </tbody>
        </table>
    
        <div ref={ref => {this.root=ref}} className='right-menu'
          style={{position: 'absolute',borderRadius: '3px', display: 'none', width: '130px',
          zIndex: '200', height: '100px',  backgroundColor: '#ffffff', border: '1px solid rgb(248, 242, 247)',color: '#1a1a1a' }}>
          <Menu mode="vertical"  width={120}  triggerSubMenuAction="click" ref={ref => {this.root=ref}}
          >
            <Menu.SubMenu title="新增" >
            {<Menu.Item key="0"  >机构</Menu.Item>}
                <Menu.Item key="1" >用户组</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
    </div>
      
    )
  }
}