import React from 'react'
import { configure, shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

configure({adapter: new EnzymeAdapter()})

describe('<BurgerBuilder />', () => {
    let wrapper;

    it('should render <BuildControls /> if ingredients are present', () => {
        wrapper = shallow(<BurgerBuilder FETCH_INGREDIENTS = {() => {}} />)

        const props = {
            ingredients: {salad: '0'}
        }

        wrapper.setProps(props)
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})
