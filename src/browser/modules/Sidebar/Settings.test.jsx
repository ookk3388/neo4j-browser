/* global test, expect */
import React from 'react'
import { mount } from 'enzyme'
import Settings, { Settings as SettingsComponent } from './Settings'
import reducer from '../../../shared/modules/settings/settingsDuck'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

describe('Settings', () => {
  const r = combineReducers({
    settings: reducer
  })
  const store = createStore(r)

  test('should show known setting values', () => {
    const wrapper = mount(
      <SettingsComponent settings={{ cmdchar: '-', maxHistory: 0 }} />
    )
    expect(wrapper.find('.setting').at(0).find('input').prop('defaultValue')).toBe('-')
    expect(wrapper.find('.setting').at(1).find('input').prop('defaultValue')).toBe(0)
  })
  test('should show default settings', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Settings />
      </Provider>
    )
    expect(wrapper.find('#db-settings').length).toBe(1)
    expect(wrapper.find('input').length).toBe(2)
    expect(wrapper.find('.setting').at(0).find('input').prop('defaultValue')).toBe(':')
    expect(wrapper.find('.setting').at(1).find('input').prop('defaultValue')).toBe(10)
  })
  test('should not show unknown settings', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Settings settings={{ a: 'b' }} />
      </Provider>
    )
    expect(wrapper.find('.setting').at(0).find('input').prop('defaultValue')).toBe(':')
    expect(wrapper.find('.setting').at(1).find('input').prop('defaultValue')).toBe(10)
  })
})
