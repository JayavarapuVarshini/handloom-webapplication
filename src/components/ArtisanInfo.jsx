import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Rating,
  Avatar,
  Divider,
} from '@mui/material';
import { Verified, LocationOn, WorkHistory } from '@mui/icons-material';

const ArtisanInfo = ({ artisan }) => {
  // Handle all possible cases safely
  if (!artisan) {
    return (
      <Card sx={{ mb: 3, border: '1px solid', borderColor: 'grey.300' }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Artisan information not available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // If artisan is a string, convert to basic object
  let artisanData;
  if (typeof artisan === 'string') {
    artisanData = { 
      name: artisan, 
      location: 'India', 
      verified: true,
      experience: 'Traditional Artisan',
      story: 'Skilled artisan preserving traditional handloom techniques.',
      rating: 4.5,
      productsCount: 10
    };
  } else {
    // If it's an object but missing name, provide fallback
    artisanData = {
      name: artisan.name || 'Unknown Artisan',
      location: artisan.location || 'India',
      verified: artisan.verified || false,
      experience: artisan.experience || 'Traditional Artisan',
      story: artisan.story || 'Skilled artisan preserving traditional handloom techniques.',
      rating: artisan.rating || 4.5,
      productsCount: artisan.productsCount || 10,
      image: artisan.image
    };
  }

  // Safe first letter extraction
  const firstLetter = artisanData.name ? artisanData.name.charAt(0) : 'A';

  return (
    <Card sx={{ mb: 3, border: '1px solid', borderColor: 'primary.light' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={artisanData.image}
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2, 
              bgcolor: artisanData.image ? 'transparent' : 'primary.main'
            }}
          >
            {firstLetter}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {artisanData.name}
              </Typography>
              {artisanData.verified && (
                <Verified color="primary" fontSize="small" />
              )}
            </Box>
            
            {artisanData.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {artisanData.location}
                </Typography>
              </Box>
            )}
            
            {artisanData.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={artisanData.rating} size="small" readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({artisanData.productsCount || 0} products)
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {(artisanData.story || artisanData.experience) && (
          <Divider sx={{ my: 2 }} />
        )}

        {/* Artisan Story */}
        {artisanData.story && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
              "{artisanData.story}"
            </Typography>
          </Box>
        )}

        {/* Artisan Details */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {artisanData.experience && (
            <Chip 
              icon={<WorkHistory />} 
              label={artisanData.experience}
              size="small"
              variant="outlined"
            />
          )}
          {artisanData.verified && (
            <Chip 
              label="Verified Artisan"
              color="success"
              size="small"
              variant="filled"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArtisanInfo; 