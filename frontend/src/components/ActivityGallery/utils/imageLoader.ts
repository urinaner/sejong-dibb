export const loadActivityImages = () => {
  const imageContext = require.context(
    '/public/activities',
    false,
    /\.(png|jpe?g|webp)$/,
  );

  return imageContext.keys().map((path, index) => {
    // 파일명에서 날짜와 제목 추출 (예: 2024-03-01_신입생환영회.jpg)
    const filename = path.split('/').pop() || '';
    const [date, ...titleParts] = filename.split('_');
    const title = titleParts.join('_').split('.')[0].replace(/-/g, ' ');

    return {
      id: index + 1,
      url: imageContext(path),
      title: title || '학생회 활동',
      date: date.replace(/-/g, '.') || '날짜 미지정',
      description: '',
    };
  });
};
