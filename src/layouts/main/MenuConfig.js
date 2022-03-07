import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
import roundGrain from '@iconify/icons-ic/round-grain';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE, PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Marketplace',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '/dashboard',
    children: [
      { title: 'About us', path: PATH_PAGE.about },
      { title: 'Contact us', path: PATH_PAGE.contact },
      { title: 'FAQs', path: PATH_PAGE.faqs },
      { title: 'Pricing', path: PATH_PAGE.pricing },
      { title: 'Payment', path: PATH_PAGE.payment },
      { title: 'Maintenance', path: PATH_PAGE.maintenance },
      { title: 'Coming Soon', path: PATH_PAGE.comingSoon }
    ]
  },
  {
    title: 'Create',
    path: '/create',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />
  }
];

export default menuConfig;
