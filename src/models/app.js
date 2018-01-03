import querystring from 'querystring';
import { config } from '../utils';

const { prefix } = config;
export default {
  namespace: 'app',
  state: {
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    isNavbar: document.body.clientWidth < 769,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    handleNavbar(state, { payload: { isNavbar = false } }) {
      return { ...state, isNavbar };
    },
    switchMenuPopver(state) {
      return { ...state, menuPopoverVisible: !state.menuPopoverVisible };
    },
    switchSider(state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return { ...state, siderFold: !state.siderFold };
    },
    handleNavOpenKeys(state, { payload: { navOpenKeys } }) {
      return { ...state, navOpenKeys };
    },
  },
  effects: {
    *changeNavbar(action, { put, select }) {
      const { app } = yield select(_ => _);
      const isNavbar = document.body.clientWidth < 769;
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: { isNavbar } });
      }
    },
    *logout({ payload }, { call, put }) {
      console.log('logout');
      // const data = yield call(logout, parse(payload));
      // if (data.success) {
      //   yield put({ type: 'query' });
      // } else {
      //   throw (data);
      // }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' });
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' });
        }, 300);
      };
    },
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: querystring.parse(location.search),
          },
        });
      });
    },
  },
};
