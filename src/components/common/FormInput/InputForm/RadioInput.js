import React from 'react';
import { Form, Radio } from 'antd';

/**
 * 日期输入框
 */
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class RadioInput extends React.Component {
  render() {
    const {form, item, formItemLayout} = this.props;
    const { getFieldDecorator } = form;
    const createOptions = (options) => {
      if (!options || options.length === 0) {
        return null;
      }
      const output = [];
      options.map((opt, index) => {
        if (typeof opt === 'object') {
          output.push(<Radio key={index} value={opt.value}>{opt.label}</Radio>);
        } else {
          output.push(<Radio key={index} value={opt}>{opt}</Radio>);
        }
      });
      return output;
    };
    const handleInputType = () => {
      return <RadioGroup>{createOptions(item.options || [])}</RadioGroup>;
    };
    return (
      <FormItem
        {...formItemLayout}
        label={item.name}
      >
        {getFieldDecorator(item.key, {
          rules: [{ required: item.required, message: item.message }],
          initialValue: item.value || null
        })(handleInputType())}
      </FormItem>
    );
  }
}
export default RadioInput;
