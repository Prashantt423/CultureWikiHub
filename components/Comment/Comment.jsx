import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import styles from './Comment.module.css';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { useCurrentUser } from '@/lib/user';
import { fetcher } from '@/lib/fetch';
const Comment = ({ comment, className }) => {
  const { data, error } = useCurrentUser();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(comment.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} ago`;
  }, [comment.createdAt]);
  useEffect(() => {
    if (!data) return;
    console.log(data);
    const id = data.user._id;
    if (comment.upvotes?.includes(id)) setIsUpvoted(true);
    if (comment.downvotes?.includes(id)) setIsDownvoted(true);
  }, [data, comment.upvotes, comment.downvotes]);
  const handleUpvote = async () => {
    try {
      if (!isUpvoted && !isDownvoted) {
        const updatedComment = await fetcher(
          `/api/comments?vote=upvote&comment=${comment._id}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log('Updates comment\n', updatedComment);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDownvote = async () => {
    try {
      if (!isUpvoted && !isDownvoted) {
        const updatedComment = await fetcher(
          `/api/comments?vote=downvote&comment=${comment._id}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log('Updates comment\n', updatedComment);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={clsx(styles.root, className)}>
      <Link href={`/user/${comment.creator.username}`}>
        <a>
          <Container className={styles.creator}>
            <Avatar
              size={36}
              url={comment.creator.profilePicture}
              username={comment.creator.username}
            />
            <Container column className={styles.meta}>
              <p className={styles.name}>{comment.creator.name}</p>
              <p className={styles.username}>{comment.creator.username}</p>
            </Container>
          </Container>
        </a>
      </Link>
      <div className={styles.wrap}>
        <p className={styles.content}>{comment.content}</p>
      </div>
      <div className={styles.wrap}>
        <time dateTime={String(comment.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
      </div>
      <br />
      <div className={styles.vote}>
        <ArrowUpwardOutlinedIcon
          style={{
            color: isUpvoted ? 'red' : 'black',
            fontSize: '18px',
            cursor: 'pointer',
          }}
          onClick={handleUpvote}
        />
        {comment.upvotes?.length - (comment.downvotes?.length || 0) || 0}
        <ArrowDownwardOutlinedIcon
          style={{
            color: isDownvoted ? 'red' : 'black',
            fontSize: '18px',
            cursor: 'pointer',
          }}
          onClick={handleDownvote}
        />
      </div>
    </div>
  );
};

export default Comment;
