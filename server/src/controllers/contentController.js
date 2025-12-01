const {
  heroContent,
  missionContent,
  newsHighlights,
  aboutContent,
  businessDomains,
  blogCategories
} = require('../data/staticContent');
const { query, sql } = require('../services/db');
const { success, error } = require('../utils/response');

async function getHome(req, res) {
  try {
    const [hero, mission, news] = await Promise.all([
      fetchSingle(
        `SELECT TOP 1 headline, subheadline, ctaPrimaryLabel AS ctaPrimaryLabel,
            ctaPrimaryHref AS ctaPrimaryHref, ctaSecondaryLabel AS ctaSecondaryLabel,
            ctaSecondaryHref AS ctaSecondaryHref
         FROM HeroSections ORDER BY updatedAt DESC`,
        heroContent
      ),
      fetchSingle(
        `SELECT TOP 1 mission, differentiators
         FROM MissionStatements ORDER BY updatedAt DESC`,
        missionContent
      ),
      fetchMany('SELECT TOP 3 id, title, category, publishedAt FROM NewsHighlights ORDER BY publishedAt DESC', newsHighlights)
    ]);

    return success(res, {
      hero,
      mission,
      news
    });
  } catch (err) {
    return error(res, 'Không thể tải dữ liệu trang chủ', 500, err.message);
  }
}

async function getAbout(req, res) {
  try {
    const data = await fetchSingle(
      `SELECT TOP 1 story, vision, mission, valuesJson AS values, foundersJson AS founders, timelineJson AS timeline
       FROM AboutSections ORDER BY updatedAt DESC`,
      aboutContent
    );
    return success(res, data);
  } catch (err) {
    return error(res, 'Không thể tải dữ liệu giới thiệu', 500, err.message);
  }
}

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
    let sqlQuery = `SELECT id, title, summary, category, image, publishedAt
                    FROM BlogPosts`;
    const params = [];
    if (category) {
      sqlQuery += ' WHERE category = @category';
      params.push({ name: 'category', type: sql.NVarChar, value: category });
    }
    sqlQuery += ' ORDER BY publishedAt DESC';

    const fallback = newsHighlights.map((item) => ({
      ...item,
      summary: item.title,
      image: null
    }));

    const posts = await fetchMany(sqlQuery, fallback, params);
    return success(res, { categories: blogCategories, posts });
  } catch (err) {
    return error(res, 'Không thể tải blog', 500, err.message);
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
  getHome,
  getAbout,
  getDomains,
  getDomainById,
  getBlog,
  submitContact
};

