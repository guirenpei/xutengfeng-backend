import querystring from 'querystring';
import * as ImageService from '../../services/image';

export default {
  namespace: 'gallery/image',
  state: {
    images: [],
    list: [],
    total: null,
    success: false,
  },
  reducers: {
    all(state, { payload: { list, total, success } }) {
      return { ...state, list, total, success };
    },
    detail(state, { payload: { images, success } }) {
      return { ...state, images, success };
    },
  },
  effects: {
    *fetchAll({ payload: page }, { call, put }) {
      // console.log('--all-page', page);
      const { data, headers } = yield call(ImageService.getImageList, page);
      // console.log('image-list----->', { data, headers });
      yield put({ type: 'all', payload: { list: data.images, success: data.success, total: headers['x-total-count'] } });
    },
    *fetchImages({ payload: { id } }, { call, put }) {
      console.log('id--->', id);
      const { data } = yield call(ImageService.getImages, id);
      console.log('life-images', { data });
      yield put({ type: 'detail', payload: { images: data.images, sucess: data.success } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/gallery/list') {
          console.log({ pathname, search });
          let page = search.replace('?', '');
          page = querystring.parse(page);
          dispatch({ type: 'fetchAll', payload: page });
        }
        if (pathname === '/gallery/life') {
          let id = search.replace('?', '');
          id = querystring.parse(id);
          dispatch({ type: 'fetchImages', payload: id });
        }
      });
    },
  },
};
