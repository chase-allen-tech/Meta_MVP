// material
import { Container } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogNewPostForm } from '../../components/_dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Craete New Item">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 20 }}>
        <HeaderBreadcrumbs heading="Create a new item" links={[{ name: 'Home', href: '/' }, { name: 'New Item' }]} />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
