export type IPages<D extends {} = any> = {
    data: D
    meta?: {
        title?: string
        desc?: string
        image?: string
    }
}

export type Without<T, K> = {
    [L in Exclude<keyof T, K>]: T[L]
}

export type CopyPartial<Base, WhichPartial extends keyof Base> = Omit<Base, WhichPartial> & Partial<Base>
