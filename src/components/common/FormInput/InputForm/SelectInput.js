import React from 'react';
import { Form, Select } from 'antd';

/**
 * 下拉选择框
 */
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
class SelectInput extends React.Component {
  render() {
    const {form, item, formItemLayout} = this.props;
    const { getFieldDecorator } = form;
    const createOptions = (options) => {
      if (!options || options.length === 0) {
        return null;
      }
      const output = [];
      options.forEach((opt, index) => {
        if (typeof opt === 'object') {
          output.push(<Option key={index} value={opt.value}>{opt.label}</Option>);
        } else {
          output.push(<Option key={index} value={opt}>{opt}</Option>);
        }
      });
      return output;
    };
    const handleInputType = () => {
      return (
        <Select style={{ width: 200 }}>
          {createOptions(item.options || [])}
        </Select>
      );
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
export default SelectInput;
