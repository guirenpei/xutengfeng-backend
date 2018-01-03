import request from '../utils/request';

export function create(values) {
  return request('/api/blog/article', {
    method: 'POST',
    body: {
      article: JSON.stringify(values),
    },
  });
}

export function getArticles({ page = 1 }) {
  return request(`/api/blog/articles?page=${page}`);
}

export function getArticle(id) {
  return request(`/api/blog/article/${id}`);
}

export function editArticle(article) {
  console.log('request->article', { article });
  return request('api/blog/article', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(article),
  });
}

export function deleteArticle(id) {
  return request('/api/blog/article', {
    method: 'DELETE',
    body: {
      id,
    },
  });
}
