import React from 'react';
import { Form, InputNumber } from 'antd';

/**
 * 单行或多行文本输入框
 */
const FormItem = Form.Item;
class NumberInput extends React.Component {
  render() {
    const {form, item, formItemLayout} = this.props;
    const { getFieldDecorator } = form;
    const handleInputType = () => {
      if (item.prefix || item.suffix) {
        return (
          <InputNumber
            formatter={value => `${item.prefix || ''}${value}${item.suffix || ''}`}
            min={item.min || -Infinity}
            max={item.max || Infinity}
            style={{width: '100%'}}
            parser={value => value.replace(/[a-df-zA-Z/\\:"();+\-_!^&$'￥%*@#，<>|\s]|(,*)/g, '')}
            placeholder={item.placeholder || item.message || ''}
          />
        );
      }
      return (<InputNumber
        min={item.min || -Infinity}
        max={item.max || Infinity}
        style={{width: '100%'}}
        parser={value => value.replace(/[a-df-zA-Z/\\:"();+\-_!^&$'￥%*@#，<>|\s]|[e]{0,1}|(,*)/g, '')}
        placeholder={item.placeholder || ''}
      />);
    };
    return (
      <FormItem
        {...formItemLayout}
        label={item.name}
      >
        {getFieldDecorator(item.key, {
          rules: [{ required: item.required, message: item.message }],
          initialValue: item.value || ''
        })(handleInputType())}
      </FormItem>
    );
  }
}
export default NumberInput;
