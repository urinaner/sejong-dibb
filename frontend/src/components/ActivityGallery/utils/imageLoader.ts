// src/components/ActivityGallery/utils/imageLoader.ts
export const loadActivityImages = () => {
  // 1부터 6까지의 이미지를 직접 로드
  const images = Array.from({ length: 6 }, (_, i) => i + 1).map((num) => ({
    id: num,
    url: `/activities/${num}.jpeg`,
    description: `활동 사진 ${num}`,
  }));

  return images;
};
