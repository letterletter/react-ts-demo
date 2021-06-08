import React, { forwardRef, useImperativeHandle, useState, useEffect, useReducer } from 'react'
import { Form, Input, Select, InputNumber, Table, Button, message } from 'antd'
import update from 'immutability-helper'
import axios from 'axios'

import ItemTypes from './ItemTypes'
const { Item } = Form
const { Column } = Table;
const { Option } = Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const DataConfig = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        clear: form.resetFields,
    }))
    const [form] = Form.useForm();
    // const [config,setConfig] = useState({})
    const { item } = props
    const submit = () => {
        // setConfig(form.getFieldsValue(true))
        const data = form.getFieldsValue(true)
        if(item.name === 'bar_chart' || item.name === 'line_chart'){
            axios({
                method:'GET',
                url:`/self/getBarChartData`
            }).then(res=>{
                console.log(res)
                if(res.data.meta.code === 200){
                    props.changeConfig('data',res.data.data);
                }
            })
        }else if(item.name === 'scatter_chart'){
            axios({
                method:'GET',
                url:`/self/getScatterChartData`
            }).then(res=>{
                console.log(res)
                if(res.data.meta.code === 200){
                    props.changeConfig('data',res.data.data);
                }
            })
        }else if(item.name === 'pie_chart'){
            axios({
                method:'GET',
                url:`/self/getPieChartData`
            }).then(res=>{
                console.log(res)
                if(res.data.meta.code === 200){
                    props.changeConfig('data',res.data.data);
                }
            })
        }else if(item.name === 'text_card'){
            axios({
                method:'GET',
                url:`/self/getTotalNumber`
            }).then(res=>{
                console.log(res)
                if(res.data.meta.code === 200){
                    props.changeConfig('data',res.data.data);
                }
            })
        }
    }


    useEffect(() => {
        form.resetFields()
        renderForm();
    }, [props.item]);
    const renderForm = () => {
        return (
            <Form {...layout} form={form}>
                <div>
                    <Item label='请求地址' name='url' initialValue={item.dataConfig.url} 
                        rules={[{ required: true, message: '请填写url' }, 
                        //  {pattern: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/, message: '请填写有效的URL'} 
                        ]}
                    >
                        <Input placeholder='请求url'  />
                    </Item>
                    <Item label='请求方法' name='method' initialValue={item.dataConfig.legendOrient}>
                        <Select >
                            <Option value='get'>get</Option>
                            <Option value='post'>post</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Button onClick={submit}>获取数据</Button>
                    </Item>

                </div>
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
export default DataConfig;