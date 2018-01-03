import querystring from 'querystring';
import * as ArticleService from '../../services/blog';

export default {
  namespace: 'blog/article',
  state: {
    articles: [],
    article: null,
    total: null,
    success: false,
    editLoading: false,
  },
  reducers: {
    all(state, { payload: { articles, total, success } }) {
      return { ...state, articles, total, success };
    },
    detail(state, { payload: { article, success } }) {
      return { ...state, article, editLoading: success };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data, headers } = yield call(ArticleService.getArticles, payload || {});
      yield put({ type: 'all', payload: { articles: data.articles, success: data.success, total: headers['x-total-count'] } });
    },
    *fetchArticle({ payload: id }, { call, put }) {
      const { data } = yield call(ArticleService.getArticle, id);
      console.log('article---->', data);
      yield put({ type: 'detail', payload: { article: data.article, success: data.success } });
    },

    *updateArticle({ payload: article }, { call, put }) {
      const { data } = yield call(ArticleService.editArticle, article);
      console.log('udpate-data', data);
      yield put({ type: 'reloadArticle' });
    },
    *reloadArticle(action, { put, select }) {
      const { article } = yield select(state => state['blog/article']);
      console.log('reloadArticle', article);
      yield put({ type: 'fetchArticle', payload: article.id });
    },

    *reloadArticles(action, { put, select }) {
      const { page } = yield select(state => state.page);
      yield put({ type: 'all', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/blog') {
          console.log({ pathname, search });
          let page = search.replace('?', '');
          page = querystring.parse(page);
          // const params = querystring.parse(`${pathname}${search}`);
          dispatch({ type: 'fetch', payload: page });
        }
        if (pathname.includes('blog/article/edit')) {
          const id = pathname.match(/\d+/g);
          console.log('pathname', pathname);
          dispatch({ type: 'fetchArticle', payload: id });
        }
      });
    },
  },
};
