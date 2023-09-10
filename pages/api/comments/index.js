import { ValidateProps } from '@/api-lib/constants';
import { findPostById } from '@/api-lib/db';
import { findByIdAndUpdate } from '@/api-lib/db/comment';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }
  const db = await getMongoDb();
  const userId = req.user._id;
  console.log(req.query);
  const commentId = req.query.comment;
  const vote = req.query.vote;
  const q =
    vote === 'upvote'
      ? {
          $push: { upvotes: userId },
        }
      : {
          $push: { downvotes: userId },
        };
  console.log(q);
  console.log(commentId);
  const updatedComment = await findByIdAndUpdate(db, commentId, q);
  return res.json({ updatedComment });
});

export default handler;
