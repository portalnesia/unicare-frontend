import React from 'react'
//@ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { SxProps, Theme, styled } from '@mui/material/styles'

const LazyImageStyle = styled(LazyLoadImage)(() => ({}))
const ImageStyle = styled('img')(() => ({}))

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    id?: string;
    /**
     * Image url
     */
    src?: string;
    className?: string;
    /**
     * Alt of images
     */
    alt?: string;
    lazy?: boolean;
    sx?: SxProps<Theme>
}

const Img = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
    const { src, lazy = true, className, sx, alt, onContextMenu: __, placeholder: _, ...rest } = props

    return (
        <>
            {lazy ? (
                <LazyImageStyle draggable={false} src={src} className={`no-drag no-context${className ? ' ' + className : ''}`} {...(alt ? { alt: alt } : {})} sx={sx} {...rest} />
            ) : (
                <ImageStyle ref={ref} draggable={false} src={src} className={`no-drag no-context${className ? ' ' + className : ''}`} {...(alt ? { alt: alt } : {})} sx={sx} {...rest} />
            )}
        </>
    )
})

Img.displayName = "Image";
export default Img;