/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 日期和时间工具
 */

export default function main() {
    return {
        /**
         * 获取日期
         */
        getNowFormatDate: () => {
            let date = new Date();
            let seperator1 = '-';
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            return year + seperator1 + month + seperator1 + strDate;
        },

        /**
         * 运行时间
         * @param {string} dateString 起始日期，格式 YYYY-MM-DD
         */
        getRunDate: (dateString) => {
            dateString = dateString.toString().split('-');
            let date = new Date();
            date.setUTCFullYear(dateString[0], dateString[1] - 1, dateString[2]);
            date.setUTCHours(0, 0, 0, 0);
            let birthDay = date;
            let today = new Date();
            let timeold = today.getTime() - birthDay.getTime();
            let sectimeold = timeold / 1000;
            let secondsold = Math.floor(sectimeold);
            let msPerDay = 24 * 60 * 60 * 1000;
            let e_daysold = timeold / msPerDay;
            let daysold = Math.floor(e_daysold);
            let e_hrsold = (daysold - e_daysold) * -24;
            let hrsold = Math.floor(e_hrsold);
            let e_minsold = (hrsold - e_hrsold) * -60;
            let minsold = Math.floor((hrsold - e_hrsold) * -60);
            let seconds = Math.floor((minsold - e_minsold) * -60).toString();
            return {
                daysold: daysold,
                hrsold: hrsold,
                minsold: minsold,
                seconds: seconds,
            };
        },

        /**
         * 分钟转换为时间格式
         */
        minToTime: (min) => {
            let minTime = parseInt(min);
            let second = parseInt((min - minTime) * 60);
            second = ('' + second).length === 1 ? '0' + second : second;
            return `${minTime}:${second}`;
        },

        /**
         * 获取当前的日期并以月-日返回
         */
        getFormattedDate: () => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            return ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
        },
    };
}
