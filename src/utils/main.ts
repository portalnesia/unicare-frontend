import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utcOffset from 'dayjs/plugin/utc'
import timeZone from 'dayjs/plugin/timezone'
import 'dayjs/locale/en'

dayjs.extend(relativeTime);
dayjs.extend(utcOffset);
dayjs.extend(timeZone);

export function getDayJs(date?: string | number | Date | dayjs.Dayjs | null, defaultNow = true) {
    let datetime: dayjs.Dayjs;
    let dt = date;
    if (typeof date === 'undefined') return dayjs().locale("en");
    if (typeof date === 'string') {
        const parse = Number(date);
        if (!Number.isNaN(parse)) {
            if (parse.toString().length === 10 || parse.toString().length === 13) dt = parse;
        }
    }
    if (typeof dt === 'number' && dt.toString().length === 10) {
        datetime = dayjs.unix(dt);
    } else {
        datetime = dayjs(dt);
    }
    if (!datetime.isValid()) {
        if (defaultNow) return dayjs().locale("en");
        throw new Error('date error');
    }
    return datetime.locale("en");
}

function parsePath(path?: string) {
    return path ? path.startsWith("/") ? path : `/${path}` : "/"
}

export function webUrl(path?: string) {
    return process.env.NEXT_PUBLIC_URL + parsePath(path);
}

export function href(path?: string) {
    const url = !path ? '/' : /^https?\:\/\/(\S+)?sekalatour\.com/.test(path) ? path.replace(/^https?\:\/\/(\S+)?sekalatour\.com/, '') : path;
    return url;
}

export function truncateMiddle(str: string) {
    if (str.length > 35) {
        return str.substr(0, 20) + '...' + str.substr(str.length - 10, str.length);
    }
    return str;
}

export const numberFormat = (number: number) => {
    try {
        const num = number.toString().split(".");
        num[0] = num[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return num.join(".");
    }
    catch (_a) {
        if(typeof number === "number") return number.toString();
        return 0
    }
};

export async function imageToFile(url: string) {
    try {
        if (url.startsWith("/")) url = webUrl(url);
        else url = `https://${url}`.replaceAll(process.env.NEXT_PUBLIC_API_URL||"", "");

        const response = await fetch(url);
        const type = response.headers.get('content-type') || "";
        const blob = await response.blob();
        const filename = url.split('/').pop();
        return new File([blob], filename || "unamed.png", {type});
    } catch (err) {
        console.log("File error", err)
        return null;
    }
}

export async function timeoutAsync(fn: Function, timeout: number, reject?: boolean) {
    return new Promise<void>((resolve, rej) => {
        setTimeout(() => {
            if (reject) {
                rej(new Error("Mock reject"));
            } else {
                fn();
                resolve();
            }
        }, timeout)
    })
}

export function formatDate(dateString: string, format: string = "DD MMM YYYY") {
    let date = ""
    try {
        date = getDayJs(dateString).format(format)
    } catch (e) {
        date = "-"
    }
    return date
}

export function isAuthExpired(expiresAt: number): boolean {
    return getDayJs().isAfter(getDayJs(expiresAt))
};