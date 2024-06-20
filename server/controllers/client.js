import Products from '../models/products.js';


export const getProducts = async (req, res) => {
    try {
      
      const { page = 1, pageSize = 2, sort = null, search = "" } = req.query;
  
      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };
  
        return sortFormatted;
      };
      const sortFormatted = Boolean(sort) ? generateSort() : {};
  
      const products = await Products.find({
        $or: [
          { name: { $regex: new RegExp(search, "i") } },
        ],
      })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);
  
      const total = await Products.countDocuments({
        name: { $regex: search, $options: "i" },
      });
  
      res.status(200).json({
        products,
        total,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const getProductDetails = async (req, res) => {
    try {
      
      const { page = 1, pageSize = 2, sort = null, search = "",itemName} = req.query;
      
      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };
  
        return sortFormatted;
      };
      const sortFormatted = Boolean(sort) ? generateSort() : {};
      var data = itemName;
      const productDetails = await Products.find({
        'name' : {$regex:new RegExp(data, 'i')}
      })

  
      const total = await Products.countDocuments({
        name: { $regex: search, $options: "i" },
      });
  
      res.status(200).json({
        productDetails,
        total,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  