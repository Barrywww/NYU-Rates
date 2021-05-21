import React from 'react'
import {shallow} from 'enzyme'
import profile from '../src/js/profile'

describe('Profile page component',()=>{
    beforeEach(()=>jest.resetAllMocks())
    it('submits the form to Api',()=>{       //测试提交表单，mock后端对接
        jest.spyOn(api,'register').mockImplementation(()=>Promise.resolve({message:200})) //假设后端返回成功
        const wrapper = shallow(<profile />)
        wrapper.find('Form').simulate("submit",{       //提交表单
            preventDefault:()=>{},
        })
        expect(api.register).toHaveBeenCalledWith(     //测试是否跑了register的http service
            'student','kkkk@nyu.edu','12345','Kaan'
        )
    })
})