import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
// utils
import fakeRequest from '../../../utils/fakeRequest';
//
import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
//
import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    supply: Yup.number().min(1),
    price: Yup.number().min(0),
    cover: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      content: '',
      cover: null,
      tags: ['Logan'],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ['Logan']
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('cover', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <LabelStyle>Cover</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.cover}
                      onDrop={handleDrop}
                      error={Boolean(touched.cover && errors.cover)}
                    />
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )}
                  </div>

                  <TextField
                    fullWidth
                    label="Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Supply"
                    defaultValue="1"
                    {...getFieldProps('supply')}
                    error={Boolean(touched.supply && errors.supply)}
                    helperText={touched.supply && errors.supply}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Price"
                    defaultValue="0"
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>
                  <TextField fullWidth label="External Link" {...getFieldProps('externalLink')} />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Meta description"
                    {...getFieldProps('metaDescription')}
                  />

                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={handleOpenPreview}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Mint
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} />
    </>
  );
}
