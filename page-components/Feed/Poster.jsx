import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Poster.module.css';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const PosterInner = ({ user }) => {
  const contentRef = useRef();
  const titleRef = useRef();
  const languageRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const { mutate } = usePostPages();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: contentRef.current.value,
            title: titleRef.current.value,
            tags: tags.map((t) => t.text),
            language: languageRef.current.value,
          }),
        });
        toast.success('You have posted successfully');
        contentRef.current.value = '';
        titleRef.current.value = '';
        languageRef.current.value = '';
        setTags([]);
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, tags]
  );

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagInputChange = (d) => {
    // console.log(d);
  };

  return (
    <form onSubmit={onSubmit}>
      <Container className={styles.poster}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <label htmlFor="title">Title:&nbsp;</label>
            <input name="title" type="text" ref={titleRef} />
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <label htmlFor="title">Language:&nbsp;</label>
            <input name="title" type="text" ref={languageRef} />
          </div>
          <br />
          {/* <Avatar
            size={40}
            username={user.username}
            url={user.profilePicture}
          /> */}
          <label htmlFor="content">Content:&nbsp;</label>
          <br />
          <textarea
            ref={contentRef}
            name="content"
            className={styles.input}
            rows={4}
            cols={40}
            placeholder={`Woah! save the culture for future., ${user.name}?`}
            ariaLabel={`Woah! save the culture for future., ${user.name}?`}
          />
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: '2rem 0',
            height: '150px',
          }}
        >
          <label htmlFor="">Tags:&nbsp;</label>
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            handleInputChange={handleTagInputChange}
            inputFieldPosition="bottom"
            autocomplete
          />
          <br />
        </div>
        <br />
        <Button type="success" loading={isLoading}>
          Post
        </Button>
      </Container>
    </form>
  );
};

const Poster = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        <h3 className={styles.heading}>😍Contibute to community!</h3>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
            to post
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
