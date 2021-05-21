import React from 'react'
import Login from '../src/js/Login'
import {shallow} from 'enzyme'
import * as api from '../../services/authService';

const simulateChangeOnInput =(wrapper,inputSelector,newValue) //用户输入
=>{
    const input = wrapper.find(inputSelector)
    input.simulate('change',{
        target:{value:newValue},
    })
    return wrapper.find(inputSelector)
}

describe('Login component',()=>{
    beforeEach(()=>jest.resetAllMocks())
    it('submits the form to Api',()=>{       //测试提交表单，mock后端对接
        jest.spyOn(api,'login').mockImplementation(()=>Promise.resolve({message:200})) //假设后端返回成功
        const wrapper = shallow(<Login />)
        const roleInput = simulateChangeOnInput(wrapper,'#role-input','student')
        const emailInput = simulateChangeOnInput(wrapper,'#email-input','kkkk@nyu.edu')
        const passwordInput = simulateChangeOnInput(wrapper,'#password-input','12345')
        expect(roleInput.props().value).toEqual('student')    //Assert输入正确
        expect(emailInput.props().value).toEqual('kkkk@nyu.edu')
        expect(passwordInput.props().value).toEqual('12345')
        wrapper.find('Form').simulate("submit",{       //提交表单
            preventDefault:()=>{},
        })
        expect(api.login).toHaveBeenCalledWith(     //测试是否跑了login的http service
            'student','kkkk@nyu.edu','12345'
        )
    })
})