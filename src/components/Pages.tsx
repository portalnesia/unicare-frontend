import { NextSeo } from 'next-seo';
import { ReactNode, useMemo } from 'react';
import { config } from "@/config"
import { webUrl } from '@/utils/main';
import React from 'react';
import useInit from '@/hooks/init';

export interface PageProps {
    children: ReactNode
    title?: string
    desc?: string
    keyword?: string
    canonical?: string
    /**
     * Full URL
     */
    image?: string
    noIndex?: boolean
    admin?: boolean;
}

export default function Pages({ children, title, desc, keyword, canonical: canonicalProps, image, noIndex = false, admin = true }: PageProps) {
    useInit();
    const canonical = useMemo(() => webUrl(canonicalProps), [canonicalProps])
    const header = useMemo(() => {
        return {
            title: `${title && title.length > 0 ? `${title} | ` : ''}${config.meta.title}`,
            desc: `${desc && desc.length > 0 ? `${desc} ` : ''}${config.meta.desc}`,
            keyword: `${keyword && keyword.length > 0 ? `${keyword},` : ''}${config.meta.keywords}`,
        }
    }, [title, desc, keyword]);

    return (
        <div>
            {/* {admin && !auth ? <SplashScreen /> : ( */}
            <NextSeo
                title={header.title}
                description={header.desc}
                canonical={canonical}
                nofollow={noIndex}
                noindex={noIndex}
                additionalMetaTags={[{
                    property: 'keywords',
                    content: header.keyword
                }, {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                }]}
                openGraph={{
                    url: canonical,
                    title: header.title,
                    description: header.desc,
                    // images: [
                    //     { url: header.image },
                    // ],
                    site_name: config.meta.title,
                    type: 'website'
                }}
            />

            {children}
        </div>
    )
}