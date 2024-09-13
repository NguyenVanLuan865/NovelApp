import { setCache, getCache } from '../utils/cache';
import axios from 'axios';


const API_URL = "http://192.168.1.13:8000/v1/"
const CACHE_TTL = 60000;

// Hàm đăng nhập
export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}user/login`, { email, password });
      console.log(`${API_URL}user/login`)
      return response.data;
    } catch (error) {
      throw error;
    }
  };


// Hàm để lấy dữ liệu cho HomeScreen
export const fetchNovelForHome = async () => {
    try {
        const response = await fetch(`${API_URL}novel/novels/novelforhome`);
        console.log(`${API_URL}novel/novels/novelforhome`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};


// Hàm để lấy dữ liệu truyện theo novelId
export const fetchNovelById = async (novelId) => {

    const cachedNovel = getCache(`novel_${novelId}`, CACHE_TTL);
    if (cachedNovel) {
        return cachedNovel;
    }

    try {
        const response = await fetch(`${API_URL}novel/novels/${novelId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`${API_URL}novel/novels/${novelId}`)
        const data = await response.json();
        setCache(`novel_${novelId}`, data);

        return data;
    } catch (error) {
        throw error;
    }
};


//Hàm để lấy dữ liệu chương truyện theo Id truyện
export const fetchChapterById = async (chapterId) => {

    const cachedChapter = getCache(`chapter_${chapterId}`, CACHE_TTL);
    if (cachedChapter) {
        return cachedChapter;
    }

    try {
        const response = await fetch(`${API_URL}chapter/${chapterId}`);
        console.log(`${API_URL}chapter/${chapterId}`)
        const data = await response.json();
        setCache(`chapter_${chapterId}`, data);
        return data;
    } catch (error) {
        throw error;
    }
};


//Hàm để lấy danh sách chương theo Id truyện
export const fetchChaptersByNovelId = async (novelId) => {

    const cachedChapters = getCache(`chapters_${novelId}`, CACHE_TTL);
    if (cachedChapters) {
        return cachedChapters;
    }

    try {
        const response = await axios.get(`${API_URL}novel/chapters/novel/${novelId}`);
        const data = response.data;
        setCache(`chapters_${novelId}`, data); 
        return data;
    } catch (error) {
        throw error;
    }
};

// Hàm call API cập nhật vị trí đọc
export const updateReadingProgress = async (userId, novelId, chapterId, position) => {
    try {
        const response = await axios.post(`${API_URL}user/updateReadingProgress`, {
            userId,
            novelId,
            chapterId,
            position,
        });
        console.log('Reading progress updated:', response.data);
    } catch (error) {
        console.error('Error updating reading progress:', error);
    }
};

// Hàm để lấy truyện đang đọc
export const fetchReadingProgress = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}user/readingHistory/${userId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};

// Hàm gọi API tìm kiếm
export const searchNovels = async (searchQuery) => {
    try {
        const response = await axios.get(`${API_URL}novel/search`, {
            params: { query: searchQuery }
        });
        return response.data.novels;
    } catch (err) {
        throw new Error('Không có kết quả tìm kiếm.');
    }
};

// Hàm để lấy bình luận của truyện theo Id
export const fetchComment = async (novelId) => {
    try {
        const response = await axios.get(`${API_URL}comment/novels/${novelId}/comments`);
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};

// Hàm để bình luận một truyện
export const postComment = async (content, userId, novelId, chapterId) => {
    try {
      const response = await axios.post(`${API_URL}comment/comments`, {
        content,
        userId,
        novelId,
        chapterId
      });
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

// Hàm để phản hồi 1 bình luận của truyện
export const postReply = async (content, userId, parentComment) => {
    try {
      const response = await axios.post(`${API_URL}comment/comments/reply`, {
        content,
        userId,
        parentComment
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };