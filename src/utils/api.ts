const apiConf = {
  registry: 'http://localhost:9090'
}
const { registry } = apiConf

const API = {
  login: `${registry}/user/signin`,
  logout: `${registry}/user/signout`,

  user: `${registry}/perm/user`,
  ns:  `${registry}/ns`
}

export default API