import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Menu, Tooltip } from '@mui/material';
import Iconify from '../Iconify';
import { TiGroup } from 'react-icons/ti';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineMoreTime } from 'react-icons/md';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardReception() {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ maxWidth: 220 }}>
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        
        title="محمد نصیری"
        subheader="۱۴۰۳/۰۲/۱۰"
      /> */}

      <CardContent>
        <Box className={'flex justify-center'}>
          <img className="w-14 h-14 rounded-full border" src={'/images/bg.jpeg'} alt="" />
        </Box>
        <div className='absolute left-3 top-6'>
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <BsThreeDotsVertical className="cursor-pointer text-2xl" />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div className="px-4">
              <Tooltip title="ویرایش" placement="right">
                <IconButton>
                  <Iconify icon={'eva:edit-fill'} />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="حذف" placement="right">
                <IconButton>
                  <Iconify
                    className="text-red-500"
                    icon={'eva:trash-2-outline'}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="همراه" placement="right">
                <IconButton>
                  <TiGroup />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="نوبت دهی اینترنتی" placement="right">
                <IconButton>
                  <MdOutlineMoreTime />
                </IconButton>
              </Tooltip>
            </div>
          </Menu>
        </div>
        <h3 className='text-xl font-semibold'>محمد نصیری</h3>
        <p className='mt-2'>کد ملی : 001601882</p>
        <p className='mt-2'>تاریخ پذیرش : ۱۴۰۳/۰۲/۱۰</p>


        {/* <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>توضیحات:</Typography>
          
          <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
