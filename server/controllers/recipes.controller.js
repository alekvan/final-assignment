const jwt = require('jsonwebtoken');
const Recipes = require('../models/recipe.model');
const Users = require('../models/user.model');
const response = require('../util/responseHandler');
const { unlink } = require('fs');

require('dotenv').config();

const getAll = async (req, res) => {
  try {
    const allRecipes = await Recipes.find();

    response(res, 200, 'All recipes from DB', { allRecipes });
  } catch (err) {
    console.log(err);
  }
};

const getBreakfastRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: 'breakfast' });
    console.log(req.query);

    const pageSize = 9;
    // number of current page from query string
    const pageNumber = Number(req.query.pageNumber) || 1;
    // number of first products to skip from the products list
    const skip = pageSize * (pageNumber - 1);
    // server response

    response(res, 200, 'Breakfast recipes', {
      recipes: recipes.slice(skip, skip + pageSize),
      pageNumber,
      pageSize,
      pages: Math.ceil(recipes.length / pageSize),
    });
  } catch (error) {
    response(res, 404, 'Not found');
  }
};
const getBrunchRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: 'brunch' });

    const pageSize = 9;
    // number of current page from query string
    const pageNumber = Number(req.query.pageNumber) || 1;
    // number of first products to skip from the products list
    const skip = pageSize * (pageNumber - 1);
    // server response

    response(res, 200, 'Breakfast recipes', {
      recipes: recipes.slice(skip, skip + pageSize),
      pageNumber,
      pageSize,
      pages: Math.ceil(recipes.length / pageSize),
    });
  } catch (error) {
    response(res, 404, 'Not found');
  }
};
const getLunchRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: 'lunch' });

    const pageSize = 9;
    // number of current page from query string
    const pageNumber = Number(req.query.pageNumber) || 1;
    // number of first products to skip from the products list
    const skip = pageSize * (pageNumber - 1);
    // server response

    response(res, 200, 'Breakfast recipes', {
      recipes: recipes.slice(skip, skip + pageSize),
      pageNumber,
      pageSize,
      pages: Math.ceil(recipes.length / pageSize),
    });
  } catch (error) {
    response(res, 404, 'Not found');
  }
};
const getDinnerRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: 'dinner' });

    const pageSize = 9;
    // number of current page from query string
    const pageNumber = Number(req.query.pageNumber) || 1;
    // number of first products to skip from the products list
    const skip = pageSize * (pageNumber - 1);
    // server response

    response(res, 200, 'Breakfast recipes', {
      recipes: recipes.slice(skip, skip + pageSize),
      pageNumber,
      pageSize,
      pages: Math.ceil(recipes.length / pageSize),
    });
  } catch (error) {
    response(res, 404, 'Not found');
  }
};

const newRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    const filteredRecipes = recipes.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });

    const firstThree = filteredRecipes.reverse();

    const pageSize = 3;
    // number of current page from query string
    const pageNumber = Number(req.query.pageNumberNew) || 1;
    // number of first products to skip from the products list
    const skip = pageSize * (pageNumber - 1);
    // server response

    response(res, 200, 'Latest recipes', {
      recipes: firstThree.slice(skip, skip + pageSize),
      pageNumber,
      pageSize,
      pages: 3,
    });
  } catch (error) {
    response(res, 404, 'Not Found');
  }
};
const popularRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();

    const pageSize = 3;
    // number of current page from query string
    const pageNumber = Number(req.query.pageNumberPopular) || 1;
    // number of first products to skip from the products list
    const skip = pageSize * (pageNumber - 1);
    // server response

    response(res, 200, 'Popular recipes', {
      recipes: recipes.slice(skip, skip + pageSize),
      pageNumber,
      pageSize,
      pages: 3,
    });
  } catch (error) {
    response(res, 404, 'Not Found');
  }
};

const getOneById = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.recipeId);

    response(res, 200, `Recipe with ID#${req.params.recipeId} is fetched`, {
      recipe,
    });
  } catch (err) {
    console.log(err);
    response(res, 404, `Recipe not found`);
  }
};

const likes = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.body.recipeId);
    const userId = req.body.userId;
    const recipeId = req.body.recipeId;
    if (recipe.likes.includes(userId)) {
      await Recipes.findByIdAndUpdate(recipeId, {
        $pull: { likes: userId },
      });
      response(res, 200, 'Unliked', { like: false, likeArr: recipe.likes });
    } else {
      await Recipes.findByIdAndUpdate(recipeId, {
        $push: { likes: userId },
      });
      response(res, 200, 'Liked', { like: true, likeArr: recipe.likes });
    }
  } catch (err) {
    response(res, 404, err);
  }
};

const create = async (req, res) => {
  try {
    req.body.createdBy = req.params.id;
    req.body.recipeImg = `http://localhost:5000/images/${req.file.filename}`;
    req.body.likes = 0;
    const newRecipe = await Recipes.create(req.body);

    await Users.findByIdAndUpdate(req.params.id, {
      $push: { recipes: newRecipe._id },
    });

    response(res, 201, `Created new recipe`, { newRecipe });
  } catch (error) {
    console.log(req.body);
    console.log(error);
    response(res, 400, 'Invalid input');
  }
};

const edit = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.recipeId);
    const oldImgFilename = recipe.recipeImg.split('/');
    console.log(oldImgFilename);
    unlink(`public/images/${oldImgFilename[4]}`, (err) => {
      if (err) throw err;
      console.log('Old image was deleted');
    });
    req.body.likes = recipe.likes;
    req.body.createdBy = recipe.createdBy;
    if (req.file.filename) {
      req.body.recipeImg = `http://localhost:5000/images/${req.file.filename}`;
    }
    await Recipes.findByIdAndUpdate(req.params.recipeId, req.body);
    response(res, 200, 'Recipe updated');
  } catch (error) {
    response(res, 401, 'Invalid input');
  }
};

const destroy = async (req, res) => {
  const authToken = await req.headers.authorization;
  const token = authToken.split(' ')[1];
  const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = await tokenData.id;
  await Users.findByIdAndUpdate(userId, {
    $pull: { recipes: [req.params.id] },
  });
  const deletedRecipe = await Recipes.findById(req.params.id);
  await Recipes.findByIdAndDelete(req.params.id);

  response(res, 200, 'Recipe deleted', {});
};

module.exports = {
  getAll,
  getOneById,
  create,
  getBreakfastRecipes,
  getBrunchRecipes,
  getDinnerRecipes,
  getLunchRecipes,
  newRecipes,
  popularRecipes,
  destroy,
  likes,
  edit,
};
