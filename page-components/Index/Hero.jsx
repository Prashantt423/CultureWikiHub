import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper>
      <div>
        <br />
        <div className={styles.logo}>
          <img src="/images/cultureHub_logo_2.jpg" width={200} alt="" />
        </div>
        <br />
        <h1 className={styles.title}>
          <span>Culture Wiki Hub</span>
        </h1>

        <Container justifyContent="center" className={styles.buttons}>
          <Container>
            <Link passHref href="/feed">
              <ButtonLink className={styles.button}>Explore magic</ButtonLink>
            </Link>
          </Container>
          <Spacer axis="horizontal" size={1} />
          <Container></Container>
        </Container>
        <p className={styles.subtitle}>
          A place to preserve Himalayan culture and traditions. Jump into the
          essence of strong <b>Virasat</b> by contributing to the community for
          future generation
        </p>
      </div>
    </Wrapper>
  );
};

export default Hero;
