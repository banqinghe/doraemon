import { data } from './static';

/**
 * google drive 图片链接前缀
 */
const IMG_PREFIX = 'https://lh3.googleusercontent.com/u/0/d/';

/**
 * 预加载图片
 */
export function preloadImage(src) {
  let imgShell = document.querySelector('#preload-img-shell');
  if (!imgShell) {
    imgShell = document.createElement('div');
    imgShell.id = 'preload-img-shell';
    document.body.appendChild(imgShell);
  }
  console.log('preload src', src);
  imgShell.style.backgroundImage = `url(${src})`;
}

/**
 * 根据 chapter 和 page 获取图片 src
 */
export function getImageSrc(chapter, page) {
  const chapterData = data[chapter - 1];
  const total = chapterData.links.length * 2;
  const imgIndex = page !== 1 && page !== total ? Math.floor(page / 2) : 0;
  return IMG_PREFIX + chapterData.links[imgIndex];
}

/**
 * 判断是否是章节最后一页
 */
export function isLastPage(chapter, page) {
  return page === data[chapter - 1].links.length * 2;
}
