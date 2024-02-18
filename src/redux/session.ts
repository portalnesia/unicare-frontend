import nextSession, {SessionStore} from 'next-session';
import Redis from 'ioredis';
import { SessionData, SessionRecord } from 'next-session/lib/types';

let redis: Redis|undefined

function getRedis() {
    if(!redis) {
        redis  =  new Redis(process.env.REDIS_URL || '', { enableAutoPipelining: true });
    }
    return redis;
}
const getSessionId = (sid: string) => `ht2024:sess:${sid}`;

class RedisStore implements SessionStore {
    private store: Redis;

    constructor() {
        this.store = getRedis();
    }

    async get(
        sid: string
    ): Promise<SessionData<SessionRecord> | null | undefined> {
        const sess = await this.store.get(getSessionId(sid));
        if (sess) {
            const session = JSON.parse(sess, (key, value) => {
                if (key === 'expires') return new Date(value);
                return value;
            }) as SessionData;
            if (
                session.cookie.expires &&
                session.cookie.expires.getTime() <= Date.now()
            ) {
                await this.destroy(sid);
                return null;
            }
            return session;
        }
        return null;
    }

    async set(sid: string, session: SessionData<SessionRecord>): Promise<void> {
        this.store.set(
            getSessionId(sid),
            JSON.stringify(session)
        ) as unknown as Promise<void>;
    }

    async destroy(sid: string): Promise<void> {
        this.store.del(getSessionId(sid)) as unknown as Promise<void>;
    }

    async touch(sid: string, sess: SessionData): Promise<void> {
        this.store.set(getSessionId(sid), JSON.stringify(sess));
    }
}

const store = new RedisStore();

const getSession = nextSession({
    name:"_ht_sess",
    store,
    cookie:{

        maxAge:21600,
        secure: process.env.NODE_ENV === "production"
    },
})

export default getSession;