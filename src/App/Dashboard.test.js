import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Components/Dashboard';
import { shallow } from 'enzyme';

const props = {
  reduxStore: {
    authStatus: false,
    dashboardStatus: 'unset',
    loginForm: {
      email: '',
      password: '',
    },
    userInfo: {},
    userTransactions: [],
    error: '',
  }
}

const mockTransactions = [
  {
    "transId":1,
    "custId":0,
    "transTime":1505162367789,
    "transAmt": 100,
    "description":"Donation",
    "transTo":"Watsi",
    "transFrom":"Test bank user"
  },
  {
    "transId":1,
    "custId":0,
    "transTime":1505162367789,
    "transAmt": 100,
    "description":"Donation",
    "transTo":"Watsi",
    "transFrom":"Test bank user"
  },
  {
    "transId":1,
    "custId":0,
    "transTime":1505162367789,
    "transAmt": 100,
    "description":"Donation",
    "transTo":"Watsi",
    "transFrom":"Test bank user"
  },
]


describe('Transaction dashboard', () => {
  it('Waits until data from server is fetched before rendering content', () => {
    let wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.contains(<h1 className='small-font'>Account Summary</h1>)).toEqual(false);
    props.reduxStore.dashboardStatus = 'ready'
    let wrapper2 = shallow(<Dashboard {...props} />);
    expect(wrapper2.contains(<h1 className='small-font'>Account Summary</h1>)).toEqual(true);
  });
  it('Hides table if transactions are empty', () => {
    props.reduxStore.dashboardStatus = 'ready'
    let wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.contains(<h1 className='small-font'>No Results</h1>)).toEqual(true);
  });
  it('Shows table if transactions are NOT empty', () => {
    props.reduxStore.dashboardStatus = 'ready';
    props.reduxStore.userTransactions.push(mockTransactions)
    let wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.contains(<h1 className='small-font'>No Results</h1>)).toEqual(false);
  });
});
