/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: loading 处理
 */
import {
    rebound,
    Spinner,
} from 'exports-loader?exports=rebound,Spinner!../../vendor/loading/loading';
import beforeLoading from "../../hooks/beforeLoading";
import afterLoading from "../../hooks/afterLoading";

export default function main(_) {

    let loading = function() {
        let that = this;

        this.config  = _.__config.loading;
        this.spring  = null;
        this.spinner = null;

        /**
         * Initialize Rebound.js with settings.
         * Rebound is used to generate a spring which
         * is then used to animate the spinner.
         * See more: http://facebook.github.io/rebound-js/docs/rebound.html
         */
        this.initRebound = () => {

            let settings = that.config.rebound;

            // Create a SpringSystem.
            let springSystem = new rebound.SpringSystem();

            // Add a spring to the system.
            that.spring = springSystem.createSpring(settings.tension, settings.friction);
        }

        /**
         * Initialize Spinner with settings.
         */
        this.initSpinner = () => {

            let settings = that.config.spinner;

            // Instantiate Spinner.
            that.spinner = new Spinner(settings);
        }

        /**
         * 开启 loading
         */
        this.start = () => {
            beforeLoading(_);
            $('#blog-news').prepend('<div id="loading"></div>');
            that.initRebound();
            that.initSpinner();
            that.spinner.init(that.spring, true);
        }

        /**
         * 结束 loading
         */
        this.stop = () => {
            $('body').css('overflow', 'auto');
            that.spinner.setComplete();
            $('div#loading').hide();
            $('a[name="top"]').hide();
            afterLoading(_);
        }
    }

    return (new loading());
}