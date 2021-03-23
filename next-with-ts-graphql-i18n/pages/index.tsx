import Layout from '../components/Layout';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const IndexPage = ({ t }: any): JSX.Element => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>{t('hello_message')}</h1>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withTranslation('common')(IndexPage);
