import React from 'react';
import { Collapse } from 'antd';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import TableCom from 'components/common/TableCom';

const Panel = Collapse.Panel;

@inject('clientStore')
@observer
class CollapseCom extends React.Component {
  state = {
    activeKey: [],
  };
  changeActiveKey = (activeKey) => {
    this.setState({
      activeKey
    });
    if (activeKey && activeKey.length > 0) {
      this.props.clientStore.changeStatus(activeKey[activeKey.length - 1]);
    } else {
      this.props.clientStore.changeStatus('');
    }
  };
  renderTabPane = (tabs, status) => {
    if (!tabs || tabs.length === 0) {
      return null;
    }
    const output = [];
    tabs.forEach((item, index) => {
      const tableProps = item.props;
      let tab = item.tab;
      if (status && (status === item.key)) {
        tab = `${tab}(active)`;
      }
      output.push(
        <Panel header={tab} key={item.key}>
          <TableCom {...tableProps} />
        </Panel>
      );
    });
    return output;
  };
  render() {
    const { collapseProps, clientStore } = this.props;
    const { status } = clientStore;
    const tabConfig = [
      {
        tab: '用户表',
        key: 'user',
        props: collapseProps
      },
      {
        tab: '角色表',
        key: 'role',
        props: collapseProps
      },
      {
        tab: '用户角色关系',
        key: 'userRole',
        props: collapseProps
      },
    ];
    return (
      <Collapse onChange={this.changeActiveKey}>
        {this.renderTabPane(tabConfig, status)}
      </Collapse>
    );
  }
}
export default CollapseCom;
