import request from '../utils/request';

export function getImageList({ page = 1 }) {
  console.log('page', page);
  return request(`/api/image/list?page=${page}`);
}

export function getImages(id) {
  console.log('images-id', id);
  return request(`/api/image/category?id=${id}`);
}
