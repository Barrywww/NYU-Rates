import React from 'react'
import Login from '../src/js/Login'
import {shallow} from 'enzyme'
import * as api from '../../services/userService';

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
        jest.spyOn(api,'register').mockImplementation(()=>Promise.resolve({message:200}))
        const wrapper = shallow(<Login />)
        const roleInput = simulateChangeOnInput(wrapper,'#role-input','student')
        const emailInput = simulateChangeOnInput(wrapper,'#email-input','kkkk@nyu.edu')
        const passwordInput = simulateChangeOnInput(wrapper,'#password-input','12345')
        const nameInput = simulateChangeOnInput(wrapper,'#name-input','Kaan')
        expect(roleInput.props().value).toEqual('student')    //Assert输入正确
        expect(emailInput.props().value).toEqual('kkkk@nyu.edu')
        expect(passwordInput.props().value).toEqual('12345')
        expect(nameInput.props().value).toEqual('Kaan')
        wrapper.find('Form').simulate("submit",{       //提交表单
            preventDefault:()=>{},
        })
        expect(api.register).toHaveBeenCalledWith(     //测试是否跑了register的http service
            'student','kkkk@nyu.edu','12345','Kaan'
        )
    })
})