import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import { Button } from 'antd';
import CollapseCom from './CollapseCom';
import FormInput from '../common/FormInput';
import styles from './index.less';

@inject('clientStore')
@withRouter
@observer
export default class HomePage extends Component {
  static proptypes = {
    clientStore: PropTypes.object
  }
  componentDidMount() {
    this.props.clientStore.initUserRole();
  }
  onRefresh = () => {
    this.props.clientStore.getUserList();
  }

  // 折叠板props
  renderCollapseProps = (status) => {
    const { clientStore } = this.props;
    const { userList, roleList, userRoleList } = clientStore;
    const userCollapseProps = {
      status: status,
      data: toJS(userList),
      onModify: (item) => {
        clientStore.modifyTemplate(item);
      },
      onDelete: (item) => {
        clientStore.deleteUser(item.id);
      }
    };
    const roleCollapseProps = {
      status: status,
      data: toJS(roleList),
      onModify: (item) => {
        clientStore.modifyTemplate(item);
      },
      onDelete: (item) => {
        clientStore.deleteUser(item.id);
      }
    };
    const userRoleCollapseProps = {
      status: status,
      data: toJS(userRoleList),
      onModify: (item) => {
        clientStore.modifyTemplate(item);
      },
      onDelete: (item) => {
        clientStore.deleteUser(item.id);
      }
    };
    const props = {
      user: userCollapseProps,
      role: roleCollapseProps,
      userRole: userRoleCollapseProps,
    };
    return props[status];
  };

  // 表单props
  renderFormProps = (status) => {
    const { clientStore } = this.props;
    const { template, roleTemplate, userRoleTemplate, userId, roleId } = clientStore;
    console.log('userRoleTemplate----->', toJS(userRoleTemplate));
    const userFormProps = {
      userId: userId,
      template: toJS(template),
      onSubmit(data) {
        if (!userId) {
          clientStore.addUser(data);
        } else {
          data.id = userId;
          clientStore.modifyUser(data);
        }
        console.log('data------>', data);
      },
      onReset() {
        clientStore.resetTemplate();
      }
    };
    const roleFormProps = {
      roleId: roleId,
      template: toJS(roleTemplate),
      onSubmit(data) {
        if (!userId) {
          clientStore.addRole(data);
        } else {
          data.id = roleId;
          clientStore.modifyRole(data);
        }
        console.log('data------>', data);
      },
      onReset() {
        clientStore.resetTemplate();
      }
    };
    const userRoleFormProps = {
      userId: userId,
      template: toJS(userRoleTemplate),
      onSubmit(data) {
        if (!userId) {
          clientStore.addUserRole(data);
        } else {
          data.id = userId;
          clientStore.modifyUserRole(data);
        }
        console.log('data------>', data);
      },
      onReset() {
        clientStore.resetTemplate();
      }
    };
    const props = {
      user: userFormProps,
      role: roleFormProps,
      userRole: userRoleFormProps,
    };
    return props[status];
  };

  render() {
    const { status } = this.props.clientStore;
    const formProps = this.renderFormProps(status);
    const collapseProps = this.renderCollapseProps(status);
    return (
      <div className={styles.wrap}>
        <h2>PL SQL<Button onClick={this.onRefresh}>刷新列表</Button></h2>
        <CollapseCom collapseProps={collapseProps} />
        <FormInput {...formProps} />
      </div>
    );
  }
}