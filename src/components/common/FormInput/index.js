import React from 'react';
import { Form, Button } from 'antd';
import { TextInput, NumberInput, DateInput, CheckboxInput, RadioInput, SelectInput } from './InputForm';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  },
};
class FormInput extends React.Component {
  componentDidMount() {
    this.props.form.resetFields();
  }
  render() {
    const {
      form,
      userId,
      template,
      onSubmit,
      onReset,
    } = this.props;
    const onHandleSubmit = (event) => {
      event.preventDefault();
      form.validateFields((err, formValues) => {
        if (!err) {
          // console.log('提交的数据: ', formValues);
          onSubmit(formValues);
        }
      });
    };
    const onHandleReset = () => {
      this.props.form.resetFields();
      onReset()
    }
    const handleInputItem = (item) => {
      const inputItemPorps = {
        form,
        item,
        formItemLayout
      };
      switch (item.type) {
        case 'text':
        case 'textArea':
        case 'textarea':
          return <TextInput {...inputItemPorps} />;
        case 'number':
          return <NumberInput {...inputItemPorps} />;
        case 'date':
          return <DateInput {...inputItemPorps} />;
        case 'checkbox':
          return <CheckboxInput {...inputItemPorps} />;
        case 'redio':
          return <RadioInput {...inputItemPorps} />;
        case 'select':
          return <SelectInput {...inputItemPorps} />;
        default:
          break;
      }
    };
    const createFormItem = () => {
      const output = [];
      if (!template || template.length === 0) {
        return null;
      }
      template.map((item, idx) => {
        const inputItem = handleInputItem(item);
        output.push(<div key={idx}>{inputItem}</div>);
      });
      return output;
    };
    return (
      <div className={styles.wrap}>
        <Form>
          {createFormItem()}
          <Button type="primary" onClick={onHandleSubmit}>{`${userId ? '提交数据' : '新增数据'}`}</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={onHandleReset}>重置数据</Button>
        </Form>
      </div>
    );
  }
}
export default Form.create()(FormInput);
