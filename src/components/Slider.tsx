import { forwardRef } from 'react'
import Slider, { CarouselProps as NativeProps } from 'react-multi-carousel'
import Box from '@mui/material/Box';
import 'react-multi-carousel/lib/styles.css'
import React from 'react';
import { Without } from '@/types/general';

export interface CarouselProps extends Partial<Without<NativeProps, 'children'>> {
    children: React.ReactNode
}

export const responsiveDefault = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
        partialVisibilityGutter: 10
    },
    desktop: {
        breakpoint: { max: 3000, min: 866 },
        items: 3,
        partialVisibilityGutter: 10
    },
    tabletLarge: {
        breakpoint: { max: 866, min: 784 },
        items: 2,
        partialVisibilityGutter: 10
    },
    tablet: {
        breakpoint: { max: 784, min: 534 },
        items: 2,
        partialVisibilityGutter: 10
    },
    mobile: {
        breakpoint: { max: 534, min: 0 },
        items: 1,
        partialVisibilityGutter: 10
    }
}

const Sliders = forwardRef<Slider, CarouselProps>(({ autoPlay = true, transitionDuration, arrows = true, infinite, responsive = responsiveDefault, showDots = true, children, ...props }, ref) => {

    return (
        <Box position="relative" sx={{
            "& .custom-dot-list-style": {
                bottom: -35
            }
        }}>
            <Slider
                {...props}
                autoPlay={autoPlay}
                autoPlaySpeed={transitionDuration || 3000}
                arrows={arrows}
                infinite={infinite}
                swipeable
                draggable
                showDots={showDots}
                dotListClass="custom-dot-list-style"
                keyBoardControl
                pauseOnHover={false}
                centerMode={false}
                itemClass="not-margin"
                containerClass={`slider`}
                responsive={responsive}
                ref={ref}
                renderDotsOutside
            >
                {children}
            </Slider>
        </Box>
    )
});
Sliders.displayName = "Sliders";
export default Sliders
