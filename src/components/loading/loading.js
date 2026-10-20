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

        this.initRebound = () => {

            let settings = that.config.rebound;

            let springSystem = new rebound.SpringSystem();

            that.spring = springSystem.createSpring(settings.tension, settings.friction);
        }

        this.initSpinner = () => {

            let settings = that.config.spinner;

            that.spinner = new Spinner(settings);
        }

        this.start = () => {
            beforeLoading(_);
            $('#blog-news').prepend('<div id="loading"></div>');
            that.initRebound();
            that.initSpinner();
            that.spinner.init(that.spring, true);
        }

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