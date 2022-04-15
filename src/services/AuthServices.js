import AxiosServices from './AxiosServices'
import Configurations from '../configurations/Configurations'

const axiosServices = new AxiosServices()

export default class AuthServices {
  SignUp(data) {
    return axiosServices.post(Configurations.SignUp, data, false)
  }

  SignIn(data) {
    return axiosServices.post(Configurations.SignIn, data, false)
  }
}
