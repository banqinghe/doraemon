import { useState } from 'react';
import cn from 'classnames';
import { preloadImage, getImageSrc, isLastPage } from './util';
import { data } from './static';
import { useEffect } from 'react';

export default function App() {
  const [chapter, setChapter] = useState(1);
  const [page, setPage] = useState(1);

  // 当前章节数据
  const chapterData = data[chapter - 1];

  if (!chapterData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center font-mono text-lg">
        Data Error
      </div>
    );
  }

  // 总页数
  const total = chapterData.links.length * 2;
  // 当前页图片 src
  const imgSrc = getImageSrc(chapter, page);
  // 是否展示的是图片右半边
  const isRight = page !== 0 && page % 2 === 0;

  const gotoPrevPage = () => {
    if (chapter === 1 && page === 1) {
      return;
    }

    if (page === 1) {
      setChapter(prev => prev - 1);
      setPage(data[chapter - 1 - 1].links.length * 2);
    } else {
      setPage(prev => prev - 1);
    }
  };

  const gotoNextPage = () => {
    if (chapter === data.length && isLastPage(chapter, page)) {
      return;
    }

    if (page === total) {
      setChapter(chapter + 1);
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    console.log({ chapter, page });
    // 只在页码是奇数时预加载, 避免重复操作
    if (
      page % 2 === 0 ||
      (chapter === data.length && isLastPage(chapter, page))
    ) {
      return;
    }

    let preloadChapter;
    let preloadPage;

    if (isLastPage(chapter, page)) {
      preloadChapter = data[chapter];
      preloadPage = 1;
    } else {
      preloadChapter = chapter;
      preloadPage = page + 1;
    }

    preloadImage(getImageSrc(preloadChapter, preloadPage));
  }, [chapter, page]);

  return (
    <main className="absolute h-screen w-screen bg-black">
      <div className="h-full w-full overflow-hidden">
        {/* 触摸层 */}
        <div className="absolute inset-0 z-10 flex">
          <div className="w-2/5" onClick={gotoPrevPage} />
          <div className="w-1/5" />
          <div className="w-2/5" onClick={gotoNextPage} />
        </div>

        {/* 漫画图片 */}
        <img
          className={cn('h-screen w-[210%] max-w-none object-contain', {
            '-translate-x-[52%]': isRight,
          })}
          src={imgSrc}
          alt={`chapter${chapter},page${page}`}
        />

        {/* 状态栏 */}
        <div className="absolute bottom-0 scale-90 py-1 font-mono text-sm text-gray-300">{`${chapterData.name} - ${page}/${total}`}</div>
      </div>
    </main>
  );
}
