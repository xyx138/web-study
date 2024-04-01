import Mock, { mock } from "mockjs";

import homeApi from './mockServerData/home'
import user from './mockServerData/user'
import permission from "./mockServerData/permission";

Mock.mock('/api/home/getData', homeApi.getStatisticalData)

Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, 'get', user.getUserList)
Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)