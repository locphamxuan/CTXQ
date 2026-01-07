const {
  newsHighlights,
  businessDomains,
  blogCategories
} = require('../data/staticContent');
const { query, sql } = require('../services/db');
const { success, error } = require('../utils/response');
const { getAllLatestNews, getNewsByCategory } = require('../services/newsGenerator');

async function getDomains(req, res) {
  try {
    const data = await fetchMany(
      `SELECT id, title, summary, quickLinks, contentJson AS content
       FROM BusinessDomains ORDER BY displayOrder`,
      businessDomains
    );
    return success(res, data);
  } catch (err) {
    return error(res, 'Không thể tải lĩnh vực kinh doanh', 500, err.message);
  }
}

async function getDomainById(req, res) {
  const { domainId } = req.params;

  try {
    const data = await fetchSingle(
      `SELECT id, title, summary, quickLinks, contentJson AS content
       FROM BusinessDomains
       WHERE id = @domainId`,
      businessDomains.find((domain) => domain.id === domainId),
      [{ name: 'domainId', type: sql.NVarChar, value: domainId }]
    );

    if (!data) {
      return error(res, 'Không tìm thấy lĩnh vực', 404);
    }
    return success(res, data);
  } catch (err) {
    return error(res, 'Không thể tải lĩnh vực', 500, err.message);
  }
}

async function getBlog(req, res) {
  const { category } = req.query;
  try {
    // Try to fetch from database first
    let sqlQuery = `SELECT id, title, summary, category, image, publishedAt
                    FROM BlogPosts`;
    const params = [];
    if (category) {
      sqlQuery += ' WHERE category = @category';
      params.push({ name: 'category', type: sql.NVarChar, value: category });
    }
    sqlQuery += ' ORDER BY publishedAt DESC';

    let posts = [];
    try {
      posts = await fetchMany(sqlQuery, [], params);
    } catch (dbErr) {
      console.log('Database query failed, using generated news:', dbErr.message);
    }

    // If no posts from database, use auto-generated news
    if (!posts || posts.length === 0) {
      if (category) {
        // Get news for specific category
        posts = getNewsByCategory(category);
      } else {
        // Get all news
        posts = getAllLatestNews();
      }
    } else if (category) {
      // If we have posts from DB but category filter is active, filter them
      posts = posts.filter(post => post.category === category);
    }

    // Update categories to match new structure
    const updatedCategories = ['sam-han-quoc', 'my-pham', 'thoi-trang', 'tu-van-thuong-mai'];
    
    return success(res, { 
      categories: updatedCategories, 
      posts: posts.slice(0, 20) // Limit to 20 most recent posts
    });
  } catch (err) {
    console.error('Error in getBlog:', err);
    // Fallback to generated news if everything fails
    const filteredNews = category 
      ? getNewsByCategory(category)
      : getAllLatestNews();
    
    return success(res, { 
      categories: ['sam-han-quoc', 'my-pham', 'thoi-trang', 'tu-van-thuong-mai'], 
      posts: filteredNews.slice(0, 20)
    });
  }
}

async function submitContact(req, res) {
  const { fullName, email, phone, message } = req.body;

  try {
    await query(
      `INSERT INTO ContactRequests (fullName, email, phone, message)
       VALUES (@fullName, @email, @phone, @message)`,
      [
        { name: 'fullName', type: sql.NVarChar, value: fullName },
        { name: 'email', type: sql.NVarChar, value: email },
        { name: 'phone', type: sql.NVarChar, value: phone },
        { name: 'message', type: sql.NVarChar, value: message }
      ]
    );

    return success(res, { message: 'Chúng tôi đã nhận được thông tin của bạn.' }, 201);
  } catch (err) {
    return error(
      res,
      'Lưu thông tin liên hệ thất bại, vui lòng thử lại sau.',
      500,
      err.message
    );
  }
}

async function fetchSingle(sqlQuery, fallback, params = []) {
  try {
    const [result] = await query(sqlQuery, params);
    if (!result) {
      return fallback;
    }
    return normalize(result);
  } catch (err) {
    return fallback;
  }
}

async function fetchMany(sqlQuery, fallback, params = []) {
  try {
    const result = await query(sqlQuery, params);
    if (!result?.length) {
      return fallback;
    }
    return result.map(normalize);
  } catch (err) {
    return fallback;
  }
}

function normalize(entry) {
  return Object.fromEntries(
    Object.entries(entry).map(([key, value]) => {
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          return [key, parsed];
        } catch (err) {
          return [key, value];
        }
      }
      return [key, value];
    })
  );
}

module.exports = {
  getDomains,
  getDomainById,
  getBlog,
  submitContact
};

