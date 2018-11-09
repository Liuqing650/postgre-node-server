import { observable, action, extendObservable } from 'mobx';
import { userApi } from 'api';

const getFormTemplete = () => {
  return [
    {
      name: '名字',
      key: 'name',
      value: '',
      type: 'text',
      inputType: '',
      required: false,
      message: '没有内容',
      placeholder: '请输入名字',
    },
    {
      name: '性别',
      key: 'sex',
      value: '',
      type: 'redio',
      inputType: '',
      required: false,
      message: '没有内容',
      options: ['男', '女'],
    },
    {
      name: '年龄',
      key: 'age',
      value: '',
      type: 'number',
      inputType: '',
      required: false,
      message: '没有输入年龄',
      placeholder: '请输入年龄',
    },
    {
      name: '描述',
      key: 'description',
      value: '',
      type: 'text',
      inputType: '',
      required: false,
      message: '没有内容',
      placeholder: '请输入描述文字',
    },
  ];
};
const getRoleForm = () => {
  return [
    {
      name: '角色',
      key: 'role',
      value: '',
      type: 'text',
      inputType: '',
      required: false,
      message: '没有内容',
      placeholder: '请输入名字',
    },
    {
      name: '状态',
      key: 'state',
      value: '',
      type: 'redio',
      inputType: '',
      required: false,
      message: '没有内容',
      options: [
        { label: '是', value: 1},
        { label: '否', value: 0}
      ],
    },
  ];
};
const getUserRoleForm = () => {
  return [
    {
      name: '用户',
      key: 'userId',
      value: '',
      type: 'select',
      inputType: '',
      required: false,
      message: '没有内容',
      placeholder: '请输入用户',
      options: [],
    },
    {
      name: '角色',
      key: 'roleId',
      value: '',
      type: 'select',
      inputType: '',
      required: false,
      message: '没有内容',
      placeholder: '请输入角色',
      options: [],
    }
  ];
};
class ClientStore {
  @observable env = '';
  @observable userId = '';
  @observable roleId = '';
  @observable status = 'user';
  @observable userList = [];
  @observable roleList = [];
  @observable userRoleList = [];
  @observable template = getFormTemplete();
  @observable roleTemplate = getRoleForm();
  @observable userRoleTemplate = getUserRoleForm();

  constructor(initialState) {
    // 服务端初始化数据
    if (initialState) {
      extendObservable(this, initialState.clientStore);
    }
  }

  @action.bound changeStatus(status) {
    this.status = status;
  }

  @action.bound modifyTemplate(dataItem) {
    const status = this.status;
    const modifyUserTemplate = (data) => {
      this.userId = data.id;
      this.template.forEach(item => {
        item.value = data[item.key];
      });
    };
    const modifyRoleTemplate = (data) => {
      this.roleId = data.id;
      this.roleTemplate.forEach(item => {
        item.value = data[item.key];
      });
    };
    const modifyUserRoleTemplate = (data) => {
      this.userId = data.id;
    }
    switch (status) {
      case 'user':
        modifyUserTemplate(dataItem);
        break;
      case 'role':
        modifyRoleTemplate(dataItem);
        break;
      case 'userRole':
        modifyUserRoleTemplate(dataItem);
        break;
      default:
        modifyUserTemplate(dataItem);
        break;
    }
  }

  // 获取用户列表
  @action.bound getUserList(callback) {
    this.resetList();
    userApi.getUserList()
      .then(resp => {
        this.userList = resp.data.data;
        if (callback) {
          callback(resp.data.data);
        }
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }
  // 获取角色列表
  @action.bound getRoleList(callback) {
    this.resetRoleTemplate();
    userApi.getRoleList()
      .then(resp => {
        this.roleList = resp.data.data;
        if (callback) {
          callback(resp.data.data);
        }
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }

  // 获取用户角色列表
  @action.bound getUserRoleList(callback) {
    this.resetUserRoleTemplate();
    userApi.getUserRoleList()
      .then(resp => {
        this.userRoleList = resp.data.data;
        if (callback) {
          callback(resp.data.data);
        }
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }

  // 初始化用户角色表单
  @action.bound initUserRole() {
    this.resetUserRoleTemplate();
    const self = this;
    const handleOptions = (data, key) => {
      if (!data || data.length === 0) {
        return [];
      }
      return data.map((item) => {
        return {
          label: item[key],
          value: item.id,
        }
      });
    };
    this.getUserList((data) => {
      self.userRoleTemplate.forEach((item) => {
        if (item.key === 'userId') {
          item.options = handleOptions(data, 'name');
        }
      });
    });
    this.getRoleList((data) => {
      self.userRoleTemplate.forEach((item) => {
        if (item.key === 'roleId') {
          item.options = handleOptions(data, 'role');
        }
      });
    });
    this.getUserRoleList();
  }

  @action.bound addUser(params) {
    userApi.addUser(params)
      .then(resp => {
        this.getUserList();
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }

  @action.bound addRole(params) {
    userApi.addRole(params)
      .then(resp => {
        this.getRoleList();
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }

  @action.bound addUserRole(params) {
    userApi.addUserRole(params)
      .then(resp => {
        // this.getRoleList();
        console.log('resp---->', resp);
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }


  @action.bound modifyUser(params) {
    userApi.modifyUser(params)
      .then(resp => {
        this.getUserList();
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }

  @action.bound modifyRole(params) {
    userApi.modifyRole(params)
      .then(resp => {
        this.getRoleList();
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }

  @action.bound deleteUser(userId) {
    userApi.deleteUser(userId)
      .then(resp => {
        this.getUserList();
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }

  @action.bound deleteRole(roleId) {
    userApi.deleteRole(roleId)
      .then(resp => {
        this.getRoleList();
      })
      .catch(error => {
        console.log('error---->', error);
      })
  }

  @action.bound resetTemplate() {
    this.userId = '';
    this.template = getFormTemplete();
  }

  @action.bound resetRoleTemplate() {
    this.roleId = '';
    this.roleTemplate = getRoleForm();
  }

  @action.bound resetUserRoleTemplate() {
    this.userId = '';
    this.userRoleTemplate = getUserRoleForm();
  }

  @action.bound resetList() {
    this.userList = [];
  }

  @action.bound resetStore() {
    this.resetList();
    this.resetTemplate();
    this.resetRoleTemplate();
  }
}

export const ClientStoreClass = ClientStore;
export default new ClientStore(__SERVER__ ? null : window.__INITIAL_STATE__);
