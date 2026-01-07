const { sql, query } = require('../services/db');
const { success, error } = require('../utils/response');

// List all products (with optional filters)
async function listProducts(req, res) {
  const { category, status, featured } = req.query;

  try {
    let queryStr = `
      SELECT id, name, description, price, category, imageUrl, inventory, 
             isFeatured, isPromotion, promotionPrice, status, createdAt, updatedAt
      FROM Products
      WHERE 1=1
    `;
    const params = [];

    if (category) {
      queryStr += ` AND category = @category`;
      params.push({ name: 'category', type: sql.NVarChar, value: category });
    }

    if (status) {
      queryStr += ` AND status = @status`;
      params.push({ name: 'status', type: sql.NVarChar, value: status });
    }

    if (featured === 'true') {
      queryStr += ` AND isFeatured = 1`;
    }

    queryStr += ` ORDER BY createdAt DESC`;

    const products = await query(queryStr, params);

    // Convert BIT fields to boolean
    const productsWithBool = products.map(product => ({
      ...product,
      isFeatured: product.isFeatured === true || product.isFeatured === 1 || (Buffer.isBuffer(product.isFeatured) && product.isFeatured[0] === 1),
      isPromotion: product.isPromotion === true || product.isPromotion === 1 || (Buffer.isBuffer(product.isPromotion) && product.isPromotion[0] === 1)
    }));

    return success(res, { products: productsWithBool });
  } catch (err) {
    console.error('List products error:', err);
    return error(res, 'Không thể lấy danh sách sản phẩm', 500, err.message);
  }
}

// Get product by ID
async function getProduct(req, res) {
  const { id } = req.params;

  try {
    const products = await query(
      `SELECT id, name, description, price, category, imageUrl, inventory, 
              isFeatured, isPromotion, promotionPrice, status, createdAt, updatedAt
       FROM Products
       WHERE id = @id`,
      [{ name: 'id', type: sql.Int, value: parseInt(id) }]
    );

    if (!products || products.length === 0) {
      return error(res, 'Không tìm thấy sản phẩm', 404);
    }

    const product = products[0];
    const productWithBool = {
      ...product,
      isFeatured: product.isFeatured === true || product.isFeatured === 1 || (Buffer.isBuffer(product.isFeatured) && product.isFeatured[0] === 1),
      isPromotion: product.isPromotion === true || product.isPromotion === 1 || (Buffer.isBuffer(product.isPromotion) && product.isPromotion[0] === 1)
    };

    return success(res, productWithBool);
  } catch (err) {
    console.error('Get product error:', err);
    return error(res, 'Không thể lấy thông tin sản phẩm', 500, err.message);
  }
}

// Create new product
async function createProduct(req, res) {
  const { name, description, price, category, imageUrl, inventory, isFeatured, isPromotion, promotionPrice, status } = req.body;

  try {
    if (!name || !price || !category) {
      return error(res, 'Tên, giá và danh mục sản phẩm là bắt buộc', 400);
    }

    const priceNum = typeof price === 'string' ? parseFloat(price) : Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return error(res, 'Giá sản phẩm phải lớn hơn 0', 400);
    }

    const promotionPriceNum = isPromotion && promotionPrice 
      ? (typeof promotionPrice === 'string' ? parseFloat(promotionPrice) : Number(promotionPrice))
      : null;

    if (isPromotion && promotionPriceNum && (isNaN(promotionPriceNum) || promotionPriceNum >= priceNum)) {
      return error(res, 'Giá khuyến mãi phải nhỏ hơn giá gốc', 400);
    }

    const result = await query(
      `INSERT INTO Products (name, description, price, category, imageUrl, inventory, 
                            isFeatured, isPromotion, promotionPrice, status)
       OUTPUT INSERTED.id, INSERTED.name, INSERTED.description, INSERTED.price, 
              INSERTED.category, INSERTED.imageUrl, INSERTED.inventory,
              INSERTED.isFeatured, INSERTED.isPromotion, INSERTED.promotionPrice, 
              INSERTED.status, INSERTED.createdAt, INSERTED.updatedAt
       VALUES (@name, @description, @price, @category, @imageUrl, @inventory,
               @isFeatured, @isPromotion, @promotionPrice, @status)`,
      [
        { name: 'name', type: sql.NVarChar, value: name },
        { name: 'description', type: sql.NVarChar, value: description || null },
        { name: 'price', type: sql.Decimal(18, 2), value: priceNum },
        { name: 'category', type: sql.NVarChar, value: category },
        { name: 'imageUrl', type: sql.NVarChar, value: imageUrl || null },
        { name: 'inventory', type: sql.Int, value: inventory ? parseInt(inventory) : 0 },
        { name: 'isFeatured', type: sql.Bit, value: isFeatured || false },
        { name: 'isPromotion', type: sql.Bit, value: isPromotion || false },
        { name: 'promotionPrice', type: sql.Decimal(18, 2), value: promotionPriceNum || null },
        { name: 'status', type: sql.NVarChar, value: status || 'active' }
      ]
    );

    if (!result || result.length === 0) {
      return error(res, 'Không thể tạo sản phẩm', 500);
    }

    const product = result[0];
    const productWithBool = {
      ...product,
      isFeatured: product.isFeatured === true || product.isFeatured === 1 || (Buffer.isBuffer(product.isFeatured) && product.isFeatured[0] === 1),
      isPromotion: product.isPromotion === true || product.isPromotion === 1 || (Buffer.isBuffer(product.isPromotion) && product.isPromotion[0] === 1)
    };

    return success(res, productWithBool, 201);
  } catch (err) {
    console.error('Create product error:', err);
    return error(res, 'Tạo sản phẩm thất bại', 500, err.message);
  }
}

// Update product
async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, price, category, imageUrl, inventory, isFeatured, isPromotion, promotionPrice, status } = req.body;

  try {
    if (!name || !price || !category) {
      return error(res, 'Tên, giá và danh mục sản phẩm là bắt buộc', 400);
    }

    const priceNum = typeof price === 'string' ? parseFloat(price) : Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return error(res, 'Giá sản phẩm phải lớn hơn 0', 400);
    }

    const promotionPriceNum = isPromotion && promotionPrice 
      ? (typeof promotionPrice === 'string' ? parseFloat(promotionPrice) : Number(promotionPrice))
      : null;

    if (isPromotion && promotionPriceNum && (isNaN(promotionPriceNum) || promotionPriceNum >= priceNum)) {
      return error(res, 'Giá khuyến mãi phải nhỏ hơn giá gốc', 400);
    }

    const result = await query(
      `UPDATE Products 
       SET name = @name, description = @description, price = @price, category = @category,
           imageUrl = @imageUrl, inventory = @inventory, isFeatured = @isFeatured,
           isPromotion = @isPromotion, promotionPrice = @promotionPrice, status = @status,
           updatedAt = GETDATE()
       OUTPUT INSERTED.id, INSERTED.name, INSERTED.description, INSERTED.price, 
              INSERTED.category, INSERTED.imageUrl, INSERTED.inventory,
              INSERTED.isFeatured, INSERTED.isPromotion, INSERTED.promotionPrice, 
              INSERTED.status, INSERTED.createdAt, INSERTED.updatedAt
       WHERE id = @id`,
      [
        { name: 'id', type: sql.Int, value: parseInt(id) },
        { name: 'name', type: sql.NVarChar, value: name },
        { name: 'description', type: sql.NVarChar, value: description || null },
        { name: 'price', type: sql.Decimal(18, 2), value: priceNum },
        { name: 'category', type: sql.NVarChar, value: category },
        { name: 'imageUrl', type: sql.NVarChar, value: imageUrl || null },
        { name: 'inventory', type: sql.Int, value: inventory ? parseInt(inventory) : 0 },
        { name: 'isFeatured', type: sql.Bit, value: isFeatured || false },
        { name: 'isPromotion', type: sql.Bit, value: isPromotion || false },
        { name: 'promotionPrice', type: sql.Decimal(18, 2), value: promotionPriceNum || null },
        { name: 'status', type: sql.NVarChar, value: status || 'active' }
      ]
    );

    if (!result || result.length === 0) {
      return error(res, 'Không tìm thấy sản phẩm', 404);
    }

    const product = result[0];
    const productWithBool = {
      ...product,
      isFeatured: product.isFeatured === true || product.isFeatured === 1 || (Buffer.isBuffer(product.isFeatured) && product.isFeatured[0] === 1),
      isPromotion: product.isPromotion === true || product.isPromotion === 1 || (Buffer.isBuffer(product.isPromotion) && product.isPromotion[0] === 1)
    };

    return success(res, productWithBool);
  } catch (err) {
    console.error('Update product error:', err);
    return error(res, 'Cập nhật sản phẩm thất bại', 500, err.message);
  }
}

// Delete product
async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const products = await query(
      `SELECT id FROM Products WHERE id = @id`,
      [{ name: 'id', type: sql.Int, value: parseInt(id) }]
    );

    if (!products || products.length === 0) {
      return error(res, 'Không tìm thấy sản phẩm', 404);
    }

    await query(
      `DELETE FROM Products WHERE id = @id`,
      [{ name: 'id', type: sql.Int, value: parseInt(id) }]
    );

    return success(res, { message: 'Xóa sản phẩm thành công', id: parseInt(id) });
  } catch (err) {
    console.error('Delete product error:', err);
    return error(res, 'Xóa sản phẩm thất bại', 500, err.message);
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};

