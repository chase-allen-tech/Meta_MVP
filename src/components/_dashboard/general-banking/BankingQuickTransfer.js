import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Link,
  Stack,
  Radio,
  Input,
  Button,
  Avatar,
  Slider,
  Dialog,
  Tooltip,
  TextField,
  Typography,
  CardHeader,
  RadioGroup,
  DialogTitle,
  DialogActions,
  FormControlLabel
} from '@material-ui/core';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import mockData from '../../../utils/mock-data';

// ----------------------------------------------------------------------

const MIN_AMOUNT = 0;
const MAX_AMOUNT = 1000;
const STEP = 50;

const MOCK_RECENT_CONTACTS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  email: mockData.email(index),
  avatar: mockData.image.avatar(index)
}));

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral
}));

// ----------------------------------------------------------------------

InputAmount.propTypes = {
  amount: PropTypes.number,
  autoWidth: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  sx: PropTypes.object
};

function InputAmount({ autoWidth, amount, onBlur, onChange, sx, ...other }) {
  return (
    <Stack direction="row" justifyContent="center" spacing={1} sx={sx}>
      <Typography variant="h5">$</Typography>
      <Input
        disableUnderline
        size="small"
        value={amount}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{ step: STEP, min: MIN_AMOUNT, max: MAX_AMOUNT, type: 'number' }}
        sx={{
          typography: 'h3',
          '& input': {
            p: 0,
            textAlign: 'center',
            width: autoWidth
          }
        }}
        {...other}
      />
    </Stack>
  );
}

ConfirmTransferDialog.propTypes = {
  amount: PropTypes.number,
  autoWidth: PropTypes.number,
  contactInfo: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string
  }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

function ConfirmTransferDialog({ open, amount, autoWidth, contactInfo, onClose, onBlur, onChange }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>Transfer to</DialogTitle>

      <Stack spacing={3} sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={contactInfo?.avatar} sx={{ width: 48, height: 48 }} />
          <div>
            <Typography variant="subtitle2">{contactInfo?.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {contactInfo?.email}
            </Typography>
          </div>
        </Stack>

        <InputAmount
          onBlur={onBlur}
          onChange={onChange}
          autoWidth={autoWidth}
          amount={amount}
          disableUnderline={false}
          sx={{ justifyContent: 'flex-end' }}
        />

        <TextField fullWidth multiline rows={2} placeholder="Write a message..." />
      </Stack>
      <DialogActions>
        <Button variant="contained" disabled={amount === 0} onClick={onClose}>
          Confirm & Transfer
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function BankingQuickTransfer() {
  const [autoWidth, setAutoWidth] = useState(24);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectContact, setSelectContact] = useState(MOCK_RECENT_CONTACTS[0].name);
  const [amount, setAmount] = useState(0);

  const getContactInfo = MOCK_RECENT_CONTACTS.find((contact) => contact.name === selectContact);

  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSelectContact = (event) => {
    setSelectContact(event.target.value);
  };

  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  const handleSliderChange = (event, newValue) => {
    setAmount(newValue);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  };

  return (
    <>
      <RootStyle>
        <CardHeader title="Quick Transfer" />
        <Box sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Recent
            </Typography>
            <Link component={RouterLink} to="#" sx={{ typography: 'button' }}>
              View All
            </Link>
          </Stack>

          <RadioGroup value={selectContact} onChange={handleSelectContact}>
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {MOCK_RECENT_CONTACTS.map((contact) => (
                <Tooltip key={contact.id} title={contact.name} arrow placement="top">
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      src={contact.avatar}
                      sx={{
                        opacity: 0.48,
                        transition: (theme) => theme.transitions.create('opacity'),
                        ...(selectContact === contact.name && {
                          opacity: 1,
                          boxShadow: '-4px 12px 24px 0 rgb(0,0,0,0.24)'
                        })
                      }}
                    />

                    <FormControlLabel
                      value={contact.name}
                      control={<Radio sx={{ display: 'none' }} />}
                      label=""
                      sx={{ top: 0, m: 0, width: 1, height: 1, position: 'absolute' }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Stack>
          </RadioGroup>

          <Stack spacing={3}>
            <Typography variant="overline" sx={{ color: 'text.secondary', mt: 5, display: 'block' }}>
              insert amount
            </Typography>

            <InputAmount onBlur={handleBlur} onChange={handleInputChange} autoWidth={autoWidth} amount={amount} />

            <Slider
              value={typeof amount === 'number' ? amount : 0}
              valueLabelDisplay="auto"
              step={STEP}
              marks
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              onChange={handleSliderChange}
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Your Balance
              </Typography>
              <Typography variant="subtitle1">{fCurrency(34212)}</Typography>
            </Stack>

            <Button variant="contained" size="large" disabled={amount === 0} onClick={handleOpenConfirm}>
              Transfer Now
            </Button>
          </Stack>
        </Box>
      </RootStyle>

      <ConfirmTransferDialog
        open={openConfirm}
        autoWidth={autoWidth}
        amount={amount}
        contactInfo={getContactInfo}
        onClose={handleCloseConfirm}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />
    </>
  );
}
