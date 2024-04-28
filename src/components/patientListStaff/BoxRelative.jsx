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
import CardRelative from './CardRelative';
import SimpleBackdrop from '../backdrop';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';



export default function BoxRelative({ setIsLoading , PatientRelative}) {
    
  return (
    <>
      <div className="flex flex-wrap">
        {PatientRelative.map((rel) => (
          <div className="w-1/2 px-1 mt-2" key={rel.patientRelativeId}>
            <CardRelative title={rel.relative} fullName={rel.fullName} mobile={rel.mobileNumber} desc={rel.description} address={rel.address} rel={rel} setIsLoading={setIsLoading}/>
            
          </div>
        ))}
      </div>
      
    </>
  );
}
