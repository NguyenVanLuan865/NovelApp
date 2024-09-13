const genreMap = {
    "1": "Huyền Huyễn",
    "2": "Tiên Hiệp",
    "3": "Hiệp Khách",
    "4": "Đồng Nhân",
    "5": "Hệ Thống",
    "6": "Ngôn Tình",
    "7": "Khoa Huyễn",
    "8": "Hài Hước",
    "9": "Dị Năng",
    "10": "Trọng Sinh",
    "11": "Vong Du"
  };
  
  export const transformGenres = (genres) => {
    return genres.map(genreId => ({
      id: genreId,
      title: genreMap[genreId] || 'Unknown'
    }));
  };

  const progressMap = {
    true: "Đang ra",
    false: "Đã hoàn thành"
  };
  
  export const transformProgress = (progress) => {
    return progressMap[progress] || 'Unknown';
  };