import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from '.';

export async function findComments(db, postId, before, limit = 10) {
  return db
    .collection('comments')
    .aggregate([
      {
        $match: {
          postId: new ObjectId(postId),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export async function insertComment(db, postId, { content, creatorId }) {
  const comment = {
    content,
    postId: new ObjectId(postId),
    creatorId,
    createdAt: new Date(),
    upvotes: [],
    downvotes: [],
  };
  const { insertedId } = await db.collection('comments').insertOne(comment);
  comment._id = insertedId;
  return comment;
}

export async function findByIdAndUpdate(db, commentId, update) {
  try {
    const commentObjectId = new ObjectId(commentId);

    // Use findOneAndUpdate to find the comment by its _id and update it
    const result = await db.collection('comments').findOneAndUpdate(
      { _id: commentObjectId },
      update, // Use the provided `update` object to push a new entry
      { returnOriginal: false } // Set returnOriginal to false to get the updated document
    );

    return result.value; // Return the updated comment
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
}
