export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 160 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 10000 },
    title: { type: 'string', minLength: 1, maxLength: 100 },
    tags: { type: 'array', items: { type: 'string' } },
    language: { type: 'string', minLength: 1, maxLength: 100 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
    upvotes: { type: 'array', items: { type: 'string' } },
    downvotes: { type: 'array', items: { type: 'string' } },
  },
};
