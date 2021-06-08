import React, { forwardRef, useImperativeHandle, useState, useEffect, useReducer } from 'react'
import { Form, Input, Select, InputNumber, Table, Button, message } from 'antd'
import { SketchPicker, SliderPicker   } from 'react-color'
import update from 'immutability-helper'

import ItemTypes from './ItemTypes'
const { Item } = Form
const { Column } = Table;
const { Option } = Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const initialState = {
    tableColumn: [
        { title: '姓名', dataIndex: 'name', id: 1 }
    ],
    count: 1
}
function reducer(state, action) {
    switch (action.type) {
        case 'deleteRow':
            return update(state, {tableColumn: {$splice: [[action.index, 1]]}})
        case 'addRow':
            let count = state.count
            let obj = {title: '', dataIndex: '', id:count + 1}
            return update(state, {tableColumn: {$push: [obj]}, count: {$set: count+1}})
        case 'changeRowData':
            return update(state, {tableColumn: {[action.index]: {[action.name]: {$set: action.value}}}})
        default:
            return state
    }
}
const BasicConfig = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        clear: form.resetFields,
    }))
    const [state, dispatch] = useReducer(reducer, initialState)
    const [form] = Form.useForm();
    // const [config,setConfig] = useState({})
    const { item } = props
    const submit = () => {
        // setConfig(form.getFieldsValue(true))
        props.changeConfig('basic',form.getFieldsValue(true));
    }
    const saveTblClm = () => {
        let tableColumn = state.tableColumn
        if (tableColumn.some(item => !item.title || !item.dataIndex)) {
            message.error('请填写完整')
        } else {
            props.changeConfig('basic',{ tableColumn: state.tableColumn, ...form.getFieldsValue(true) })
        }
    }
    const changeColor = (key, value) => {
        form.setFieldsValue({ [key]: value.hex })
        console.log('value color', value, form.getFieldsValue(true))
        submit()
    }
    useEffect(() => {
        form.resetFields()
        renderForm();
    }, [props.item]);
    const renderForm = () => {
        return (
            <Form {...layout} form={form}>
                {
                    [ItemTypes.CHART, ItemTypes.PIECHART].includes(item.type) &&
                    <div>
                        <Item label='图表标题' name='title' initialValue={item.basicConfig.title}>
                            <Input placeholder='请输入图表标题' onChange={submit} />
                        </Item>
                        <Item label='图例朝向' name='legendOrient' initialValue={item.basicConfig.legendOrient}>
                            <Select onChange={submit}>
                                <Option value='horizontal'>横向</Option>
                                <Option value='vertical'>纵向</Option>
                            </Select>
                        </Item>
                    </div>
                }
                {
                    item.type === ItemTypes.CHART &&
                    <div>
                        <Item label='x轴名称' name='xName' initialValue={item.basicConfig.xName}>
                            <Input placeholder='请输入x轴名称' onChange={submit} />
                        </Item>
                        <Item label='y轴名称' name='yName' initialValue={item.basicConfig.yName}>
                            <Input placeholder='请输入y轴名称' onChange={submit} />
                        </Item>
                    </div>
                }
                {
                    item.name === 'line_chart' &&
                    <div>
                        <Item label='折线样式' name='lineStyle' initialValue={item.basicConfig.lineStyle}>
                            <Select onChange={submit}>
                                <Option value={false}>折线</Option>
                                <Option value={true}>曲线</Option>
                            </Select>
                        </Item>
                        <Item label='折线类型' name='lineType' initialValue={item.basicConfig.lineType}>
                            <Select onChange={submit}>
                                <Option value='solid'>实线</Option>
                                <Option value='dashed'>虚线</Option>
                                <Option value='dotted'>点线</Option>
                            </Select>
                        </Item>
                        <Item label='折线宽度' name='lineWidth' initialValue={item.basicConfig.lineWidth || 2}>
                            <InputNumber step={0.5} onChange={submit}/>
                        </Item>
                        <Item label='折线颜色' name='lineColor' initialValue={item.basicConfig.lineColor}>
                            <SliderPicker  
                                color={item.basicConfig.lineColor}
                                onChange={(value) => changeColor('lineColor', value)}
                                width={137}
                            />
                        </Item>
                        <Item label='展示面积' name='showArea' initialValue={item.basicConfig.showArea}>
                            <Select onChange={submit}>
                                <Option value={true}>是</Option>
                                <Option value={false}>否</Option>
                            </Select>
                        </Item>
                        {
                            form.getFieldValue('showArea') && 
                            <Item label='面积颜色' name='areaColor' initialValue={item.basicConfig.areaColor}>
                                <SliderPicker
                                    color={item.basicConfig.areaColor}
                                    onChange={(value) => changeColor('areaColor', value)}
                                    width={137}
                                />
                            </Item>
                        }
                    </div>
                }
                {
                    item.name === 'bar_chart' &&
                    <div>
                        <Item label='柱条宽度' name='barWidth' initialValue={item.basicConfig.barWidth}>
                            <InputNumber onChange={submit}/>
                        </Item>
                        <Item label='展示背景色' name='showBackground' initialValue={item.basicConfig.showBackground || false}>
                            <Select onChange={submit}>
                                <Option value={true}>是</Option>
                                <Option value={false}>否</Option>
                            </Select>
                        </Item>
                        {form.getFieldValue('showBackground') && <Item label='背景颜色' name='backgroundColor' initialValue={item.basicConfig.backgroundColor}>
                            <SliderPicker
                                color={item.basicConfig.backgroundColor}
                                onChange={(value) => changeColor('backgroundColor', value)}
                                width={137}
                            />
                        </Item>}
                        <Item label='柱条颜色' name='barColor' initialValue={item.basicConfig.barColor}>
                            <SliderPicker
                                color={item.basicConfig.barColor}
                                onChange={(value) => changeColor('barColor', value)}
                                width={137}
                            />
                        </Item>
                    </div>
                }
                {
                    item.name === 'scatter_chart' &&
                    <div>
                        <Item label='散点形状' name='pointShape' initialValue={item.basicConfig.pointShape || 'circle'}>
                            <Select onChange={submit}>
                                <Option value='circle'>圆形</Option>
                                <Option value='rect'>矩形</Option>
                                <Option value='roundRect'>圆角矩形</Option>
                                <Option value='triangle'>三角形</Option>
                                <Option value='diamond'>菱形</Option>
                            </Select>
                        </Item>
                        <Item label='散点大小' name='pointSize' initialValue={item.basicConfig.pointSize || 10}>
                            <InputNumber onChange={submit}/>
                        </Item>
                        <Item label='散点颜色' name='pointColor' initialValue={item.basicConfig.pointColor}>
                            <SliderPicker
                                color={item.basicConfig.pointColor}
                                onChange={(value) => changeColor('pointColor', value)}
                                width={137}
                            />
                        </Item>
                    </div>
                }
                {
                    item.type === ItemTypes.PIECHART &&
                    <div>
                        <Item label='饼图样式' name='pieStyle' initialValue={item.basicConfig.pieStyle}>
                            <Select defaultValue='pie' onChange={submit}>
                                <Option value='pie'>基础饼图</Option>
                                <Option value='doughnut'>环形图</Option>
                                <Option value='nightingale'>南丁格尔图</Option>
                            </Select>
                        </Item>
                    </div>
                }
                {
                    item.type === ItemTypes.NORMALTABLE &&
                    <div>
                        <Item label='每页条数' name='pageSize' initialValue={item.basicConfig.pageSize || 10}>
                            <InputNumber min={3} max={20} onBlur={submit} />
                        </Item>
                        <Button type="primary" size='small' onClick={e => dispatch({ type: 'addRow' })}>添加一行</Button>
                        <Button type="primary" size='small' style={{ marginLeft: '20px' }} onClick={saveTblClm}>保存</Button>
                        <Table dataSource={state.tableColumn} size='small' pagination={{ pageSize: 20, hideOnSinglePage: true }}>
                            <Column title="列头文字" dataIndex="title" key="title" width={120}
                                render={(text, record, index) => (
                                    <Input value={text} onChange={e => dispatch({ type: 'changeRowData', name: 'title', index, value: e.target.value })} />
                                )}
                            />
                            <Column placeholder='列数据在数据项中对应的路径' title="路径" dataIndex="dataIndex" key="dataIndex" width={120}
                                render={(text, record, index) => (
                                    <Input value={text} onChange={e => dispatch({ type: 'changeRowData', name: 'dataIndex', index, value: e.target.value })} />
                                )}
                            />
                            <Column title="操作" dataIndex="operate" key="operate" width={80} render={(text, record, index) => (
                                <Button type='link' size='small' onClick={() => dispatch({ type: 'deleteRow', index })}>删除</Button>
                            )
                            } />
                        </Table>
                    </div>
                }
                {
                    item.type === ItemTypes.TEXTCARD &&
                    <div>
                        <Item label='标题' name='name' initialValue={item.basicConfig.name}>
                            <Input placeholder='卡片标题' onChange={submit} />
                        </Item>
                        <Item label='数据项名字' name='datakey' initialValue={item.basicConfig.datakey}>
                            <Input placeholder='请输入数据项名称' onChange={submit} />
                        </Item>
                        <Item label='底部文字' name='linkTitle' initialValue={item.basicConfig.linkTitle}>
                            <Input placeholder='底部跳转名称' onChange={submit} />
                        </Item>
                        <Item label='跳转路径' name='link' initialValue={item.basicConfig.link}>
                            <Input placeholder='底部跳转名称' onChange={submit} />
                        </Item>
                        <Item label='底部颜色' name='color' initialValue={item.basicConfig.color}>
                            <SketchPicker
                                color={item.basicConfig.color}
                                onChange={(value) => changeColor('color', value)}
                                width={137}
                            />
                        </Item>
                    </div>
                }
            </Form>
        )
    }

    // useEffect(()=>{
    //     renderForm()
    // },[item.id])
    return (
        <div>
            {
                renderForm()
            }
        </div>
    )
})
export default BasicConfig;