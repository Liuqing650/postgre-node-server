import React from 'react';
import { observer } from 'mobx-react';
import { Table, Divider, Switch } from 'antd';
import styles from './index.less';

const TableCom = ({ data, status, onModify, onDelete }) => {
  const active = {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => onModify(record)}>修改</a>
        <Divider type="vertical" />
        <a onClick={() => onDelete(record)}>删除</a>
      </span>
    ),
  };
  const columnsConfig = {
    user: [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '描述',
        key: 'description',
        dataIndex: 'description'
      }, {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time'
      }
    ],
    role: [
      {
        title: '角色名',
        dataIndex: 'role',
        key: 'role',
      }, {
        title: '是否有效',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => (<span>{text === 1 ? '是' : '否'}</span>),
      }, {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time'
      }, {
        title: '修改时间',
        key: 'modify_time',
        dataIndex: 'modify_time'
      }
    ],
    userRole: [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '角色名',
        dataIndex: 'role',
        key: 'role',
      }, {
        title: '是否有效',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => (<span>{text === 1 ? '是' : '否'}</span>),
      }, {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time'
      }, {
        title: '修改时间',
        key: 'modify_time',
        dataIndex: 'modify_time'
      }
    ],
  };
  const createColumns = () => {
    const column = columnsConfig[status];
    if (!column) {
      return [];
    }
    column.push(active);
    return column;
  };
  const columns = createColumns();
  return (
    <div className={styles.wrap}>
      <Table columns={columns} pagination={{ pageSize: 5 }} dataSource={data}  rowKey={record => record.id} />
    </div>
  );
}
export default observer(TableCom);
