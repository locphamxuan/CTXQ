const { getDetailedContent } = require('../services/newsContentGenerator');
const { getAllLatestNews, getNewsByCategory } = require('../services/newsGenerator');
const { success, error } = require('../utils/response');

async function getBlogPost(req, res) {
  const { id } = req.params;
  
  try {
    // Get all news and find the one with matching id
    const allNews = getAllLatestNews();
    const post = allNews.find(p => p.id === id);
    
    if (!post) {
      return error(res, 'Không tìm thấy bài viết', 404);
    }
    
    // Get detailed content
    const detailedContent = getDetailedContent(post);
    
    return success(res, {
      ...post,
      content: detailedContent
    });
  } catch (err) {
    console.error('Error in getBlogPost:', err);
    return error(res, 'Không thể tải bài viết', 500, err.message);
  }
}

module.exports = {
  getBlogPost
};

