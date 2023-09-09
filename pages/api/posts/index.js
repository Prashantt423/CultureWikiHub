import { ValidateProps } from '@/api-lib/constants';
import { findPosts, insertPost } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const posts = await findPosts(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ posts });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      content: ValidateProps.post.content,
      title:ValidateProps.post.title,
      tags:ValidateProps.post.tags,
      language:ValidateProps.post.language,
    },
    required: ['content','title','language'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    let obj =  {
      content: req.body.content,
      title: req.body.title,
      tags:req.body.tags,
      language:req.body.language,
      creatorId: req.user._id,
    }
    const post = await insertPost(db, obj);

    return res.json({ post });
  }
);

export default handler;
