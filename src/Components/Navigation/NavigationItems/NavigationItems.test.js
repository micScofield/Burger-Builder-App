import React from 'react'
import { configure, shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new EnzymeAdapter()})

describe('<NavigationItems />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render <NavigationItem /> twice if not authenticated', () => {
        wrapper.setProps({isAuth: false})
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render <NavigationItem /> thrice if authenticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(4)
    })

})