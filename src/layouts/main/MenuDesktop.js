import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Box, Link, Stack, Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

function ParentItem({ path, title, open, hasSub, ...other }) {
  const activeStyle = {
    color: 'primary.main'
  };

  return (
    <Link
      to={path}
      component={RouterLink}
      underline="none"
      color="inherit"
      variant="subtitle2"
      sx={{
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        textTransform: 'capitalize',
        height: 64,
        lineHeight: `64px`,
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': activeStyle,
        ...(open && activeStyle)
      }}
      {...other}
    >
      {title}
      {/* {hasSub && <Box component={Icon} icon={chevronDownFill} sx={{ ml: 1, width: 20, height: 20 }} />} */}
    </Link>
  );
}

function MegaMenuItem({ item }) {
  const { title, icon, children, path } = item;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <>
        <ParentItem onMouseEnter={handleOpen} onMouseLeave={handleClose} path={path} title={title} open={open} />

        {/* {open && (
          <Paper
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{
              p: 3,
              width: 130,
              zIndex: (theme) => theme.zIndex.modal,
              boxShadow: (theme) => theme.customShadows.z20
            }}
          >
            <Stack>
              {children.map((item) => (
                <Typography>{item.title}</Typography>
              ))}
            </Stack>
          </Paper>
        )} */}
      </>
    );
  }

  return <ParentItem path={path} title={title} />;
}

export default function MenuDesktop({ navConfig }) {
  return (
    <Stack direction="row" spacing={4}>
      {navConfig.map((link) => (
        <MegaMenuItem key={link.title} item={link} />
      ))}
    </Stack>
  );
}
