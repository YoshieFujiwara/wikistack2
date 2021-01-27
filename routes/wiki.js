const { Router } = require('express');
const express = require('express');
const router = express.Router();
//DB
const models = require(`../models`);
const Page = models.Page;
const User = models.User;
//HTML
const { addPage, main, wikiPage, editPage } = require('../views');

router.get('/', async (req, res, next) => {
  try {
    let pages = await Page.findAll();
    //res.json(pages);
    // console.log(
    //   pages.map(page => {
    //     return page.slug;
    //   })
    // );
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let pageTitle = req.body.title;
    let pageContent = req.body.content;

    const user = await User.findOrCreate({
      where: { name: 'Cody', email: 'cody@email.com' },
    });

    const page = await Page.create({
      title: `${pageTitle}`,
      content: `${pageContent}`,
    });

    await page.setAuthor(user[0]);

    res.redirect(`/${page.slug}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/add', (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: `${req.params.slug}` } });

    if (page === null) {
      res.status(404).send('This page does not exist');
    } else {
      const author = await User.findOne({ where: { id: page.authorId } });

      res.send(wikiPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:slug', async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    const [updatedPageNum, page] = await Page.update(req.body, {
      where: { slug: req.params.slug },
      returning: true,
    });
    console.log('updatedPages', page[0].slug, page);
    res.redirect(`/wiki/${page[0].slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug/delete', async (req, res, next) => {
  try {
    const deletedPage = await Page.destroy({
      where: { slug: req.params.slug },
    });
    res.redirect('/wiki');
  } catch (error) {
    next(error);
  }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: `${req.params.slug}` } });

    if (page === null) {
      res.status(404).send('This page does not exist');
    } else {
      const author = await User.findOne({ where: { id: page.authorId } });

      res.send(editPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
